import type { FC, ReactElement } from "react";
import { LayoutWithHeader } from "admiral";
import { Outlet } from "react-router";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";
import { filterPermission } from "@/utils/permission";
import { Flex, Typography, Button } from "antd";
import { useSession } from "../_components/providers/session";

const ProtectedLayout: FC = (): ReactElement => {
  const { session, signout } = useSession();
  const userPermissions =
    session?.user?.roles?.map((role) => role.permissions?.map((perm) => perm.name)).flat() || [];
  console.log(userPermissions);

  const _handleLogout = () => {
    signout();
  };

  const filteredItems = filterPermission(
    SIDEBAR_ITEMS,
    (item) =>
      item.permissions === undefined ||
      item.permissions.some((permission) => userPermissions.includes(permission)),
  );

  return (
    <LayoutWithHeader
      header={{
        brandLogo: (
          <Flex align="center" gap={8}>
            <Typography.Title
              level={4}
              style={{
                marginBottom: 0,
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              Vite Admiral
            </Typography.Title>
          </Flex>
        ),
        menu: (
          <Button type="primary" onClick={_handleLogout}>
            Logout
          </Button>
        ),
      }}
      sidebar={{
        width: 250,
        menu: filteredItems,
        theme: "light",
      }}
    >
      <Outlet />
    </LayoutWithHeader>
  );
};

export default ProtectedLayout;
