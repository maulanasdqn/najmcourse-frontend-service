import { Link } from "react-router";
import { lazily } from "react-lazily";
import { ROUTES } from "./routes";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";
import {
  ApiOutlined,
  BookOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  EuroOutlined,
  FlagOutlined,
  FormOutlined,
  FullscreenExitOutlined,
  IdcardOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { FEATURE_FLAGS } from "@/shared/libs/feature-flag";
import { env } from "@/shared/libs/env";

const { DashboardFilled, UserOutlined } = lazily(() => import("@ant-design/icons"));

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  permissions?: string[];
  flag?: boolean;
  children?: TSidebarItem[];
};

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
    flag: FEATURE_FLAGS.DASHBOARD.READ_DASHBOARD,
    permissions: [PERMISSIONS.DASHBOARD.READ_DASHBOARD],
  },
  {
    key: "exams",
    label: env.VITE_FEATURE_FLAG_IS_CAT ? "Ujian" : "Exams",
    icon: <BookOutlined />,
    permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS, PERMISSIONS.TESTS.READ_LIST_TESTS],
    flag: FEATURE_FLAGS.EXAMS.SESSIONS.LIST_SESSIONS || FEATURE_FLAGS.EXAMS.TESTS.LIST_TESTS,
    children: [
      {
        key: ROUTES.exams.sessions.list,
        label: (
          <Link to={ROUTES.exams.sessions.list}>
            {env.VITE_FEATURE_FLAG_IS_CAT ? "Sesi" : "Sessions"}
          </Link>
        ),
        permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS],
        flag: FEATURE_FLAGS.EXAMS.SESSIONS.LIST_SESSIONS,
        icon: <ClockCircleOutlined />,
      },
      {
        key: ROUTES.exams.tests.list,
        label: <Link to={ROUTES.exams.tests.list}>Tests</Link>,
        permissions: [PERMISSIONS.TESTS.READ_LIST_TESTS],
        flag: FEATURE_FLAGS.EXAMS.TESTS.LIST_TESTS,
        icon: <FormOutlined />,
      },
      {
        key: ROUTES.exams.questions.list,
        label: <Link to={ROUTES.exams.questions.list}>Bank Question</Link>,
        permissions: [PERMISSIONS.QUESTIONS.READ_LIST_QUESTIONS],
        flag: FEATURE_FLAGS.EXAMS.QUESTIONS.LIST_QUESTIONS,
        icon: <QuestionOutlined />,
      },
      {
        key: ROUTES.exams.accurations.list,
        label: <Link to={ROUTES.exams.accurations.list}>Test Accurations</Link>,
        permissions: [PERMISSIONS.ACCURATIONS.READ_LIST_ACCURATIONS],
        flag: FEATURE_FLAGS.EXAMS.ACCURATIONS.LIST_ACCURATIONS,
        icon: <FullscreenExitOutlined />,
      },
      {
        key: ROUTES.exams.results.list,
        label: <Link to={ROUTES.exams.results.list}>Test Results</Link>,
        permissions: [PERMISSIONS.RESULTS.READ_LIST_RESULTS],
        flag: FEATURE_FLAGS.EXAMS.RESULTS.LIST_RESULTS,
        icon: <CheckSquareOutlined />,
      },
    ],
  },
  {
    key: "iam",
    label: "IAM",
    icon: <UserOutlined />,
    permissions: [
      PERMISSIONS.USERS.READ_LIST_USERS,
      PERMISSIONS.ROLES.READ_LIST_ROLES,
      PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS,
    ],
    flag:
      FEATURE_FLAGS.IAM.USERS.LIST_USERS ||
      FEATURE_FLAGS.IAM.ROLES.LIST_ROLES ||
      FEATURE_FLAGS.IAM.PERMISSIONS.LIST_PERMISSIONS,
    children: [
      {
        key: ROUTES.iam.users.list,
        label: <Link to={ROUTES.iam.users.list}>Users</Link>,
        permissions: [PERMISSIONS.USERS.READ_LIST_USERS],
        flag: FEATURE_FLAGS.IAM.USERS.LIST_USERS,
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.roles.list,
        label: <Link to={ROUTES.iam.roles.list}>Roles</Link>,
        permissions: [PERMISSIONS.ROLES.READ_LIST_ROLES],
        flag: FEATURE_FLAGS.IAM.ROLES.LIST_ROLES,
        icon: <ApiOutlined />,
      },
      {
        key: ROUTES.iam.permissions.list,
        label: <Link to={ROUTES.iam.permissions.list}>Permissions</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS],
        flag: FEATURE_FLAGS.IAM.PERMISSIONS.LIST_PERMISSIONS,
        icon: <IdcardOutlined />,
      },
    ],
  },
  {
    key: "payments",
    label: <Link to={ROUTES.payments.list}>Payments</Link>,
    icon: <EuroOutlined />,
    permissions: [PERMISSIONS.PAYMENTS.READ_LIST_PAYMENTS],
    flag: FEATURE_FLAGS.PAYMENTS.LIST_PAYMENTS,
  },
  {
    key: "flags",
    label: <Link to={ROUTES.flags.list}>Flags</Link>,
    icon: <FlagOutlined />,
    permissions: [PERMISSIONS.FLAGS.READ_LIST_FLAGS],
    flag: FEATURE_FLAGS.FLAGS.LIST_FLAGS,
  },
];
