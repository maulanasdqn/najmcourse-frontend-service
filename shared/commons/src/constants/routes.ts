export const ROUTES = {
  profile: "/profile",
  dashboard: "/dashboard",
  auth: {
    login: "/auth/login",
    verify: "/auth/verify",
    payment: "/auth/payment",
    forgotPassword: "/auth/forgot",
    resetPassword: "/auth/reset",
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
      test: {
        start: "/exams/sessions/:id/test/:testId/start",
        result: "/exams/sessions/:id/test/:testId/result",
        ongoing: "/exams/sessions/:id/test/:testId/ongoing",
      },
    },
    tests: {
      list: "/exams/tests/list",
      create: "/exams/tests/create",
      detail: "/exams/tests/:id/detail",
      update: "/exams/tests/:id/update",
      delete: "/exams/tests/:id/delete",
    },
    tests_psikologi: {
      list: "/exams/psikologi/list",
      create: "/exams/psikologi/create",
      detail: "/exams/psikologi/:id/detail",
      update: "/exams/psikologi/:id/update",
      delete: "/exams/psikologi/:id/delete",
    },
    accurations: {
      list: "/exams/accurations/list",
      create: "/exams/accurations/create",
      detail: "/exams/accurations/:id/detail",
      update: "/exams/accurations/:id/update",
      delete: "/exams/accurations/:id/delete",
    },
    results: {
      list: "/exams/results/list",
      create: "/exams/results/create",
      detail: "/exams/results/:id/detail",
      update: "/exams/results/:id/update",
      delete: "/exams/results/:id/delete",
    },
    questions: {
      list: "/exams/questions/list",
      create: "/exams/questions/create",
      detail: "/exams/questions/:id/detail",
      update: "/exams/questions/:id/update",
      delete: "/exams/questions/:id/delete",
    },
    options: {
      list: "/exams/options/list",
      create: "/exams/options/create",
      detail: "/exams/options/:id/detail",
      update: "/exams/options/:id/update",
      delete: "/exams/options/:id/delete",
    },
  },
  payments: {
    list: "/payments/list",
    create: "/payments/create",
    detail: "/payments/:id/detail",
    update: "/payments/:id/update",
    delete: "/payments/:id/delete",
  },
  flags: {
    list: "/flags/list",
    create: "/flags/create",
    detail: "/flags/:id/detail",
    update: "/flags/:id/update",
    delete: "/flags/:id/delete",
  },
};
