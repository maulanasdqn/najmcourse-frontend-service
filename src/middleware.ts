import { ROUTES } from "./commons/constants/routes";
import { LoaderFunctionArgs, redirect } from "react-router";
import { PERMISSIONS } from "./commons/constants/permissions";
import { SessionUser } from "./libs/localstorage";
import { SessionToken } from "./libs/cookies";
import { FEATURE_FLAGS } from "./libs/feature-flag";

const mappingPublicRoutes = ["/auth/login", "/auth/forgot", "/auth/new-password"];

const mappingRoutePermissions = [
  {
    path: ROUTES.dashboard,
    permissions: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
    flag: FEATURE_FLAGS.DASHBOARD.READ_DASHBOARD,
  },
  {
    path: ROUTES.iam.users.list,
    permissions: [PERMISSIONS.USERS.READ_LIST_USERS],
    flag: FEATURE_FLAGS.IAM.USERS.LIST_USERS,
  },
  {
    path: ROUTES.iam.users.create,
    permissions: [PERMISSIONS.USERS.CREATE_USERS],
    flag: FEATURE_FLAGS.IAM.USERS.CREATE_USERS,
  },
  {
    path: ROUTES.iam.users.update,
    permissions: [PERMISSIONS.USERS.UPDATE_USERS],
    flag: FEATURE_FLAGS.IAM.USERS.UPDATE_USERS,
  },
  {
    path: ROUTES.iam.users.detail,
    permissions: [PERMISSIONS.USERS.READ_DETAIL_USERS],
    flag: FEATURE_FLAGS.IAM.USERS.DETAIL_USERS,
  },
  {
    path: ROUTES.iam.roles.list,
    permissions: [PERMISSIONS.ROLES.READ_LIST_ROLES],
    flag: FEATURE_FLAGS.IAM.ROLES.LIST_ROLES,
  },
  {
    path: ROUTES.iam.roles.create,
    permissions: [PERMISSIONS.ROLES.CREATE_ROLES],
    flag: FEATURE_FLAGS.IAM.ROLES.CREATE_ROLES,
  },
  {
    path: ROUTES.iam.roles.update,
    permissions: [PERMISSIONS.ROLES.UPDATE_ROLES],
    flag: FEATURE_FLAGS.IAM.ROLES.UPDATE_ROLES,
  },
  {
    path: ROUTES.iam.roles.detail,
    permissions: [PERMISSIONS.ROLES.READ_DETAIL_ROLES],
    flag: FEATURE_FLAGS.IAM.ROLES.DETAIL_ROLES,
  },
  {
    path: ROUTES.iam.permissions.list,
    permissions: [PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS],
    flag: FEATURE_FLAGS.IAM.PERMISSIONS.LIST_PERMISSIONS,
  },
  {
    path: ROUTES.exams.sessions.list,
    permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS],
    flag: FEATURE_FLAGS.EXAMS.SESSIONS.LIST_SESSIONS,
  },
  {
    path: ROUTES.exams.sessions.create,
    permissions: [PERMISSIONS.SESSIONS.CREATE_SESSIONS],
    flag: FEATURE_FLAGS.EXAMS.SESSIONS.CREATE_SESSIONS,
  },
  {
    path: ROUTES.exams.sessions.update,
    permissions: [PERMISSIONS.SESSIONS.UPDATE_SESSIONS],
    flag: FEATURE_FLAGS.EXAMS.SESSIONS.UPDATE_SESSIONS,
  },
  {
    path: ROUTES.exams.sessions.detail,
    permissions: [PERMISSIONS.SESSIONS.READ_DETAIL_SESSIONS],
    flag: FEATURE_FLAGS.EXAMS.SESSIONS.DETAIL_SESSIONS,
  },
  {
    path: ROUTES.exams.tests.list,
    permissions: [PERMISSIONS.TESTS.READ_LIST_TESTS],
    flag: FEATURE_FLAGS.EXAMS.TESTS.LIST_TESTS,
  },
  {
    path: ROUTES.exams.tests.create,
    permissions: [PERMISSIONS.TESTS.CREATE_TESTS],
    flag: FEATURE_FLAGS.EXAMS.TESTS.CREATE_TESTS,
  },
  {
    path: ROUTES.exams.tests.update,
    permissions: [PERMISSIONS.TESTS.UPDATE_TESTS],
    flag: FEATURE_FLAGS.EXAMS.TESTS.UPDATE_TESTS,
  },
  {
    path: ROUTES.exams.tests.detail,
    permissions: [PERMISSIONS.TESTS.READ_DETAIL_TESTS],
    flag: FEATURE_FLAGS.EXAMS.TESTS.DETAIL_TESTS,
  },
  {
    path: ROUTES.exams.accurations.list,
    permissions: [PERMISSIONS.ACCURATIONS.READ_LIST_ACCURATIONS],
    flag: FEATURE_FLAGS.EXAMS.ACCURATIONS.LIST_ACCURATIONS,
  },
  {
    path: ROUTES.exams.accurations.detail,
    permissions: [PERMISSIONS.ACCURATIONS.READ_DETAIL_ACCURATIONS],
    flag: FEATURE_FLAGS.EXAMS.ACCURATIONS.DETAIL_ACCURATIONS,
  },
  {
    path: ROUTES.exams.accurations.create,
    permissions: [PERMISSIONS.ACCURATIONS.CREATE_ACCURATIONS],
    flag: FEATURE_FLAGS.EXAMS.ACCURATIONS.CREATE_ACCURATIONS,
  },
  {
    path: ROUTES.exams.accurations.update,
    permissions: [PERMISSIONS.ACCURATIONS.UPDATE_ACCURATIONS],
    flag: FEATURE_FLAGS.EXAMS.ACCURATIONS.UPDATE_ACCURATIONS,
  },
  {
    path: ROUTES.exams.results.list,
    permissions: [PERMISSIONS.RESULTS.READ_LIST_RESULTS],
    flag: FEATURE_FLAGS.EXAMS.RESULTS.LIST_RESULTS,
  },
  {
    path: ROUTES.exams.results.detail,
    permissions: [PERMISSIONS.RESULTS.READ_DETAIL_RESULTS],
    flag: FEATURE_FLAGS.EXAMS.RESULTS.DETAIL_RESULTS,
  },
  {
    path: ROUTES.exams.results.create,
    permissions: [PERMISSIONS.RESULTS.CREATE_RESULTS],
    flag: FEATURE_FLAGS.EXAMS.RESULTS.CREATE_RESULTS,
  },
  {
    path: ROUTES.exams.results.update,
    permissions: [PERMISSIONS.RESULTS.UPDATE_RESULTS],
    flag: FEATURE_FLAGS.EXAMS.RESULTS.UPDATE_RESULTS,
  },
];

const redirectToFirstAccessibleRoute = (userPermissions: string[]) => {
  const fallback = mappingRoutePermissions.find(
    (route) =>
      route.flag === true && route.permissions.some((perm) => userPermissions.includes(perm)),
  );
  return redirect(fallback?.path ?? ROUTES.auth.login);
};

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const session = SessionUser.get();
  const session_token = SessionToken.get();
  const token = session_token?.token?.access_token;
  const userPermissions = session?.user?.role.permissions.map((perm) => perm.name) || [];

  if (mappingPublicRoutes.includes(pathname)) {
    if (token) return redirect(ROUTES.dashboard);
    return null;
  }

  if (!session) return redirect(ROUTES.auth.login);

  const matchedRoute = mappingRoutePermissions.find((route) => route.path === pathname);

  if (matchedRoute) {
    const hasPermission =
      !matchedRoute.permissions ||
      matchedRoute.permissions.some((perm) => userPermissions.includes(perm));

    const isEnabled = matchedRoute.flag === true;

    if (!isEnabled || !hasPermission) {
      return redirectToFirstAccessibleRoute(userPermissions);
    }
  }

  return null;
};
