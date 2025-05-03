import { Link } from "react-router";
import { lazily } from "react-lazily";
import { ROUTES } from "./routes";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";
import {
  ApiOutlined,
  BookOutlined,
  ClockCircleOutlined,
  FormOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { DashboardFilled, UserOutlined } = lazily(() => import("@ant-design/icons"));

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  permissions?: string[];
  children?: TSidebarItem[];
};

export const SIDEBAR_ITEMS: TSidebarItem[] = [
  {
    key: "dashboard",
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <DashboardFilled />,
  },
  {
    key: "exams",
    label: "Exams",
    icon: <BookOutlined />,
    permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS, PERMISSIONS.TESTS.READ_LIST_TESTS],
    children: [
      {
        key: ROUTES.exams.sessions.list,
        label: <Link to={ROUTES.exams.sessions.list}>Sessions</Link>,
        permissions: [PERMISSIONS.SESSIONS.READ_LIST_SESSIONS],
        icon: <ClockCircleOutlined />,
      },
      {
        key: ROUTES.exams.tests.list,
        label: <Link to={ROUTES.exams.tests.list}>Tests</Link>,
        permissions: [PERMISSIONS.TESTS.READ_LIST_TESTS],
        icon: <FormOutlined />,
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
    children: [
      {
        key: ROUTES.iam.users.list,
        label: <Link to={ROUTES.iam.users.list}>Users</Link>,
        permissions: [PERMISSIONS.USERS.READ_LIST_USERS],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.roles.list,
        label: <Link to={ROUTES.iam.roles.list}>Roles</Link>,
        permissions: [PERMISSIONS.ROLES.READ_LIST_ROLES],
        icon: <ApiOutlined />,
      },
      {
        key: ROUTES.iam.permissions.list,
        label: <Link to={ROUTES.iam.permissions.list}>Permissions</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS],
        icon: <IdcardOutlined />,
      },
    ],
  },
];
