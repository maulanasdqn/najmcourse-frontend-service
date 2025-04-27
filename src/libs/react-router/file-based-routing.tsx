import { TPermissionItem } from "@/api/permissions/type";
import { lazy, LazyExoticComponent, ReactNode } from "react";
import { ActionFunction, LoaderFunction, RouteObject } from "react-router";

/**
 * Represents the expected structure of a page module's exports.
 * @interface PageModuleExports
 * @property {Function} default - The main component to render
 * @property {LoaderFunction} [loader] - Optional data loader function
 * @property {ActionFunction} [action] - Optional form action handler
 */
interface PageModuleExports {
  default: () => ReactNode;
  loader?: LoaderFunction;
  action?: ActionFunction;
  permissions?: Array<string>;
}

/**
 * Represents the structure of a loading component's exports.
 * @interface LoadingModuleExports
 * @property {Function} default - The loading component to render
 */
interface LoadingModuleExports {
  default: () => ReactNode;
}

/**
 * Defines the type of page in the routing system.
 * @interface RouteHandle
 * @property {'page' | 'layout'} pageType - Indicates whether the route is a regular page or a layout wrapper
 */
interface RouteHandle {
  pageType: "page" | "layout";
}

interface ExtendedRouteObject extends Omit<RouteObject, "handle" | "children"> {
  handle?: RouteHandle;
  children?: ExtendedRouteObject[];
  HydrateFallback?: React.ComponentType;
}

type PageModule = () => Promise<PageModuleExports>;

const separator = "\\";

/**
 * Converts file-system based pages into React Router compatible routes.
 * Supports file-system based routing similar to Next.js, where directory structure
 * determines the routing hierarchy.
 *
 * Features:
 * - Automatic route generation from file structure
 * - Support for layouts and nested routes
 * - Loading state handling
 * - Dynamic route parameters
 *
 * @param files - Object mapping file paths to their dynamic import functions
 * @param loadingFiles - Object mapping loading component paths to their import functions
 * @returns A complete route configuration object for React Router
 */
export function convertPagesToRoute(
  files: Record<string, () => Promise<unknown>>,
  loadingFiles: Record<string, () => Promise<unknown>> = {},
): ExtendedRouteObject {
  let routes: ExtendedRouteObject = { path: "/" };
  Object.entries(files).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath);
    const page = lazy(importer as PageModule);
    // Find matching loading component for this route
    const loadingComponent = findMatchingLoadingComponent(filePath, loadingFiles);

    const route = createRoute({
      PageComponent: page,
      LoadingComponent: loadingComponent,
      segments,
      async action(args) {
        const result = (await importer()) as PageModuleExports;
        return "action" in result ? result.action?.(args) : null;
      },
      async loader(args) {
        const result = (await importer()) as PageModuleExports;
        return "loader" in result ? result.loader?.(args) : null;
      },
      async guard() {
        const result = (await importer()) as PageModuleExports;
        const localStoragePermission = localStorage.getItem("permissions");
        const permissions: TPermissionItem[] | undefined = localStoragePermission
          ? JSON.parse(localStoragePermission)
          : undefined;
        return "permissions" in result
          ? result.permissions?.every(
              (permission) => permissions?.some((item) => permission === item.name) || false,
            ) || false
          : true;
      },
    });
    routes = mergeRoutes(routes, route);
  });
  return routes;
}

/**
 * Determines the appropriate loading component for a route based on a hierarchical fallback system.
 *
 * Loading Component Resolution Order:
 * 1. Local: Checks for loading.tsx in the same directory as the page
 * 2. Group: Looks for loading.tsx in the nearest group directory (e.g., (auth)/loading.tsx)
 * 3. Global: Falls back to the root loading.tsx if no other loading components are found
 *
 * @param filePath - The path of the current page file
 * @param loadingFiles - Object containing all available loading components
 * @returns The resolved loading component or undefined if none found
 */
