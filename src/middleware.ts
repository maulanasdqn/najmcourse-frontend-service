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
  {
    path: ROUTES.iam.users.create,
    permissions: [PERMISSIONS.USERS.CREATE_USERS],
  },
  {
    path: ROUTES.iam.users.update,
    permissions: [PERMISSIONS.USERS.UPDATE_USERS],
  },
  {
    path: ROUTES.iam.users.detail,
    permissions: [PERMISSIONS.USERS.READ_DETAIL_USERS],
  },
  {
    path: ROUTES.iam.roles.list,
    permissions: [PERMISSIONS.ROLES.READ_LIST_ROLES],
  },
  {
    path: ROUTES.iam.roles.create,
    permissions: [PERMISSIONS.ROLES.CREATE_ROLES],
  },
  {
    path: ROUTES.iam.roles.update,
    permissions: [PERMISSIONS.ROLES.UPDATE_ROLES],
  },
  {
    path: ROUTES.iam.roles.detail,
    permissions: [PERMISSIONS.ROLES.READ_DETAIL_ROLES],
  },
  {
    path: ROUTES.iam.permissions.list,
    permissions: [PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS],
  },
  {
    path: ROUTES.exams.sessions.list,
    permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS],
  },
  {
    path: ROUTES.exams.sessions.create,
    permissions: [PERMISSIONS.SESSIONS.CREATE_SESSIONS],
  },
  {
    path: ROUTES.exams.sessions.update,
    permissions: [PERMISSIONS.SESSIONS.UPDATE_SESSIONS],
  },
  {
    path: ROUTES.exams.sessions.detail,
    permissions: [PERMISSIONS.SESSIONS.READ_DETAIL_SESSIONS],
  },
  {
    path: ROUTES.exams.tests.list,
    permissions: [PERMISSIONS.TESTS.READ_LIST_TESTS],
  },
  {
    path: ROUTES.exams.tests.create,
    permissions: [PERMISSIONS.TESTS.CREATE_TESTS],
  },
  {
    path: ROUTES.exams.tests.update,
    permissions: [PERMISSIONS.TESTS.UPDATE_TESTS],
  },
  {
    path: ROUTES.exams.tests.detail,
    permissions: [PERMISSIONS.TESTS.READ_DETAIL_TESTS],
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
