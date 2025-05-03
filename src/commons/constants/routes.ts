export const ROUTES = {
  dashboard: "/dashboard",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    callback: "/auth/oauth-callback",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  iam: {
    users: {
      list: "/iam/users/list",
      create: "/iam/users/create",
      detail: "/iam/users/:id/detail",
      update: "/iam/users/:id/update",
      delete: "/iam/users/:id/delete",
    },
    roles: {
      list: "/iam/roles/list",
      create: "/iam/roles/create",
      detail: "/iam/roles/:id/detail",
      update: "/iam/roles/:id/update",
      delete: "/iam/roles/:id/delete",
    },
    permissions: {
      list: "/iam/permissions/list",
      create: "/iam/permissions/create",
      detail: "/iam/permissions/:id/detail",
      update: "/iam/permissions/:id/update",
      delete: "/iam/permissions/:id/delete",
    },
  },
  exams: {
    sessions: {
      list: "/exams/sessions/list",
      create: "/exams/sessions/create",
      detail: "/exams/sessions/:id/detail",
      update: "/exams/sessions/:id/update",
    },
    tests: {
      list: "/exams/tests/list",
      create: "/exams/tests/create",
      detail: "/exams/tests/:id/detail",
      update: "/exams/tests/:id/update",
      delete: "/exams/tests/:id/delete",
    },
  },
};
