import type { FC, ReactElement } from "react";
import { Layout, Menu, Typography, Flex, Grid, Image } from "antd";
import { Outlet, useLocation } from "react-router";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";
import { filterPermission } from "@/utils/permission";
import { useSession } from "../_components/providers";

const { Header, Sider, Content } = Layout;

const ProtectedLayout: FC = (): ReactElement => {
  const { session } = useSession();
  const location = useLocation();
  const { md } = Grid.useBreakpoint();

  const userPermissions = session?.user?.role.permissions?.map((perm) => perm.name) || [];

  const filteredItems = filterPermission(
    SIDEBAR_ITEMS,
    (item) =>
      item.permissions === undefined ||
      item.permissions.some((permission) => userPermissions.includes(permission)),
  );

  const menuItems = filteredItems.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon,
    children: item.children?.map((child) => ({
      key: child.key,
      label: child.label,
      icon: child.icon,
    })),
  }));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="bg-gray-200" width={250} breakpoint="md" collapsedWidth="0" theme="light">
        <div className="flex items-center justify-center h-16 px-4 bg-white border-b border-gray-100 shadow">
          <Typography.Title level={4} style={{ margin: 0 }}>
            {session?.user?.role?.name}
          </Typography.Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow p-2 flex items-center justify-between">
          <Flex
            align="center"
            gap={8}
            justify="space-between"
            style={{
              width: "100%",
            }}
          >
            <Typography.Title
              level={4}
              style={{
                marginBottom: 0,
                color: md ? "white" : "black",
                whiteSpace: "nowrap",
              }}
            >
              NAJM Course Backoffice
            </Typography.Title>
            <div className="flex items-center gap-x-2">
              <span className="text-white text-lg">{session?.user?.fullname}</span>
              <Image
                style={{
                  borderRadius: "50%",
                }}
                width={30}
                src={
                  session?.user?.avatar ??
                  "https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg"
                }
              />
            </div>
          </Flex>
        </Header>
        <Content style={{ margin: "24px 16px", overflow: "auto" }}>
          <section className="px-8 bg-white py-6 rounded-lg">
            <Outlet />
          </section>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedLayout;
