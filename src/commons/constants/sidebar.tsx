import { Link } from "react-router";
import { lazily } from "react-lazily";
import { ROUTES } from "./routes";
import { PERMISSIONS } from "./permissions";
import { ReactNode } from "react";

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
    key: "iam",
    label: "IAM",
    icon: <UserOutlined />,
    permissions: [PERMISSIONS.USERS.READ_LIST_USERS],
    children: [
      {
        key: ROUTES.iam.users.list,
        label: <Link to={ROUTES.iam.users.list}>Users</Link>,
        permissions: [PERMISSIONS.USERS.READ_DETAIL_USERS],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.roles.list,
        label: <Link to={ROUTES.iam.roles.list}>Roles</Link>,
        permissions: [PERMISSIONS.ROLES.READ_LIST_ROLES],
        icon: <UserOutlined />,
      },
      {
        key: ROUTES.iam.permissions.list,
        label: <Link to={ROUTES.iam.permissions.list}>Permissions</Link>,
        permissions: [PERMISSIONS.PERMISSIONS.READ_LIST_PERMISSIONS],
        icon: <UserOutlined />,
      },
    ],
  },
];
