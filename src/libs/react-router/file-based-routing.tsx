import { TPermissionItem } from "@/api/permission/type";
import { lazy, LazyExoticComponent } from "react";
import { ActionFunction, LoaderFunction, RouteObject } from "react-router";
import { SessionUser } from "../localstorage";

/**
 * Represents the expected structure of a page module's exports.
 * @interface PageModuleExports
 * @property {Function} default - The main component to render
 * @property {LoaderFunction} [loader] - Optional data loader function
 * @property {ActionFunction} [action] - Optional form action handler
 */
interface PageModuleExports {
  default: () => JSX.Element;
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
  default: () => JSX.Element;
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
        // TODO: add support multi roles
        const localStoragePermission = SessionUser.get()?.user.roles[0].permissions;
        const permissions: TPermissionItem[] | undefined = localStoragePermission;
        const isAllowed =
          "permissions" in result
            ? result.permissions?.every(
                (permission) => permissions?.some((item) => permission === item.key) || false,
              ) || false
            : true;
        return isAllowed;
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

  // If target doesn't have children yet, initialize it
  if (!target.children) {
    target.children = [];
  }

  // Prioritize layouts by handling them first
  if (source.handle?.pageType === "layout") {
    if (!target.element) {
      target.element = source.element;
      target.HydrateFallback = source.HydrateFallback;
      target.action = source.action;
      target.loader = source.loader;
      target.handle = source.handle;
      target.errorElement = source.errorElement;
      target.children = target.children ?? [];
    } else if (target.handle?.pageType === "page") {
      target = swapTargetRouteAsIndexRouteAndUpdateWithRoute(target, source);
    }
    return target;
  }

  // If this is a page route and we don't have an index route yet, add it
  if (source.handle?.pageType === "page" && !target.children.some((child) => child.index)) {
    target.children.unshift({
      index: true,
      element: source.element,
      HydrateFallback: source.HydrateFallback,
      action: source.action,
      loader: source.loader,
      handle: source.handle,
    });
    return target;
  }

  // Handle other cases...
  if (target.handle?.pageType === "layout" && source.handle?.pageType === "page") {
    target = addRouteAsIndexRouteForTargetRoute(target, source);
    return target;
  }

  // Rest of the existing mergeRoutes logic...
  if (source.children) {
    target.children = target.children ?? [];
    source.children.forEach((sourceChild) => {
      const matchingChild = target.children?.find(
        (targetChild) => targetChild.path === sourceChild.path,
      );
      if (matchingChild) mergeRoutes(matchingChild, sourceChild);
      else target.children?.push(sourceChild);
    });
  }

  return target;
}

/**
 * Takes a page route and converts it into an index route under a layout route.
 * Preserves all route properties while restructuring the hierarchy.
 */
function swapTargetRouteAsIndexRouteAndUpdateWithRoute(
  target: ExtendedRouteObject,
  route: ExtendedRouteObject,
): ExtendedRouteObject {
  target.children = target.children ?? [];
  target.children.push({
    index: true,
    element: target.element,
    HydrateFallback: target.HydrateFallback,
    action: target.action,
    loader: target.loader,
    handle: target.handle,
    errorElement: target.errorElement,
  });

  target.element = route.element;
  target.HydrateFallback = route.HydrateFallback;
  target.action = route.action;
  target.loader = route.loader;
  target.handle = route.handle;
  target.errorElement = route.errorElement;

  return target;
}

/**
 * Adds a route as an index route under a target layout route.
 * Used when a page needs to be nested under an existing layout.
 */
function addRouteAsIndexRouteForTargetRoute(
  target: ExtendedRouteObject,
  route: ExtendedRouteObject,
): ExtendedRouteObject {
  target.children = target.children ?? [];
  target.children.push({
    index: true,
    element: route.element,
    HydrateFallback: route.HydrateFallback,
    action: route.action,
    loader: route.loader,
    handle: route.handle,
    errorElement: route.errorElement,
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
  PageComponent: LazyExoticComponent<() => JSX.Element>;
  LoadingComponent?: LazyExoticComponent<() => JSX.Element>;
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
    const ErrorBoundary = lazy(importer as () => Promise<{ default: () => JSX.Element }>);
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
    const NotFound = lazy(importer as () => Promise<{ default: () => JSX.Element }>);
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

function set404NonPage(routes: RouteObject, notFoundElement: JSX.Element) {
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
