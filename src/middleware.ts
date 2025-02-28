import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router";
import { filterPermission } from "./utils/permission";
import { PERMISSIONS } from "./commons/constants/permissions";
import { SessionUser } from "./libs/localstorage";

const mappingRoutePermissions = [
  {
    path: ROUTES.dashboard,
  },
  {
    path: ROUTES.iam.users.list,
    permissions: [PERMISSIONS.USERS.READ_USERS],
  },
];

const mappingPublicRoutes = ["/auth/login", "/auth/oauth-callback"];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const session = SessionUser.get();
  const userPermissions =
    session?.user?.roles?.map((role) => role.permissions.map((perm) => perm.name))?.flat() || [];

  const pathname = url.pathname;

  const allowedPermissions = filterPermission(
    mappingRoutePermissions,
    (route) =>
      (session && route.path === pathname && route.permissions
        ? route.permissions.some((permission) => permission ?? userPermissions?.some(permission))
        : true) || false,
  );

  if (mappingPublicRoutes.includes(pathname)) {
    return null;
  }

  if (!session) {
    return redirect(ROUTES.auth.login);
  }

  if (allowedPermissions.length === 0) {
    return redirect(ROUTES.dashboard);
  }

  return null;
};