function findMatchingLoadingComponent(
  filePath: string,
  loadingFiles: Record<string, () => Promise<unknown>>,
) {
  // First try local loading file
  const loadingPath = filePath.replace(/(page|layout)\.tsx$/, "loading.tsx");

  // Then try group folder loading file (e.g., (auth/loading.tsx))
  const groupMatch = filePath.match(/\([^/]+\//);
  const groupLoadingPath = groupMatch ? `/${groupMatch[0]}loading.tsx` : null;

  // Finally try global loading file
  const globalLoadingPath = "./app/loading.tsx";

  // Try to find loader in order: local -> group -> global
  const loader =
    loadingFiles[loadingPath] ||
    (groupLoadingPath && loadingFiles[groupLoadingPath]) ||
    loadingFiles[globalLoadingPath];

  if (!loader) return undefined;

  return lazy(loader as () => Promise<LoadingModuleExports>);
}

/**
 * Merges two route configurations while maintaining proper hierarchy and handling special cases.
 *
 * Rules:
 * 1. Layout routes take precedence over page routes
 * 2. Page routes can become index routes under layouts
 * 3. Preserves existing route hierarchy during merging
 * 4. Handles conflicts between layouts and pages
 *
 * @param target - The base route configuration to merge into
 * @param source - The new route configuration to merge
 * @returns The merged route configuration
 * @throws Error if paths don't match between target and source
 */
function mergeRoutes(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject,
): ExtendedRouteObject {
  if (target.path !== source.path)
    throw new Error(`Paths do not match: "${target.path}" and "${source.path}"`);

  target.children = target.children || [];

  // Handle layouts first as priority routes
  if (source.handle?.pageType === "layout") {
    return handleLayoutMerge(target, source);
  }

  // Handle page route
  if (source.handle?.pageType === "page") {
    return handlePageMerge(target, source);
  }

  // Handle nested routes
  if (source.children && source.children.length > 0) {
    // If target is currently a page but source adds children,
    // convert target's page to an index route before merging children.
    if (target.handle?.pageType === "page") {
      // Ensure children array exists and no index route already exists
      if (!target.children?.some((child) => child.index)) {
        target.children = target.children || [];
        target.children.unshift({
          // Use unshift to prioritize index over potential later merges
          index: true,
          element: target.element,
          HydrateFallback: target.HydrateFallback,
          action: target.action,
          loader: target.loader,
          handle: target.handle,
          errorElement: target.errorElement,
        });
      }
      // Clear page-specific properties from target as it now acts primarily as a parent/layout
      // Keep properties that might apply to a layout scope (like ErrorBoundary, HydrateFallback)
      delete target.element;
      delete target.action;
      delete target.loader;
      delete target.handle;
    }
    mergeChildRoutes(target, source);
  }

  return target;
}

/**
 * Merges child routes from source to target.
 */
export function mergeChildRoutes(target: ExtendedRouteObject, source: ExtendedRouteObject): void {
  if (!source.children) return;

  // Ensure target.children exists
  if (!target.children) {
    target.children = [];
  }

  source.children.forEach((sourceChild) => {
    const matchingChild = target.children!.find(
      (targetChild) => targetChild.path === sourceChild.path,
    );

    if (matchingChild) {
      mergeRoutes(matchingChild, sourceChild);
    } else {
      target.children!.push(sourceChild);
    }
  });
}

/**
 * Handles the merging of a layout route.
 */
export function handleLayoutMerge(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject,
): ExtendedRouteObject {
  // If target has no element, use the source layout
  if (!target.element) {
    Object.assign(target, {
      element: source.element,
      HydrateFallback: source.HydrateFallback,
      action: source.action,
      loader: source.loader,
      handle: source.handle,
      errorElement: source.errorElement,
    });
  }
  // If target is a page, convert it to an index route under the layout
  else if (target.handle?.pageType === "page") {
    target = swapTargetRouteAsIndexRouteAndUpdateWithRoute(target, source);
  }

  return target;
}

/**
 * Handles the merging of a page route.
 */
export function handlePageMerge(
  target: ExtendedRouteObject,
  source: ExtendedRouteObject,
): ExtendedRouteObject {
  // Ensure target.children exists
  if (!target.children) {
    target.children = [];
  }

  // If there's no index route yet, add this page as index
  // Also handles the case where target is a layout and source is a page for the same path
  if (!target.children.some((child) => child.index) || target.handle?.pageType === "layout") {
    // Check if target is a layout, if so, use addRouteAsIndexRouteForTargetRoute
    if (target.handle?.pageType === "layout") {
      addRouteAsIndexRouteForTargetRoute(target, source);
    } else {
      // Otherwise, just add the source page as the index route
      target.children.unshift({
        // Use unshift to prioritize index
        index: true,
        element: source.element,
        HydrateFallback: source.HydrateFallback,
        action: source.action,
        loader: source.loader,
        handle: source.handle,
        errorElement: source.errorElement,
      });
    }
  }
  // If an index route already exists and target is not a layout, the new page might be ignored or log a warning.
  // Current logic prioritizes the first page found as index.

  // If the target was previously just a placeholder parent created during nesting,
  // ensure layout-like properties from the source page (if it implies a layout structure implicitly) are considered.
  // This part might need refinement based on how layouts are implicitly handled.
  return target;
}

/**
 * Takes a page route and converts it into an index route under a layout route.
 * Preserves all route properties while restructuring the hierarchy.
 */
export function swapTargetRouteAsIndexRouteAndUpdateWithRoute(
  target: ExtendedRouteObject,
  layout: ExtendedRouteObject,
): ExtendedRouteObject {
  target.children = target.children || [];
  target.children.push({
    index: true,
    element: target.element,
    HydrateFallback: target.HydrateFallback,
    action: target.action,
    loader: target.loader,
    handle: target.handle,
    errorElement: target.errorElement,
  });

  Object.assign(target, {
    element: layout.element,
    HydrateFallback: layout.HydrateFallback,
    action: layout.action,
    loader: layout.loader,
    handle: layout.handle,
    errorElement: layout.errorElement,
  });

  return target;
}

/**
 * Adds a route as an index route under a target layout route.
 */
export function addRouteAsIndexRouteForTargetRoute(
  target: ExtendedRouteObject,
  page: ExtendedRouteObject,
): ExtendedRouteObject {
  target.children = target.children || [];
  target.children.push({
    index: true,
    element: page.element,
    HydrateFallback: page.HydrateFallback,
    action: page.action,
    loader: page.loader,
    handle: page.handle,
    errorElement: page.errorElement,
  });

  return target;
}

/**
 * Creates a new route configuration based on path segments and components.
 * Handles both page and layout routes differently:
 * - Layouts: Always include loading states and can have children
 * - Pages: Can be terminal routes or have nested structures
 */
function createRoute(args: {
  segments: string[];
  PageComponent: LazyExoticComponent<() => ReactNode>;
  LoadingComponent?: LazyExoticComponent<() => ReactNode>;
  loader?: LoaderFunction;
  action?: ActionFunction;
  guard?: () => Promise<boolean>;
}): ExtendedRouteObject {
  const [current, ...rest] = args.segments;
  const [cleanPath, pageType] = current.split(separator);
  const route: ExtendedRouteObject = { path: cleanPath };

  // Set up the route element and properties
  if (pageType === "page" || pageType === "layout") {
    route.element = <args.PageComponent />;
    route.HydrateFallback = args.LoadingComponent ?? (() => <div>Loading...</div>);
    route.action = args.action;
    route.loader = async (...props) => {
      if (!(await args.guard?.())) {
        throw new Response("Forbidden", { status: 403, statusText: "Forbidden" });
      }
      return args.loader?.(...props);
    };
    route.handle = { pageType: pageType as "layout" | "page" };
  }

  // Handle nested routes
  if (rest.length > 0) {
    const nextSegment = rest[0].split(separator)[0];

    // If the next segment is "update" or similar, make it a sibling route
    if (nextSegment === "update" || nextSegment === "edit") {
      return {
        path: `${cleanPath}/${nextSegment}`,
        element: <args.PageComponent />,
        HydrateFallback: args.LoadingComponent ?? (() => <div>Loading...</div>),
        action: args.action,
        loader: args.loader,
        handle: { pageType: pageType as "layout" | "page" },
      };
    }

    // Otherwise, handle as nested route
    const childRoute = createRoute({ ...args, segments: rest });

    if (!route.children) {
      route.children = [];
    }

    // For dynamic parameter routes ([id]), ensure more specific routes come first
    if (cleanPath.startsWith(":")) {
      route.children.unshift(childRoute);
    } else {
      route.children.push(childRoute);
    }
  }

  return route;
}

/**
 * Processes a file path to generate route segments, handling various routing patterns.
 *
 * Supports:
 * - Static routes: /about → /about
 * - Dynamic parameters: [id] → :id
 * - Optional parameters: (auth) → auth?
 * - Catch-all routes: [...wildcard] → *
 * - Special directories: Ignores _files and (index) files
 *
 * @param filePath - The file path to process
 * @param transformer - Optional function to transform segment names
 * @returns Array of processed route segments
 */
export function getRouteSegmentsFromFilePath(
  filePath: string,
  transformer = (segment: string, prevSegment: string) =>
    `${prevSegment}${separator}${getFileNameWithoutExtension(segment)}`,
): string[] {
  const segments = filePath
    .replace("/app", "")
    .split("/")
    .filter((segment) => !segment.startsWith("(index)") && !segment.startsWith("_"))
    .map((segment) => {
      if (segment.startsWith(".")) return "/";
      if (segment.startsWith("("))
        return getParamFromSegment(segment).replace("(", "").replace(")", "") + "?";
      if (segment.startsWith("[")) return getParamFromSegment(segment);
      return segment;
    });

  return getRouteSegments(segments[0], segments, transformer);
}

function getFileNameWithoutExtension(file: string) {
  return file.split(".")[0];
}

/**
 * Adds 404 (Not Found) pages to route children.
 * Handles two cases:
 * 1. Routes with existing children: Adds 404 as a catch-all route
 * 2. Routes without children: Converts current route to index and adds 404 as sibling
 */
function getRouteSegments(
  segment: string,
  segments: string[],
  transformer: (seg: string, prev: string) => string,
  entries: string[] = [],
  index = 0,
): string[] {
  if (index > segments.length) throw new Error("Cannot exceed total number of segments");
  if (index === segments.length - 1) {
    entries.push(transformer(segment, String(entries.pop())));
    return entries;
  }
  const nextIndex = index + 1;
  if (!segment.startsWith(":")) entries.push(segment);
  else entries.push(`${entries.pop()}/${segment}`);
  return getRouteSegments(segments[nextIndex], segments, transformer, entries, nextIndex);
}

/**
 * Recursively traverses and updates routes based on segment paths.
 * Used for adding error boundaries and 404 pages to specific routes.
 */
function getParamFromSegment(segment: string) {
  if (segment.includes("...")) return "*";
  return segment.replace("[", ":").replace("]", "");
}

/**
 * Adds error boundaries to routes based on error component files.
 * Maps error components to their corresponding route segments.
 */
export function addErrorElementToRoutes(
  errorFiles: Record<string, () => Promise<unknown>>,
  routes: RouteObject,
) {
  Object.entries(errorFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath, (_, prevSegment) => prevSegment);
    const ErrorBoundary = lazy(importer as () => Promise<{ default: () => ReactNode }>);
    setRoute(segments, routes, (route) => {
      route.errorElement = <ErrorBoundary />;
      return route;
    });
  });
}

