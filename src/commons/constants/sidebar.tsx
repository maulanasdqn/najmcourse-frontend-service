import { Link } from "react-router";
import { lazily } from "react-lazily";
import { ROUTES } from "./routes";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";

const { DashboardFilled, UserOutlined, StopFilled } = lazily(() => import("@ant-design/icons"));

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
    key: "notallowed",
    label: <Link to="/notallowed">Not Allowed</Link>,
    icon: <StopFilled />,
  },

  {
    key: "users",
    label: "IAM",
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USERS.READ_USERS],
    children: [
      {
        key: ROUTES.iam.users.list,
        label: <Link to={ROUTES.iam.users.list}>User</Link>,
        permissions: [PERMISSIONS.USERS.READ_USERS],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.roles.list,
        label: <Link to={ROUTES.iam.roles.list}>Role</Link>,
        permissions: [PERMISSIONS.ROLES.READ_ROLES],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.permissions.list,
        label: <Link to={ROUTES.iam.permissions.list}>Permission</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_PERMISSIONS],
        icon: <UserOutlined />,
      },
    ],
  },
];
