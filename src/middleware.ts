import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router";
import { PERMISSIONS } from "./commons/constants/permissions";
import { SessionUser } from "./libs/localstorage";
import { SessionToken } from "./libs/cookies";

const mappingRoutePermissions = [
  {
    path: ROUTES.dashboard,
  },
  {
    path: ROUTES.iam.users.list,
    permissions: [PERMISSIONS.USERS.READ_LIST_USERS],
  },
];

const mappingPublicRoutes = ["/auth/login", "/auth/forgot"];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const session = SessionUser.get();
  const session_token = SessionToken.get();
  const token = session_token?.token?.access_token;
  const userPermissions = session?.user?.role.permissions.map((perm) => perm.name) || [];

  if (mappingPublicRoutes.includes(pathname)) {
    if (token) {
      return redirect(ROUTES.dashboard);
    }
    return null;
  }

  if (!session) {
    return redirect(ROUTES.auth.login);
  }

  if (session?.user.role.name === "Student") {
    const redirectUrl = `${ROUTES.auth.login}?error=student_blocked`;
    return redirect(redirectUrl);
  }

  const matchedRoute = mappingRoutePermissions.find((route) => route.path === pathname);

  if (matchedRoute) {
    const allowed =
      !matchedRoute.permissions ||
      matchedRoute.permissions.some((perm) => userPermissions.includes(perm));
    if (!allowed) {
      return redirect(ROUTES.dashboard);
    }
  }

  return null;
};