/**
 * Adds 404 (Not Found) pages to route children.
 * Handles two cases:
 * 1. Routes with existing children: Adds 404 as a catch-all route
 * 2. Routes without children: Converts current route to index and adds 404 as sibling
 */
export function add404PageToRoutesChildren(
  notFoundFiles: Record<string, () => Promise<unknown>>,
  routes: RouteObject,
) {
  Object.entries(notFoundFiles).forEach(([filePath, importer]) => {
    const segments = getRouteSegmentsFromFilePath(filePath, (_, prevSegment) => prevSegment);
    const NotFound = lazy(importer as () => Promise<{ default: () => ReactNode }>);
    setRoute(segments, routes, (route) => {
      // add not found route if there is are children
      if (route.children) {
        set404NonPage(routes, <NotFound />);
        route.children.push({ path: "*", element: <NotFound /> });
      } else {
        // if there are no children, then add children to the route and move the current route to the
        // children as the index route and add the not found page
        const tempRoute = Object.assign({}, route);
        route.children = route.children ?? [];
        // Only add NotFoundPage for non-root routes that don't have an index
        route.children.push({
          index: true,
          element: tempRoute.element,
          action: tempRoute.action,
          loader: tempRoute.loader,
        });

        route.children.push({ path: "*", element: <NotFound /> });

        // delete or remove the matched route element, action & loader to make it a pathless route
        delete route.element;
        delete route.action;
        delete route.loader;
      }
      return route;
    });
  });
}

function set404NonPage(routes: RouteObject, notFoundElement: ReactNode) {
  if (
    routes.path &&
    routes.children?.length &&
    !routes.path.includes("?") &&
    !routes.path.includes("/") &&
    !routes.children.some((child) => child.index)
  ) {
    routes.children.push({
      index: true,
      element: notFoundElement,
    });
  }
  routes.children?.forEach((route) => set404NonPage(route, notFoundElement));
}

/**
 * Recursively traverses and updates routes based on segment paths.
 * Used for adding error boundaries and 404 pages to specific routes.
 */
function setRoute(
  segments: string[],
  route: RouteObject,
  updater: (route: RouteObject) => RouteObject,
): void {
  let temp = route;
  segments.forEach((_segment, i) => {
    const isLastSegment = i === segments.length - 1;
    if (isLastSegment) return (temp = updater(temp));

    if (!isLastSegment) {
      const nextSegment = segments[i + 1];
      const index = temp.children?.findIndex((child) => child.path === nextSegment);
      if (typeof index !== "number" || index === -1) {
        const msg = `Segment ${nextSegment} does not exist among the children of route with path ${temp.path}`;
        throw new Error(msg);
      }

      temp = temp.children?.[index] as RouteObject;
    }
  });
}
