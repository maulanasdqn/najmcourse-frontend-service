import type { FC, ReactElement } from "react";
import { Layout, Menu, Typography, Grid } from "antd";
import { Outlet } from "react-router";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";
import { filterPermission } from "@/utils/permission";
import { useSession } from "../providers/session";

const { Header, Sider, Content } = Layout;

export const ProtectedLayout: FC = (): ReactElement => {
  const { session } = useSession();
  const userPermissions = session?.user?.role?.permissions?.map((perm) => perm.name) || [];

  const { md } = Grid.useBreakpoint();

  const filteredItems = filterPermission(
    SIDEBAR_ITEMS,
    (item) =>
      item.permissions === undefined ||
      item.permissions.some((permission) => userPermissions.includes(permission)),
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} breakpoint="md" collapsedWidth="0" theme="light">
        <div
          style={{
            height: 64,
            margin: 16,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography.Title level={4} style={{ margin: 0, fontSize: 20 }}>
            Vite Admiral
          </Typography.Title>
        </div>
        <Menu mode="inline" items={filteredItems} style={{ borderRight: 0 }} />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: md ? "#001529" : "#fff",
            display: "flex",
            alignItems: "center",
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
            Vite Admiral
          </Typography.Title>
        </Header>

        <Content style={{ margin: "24px 16px", overflow: "auto" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
