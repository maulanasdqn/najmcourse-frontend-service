import { type FC, type ReactElement } from "react";
import { Layout, Menu, Typography, Flex, Grid, Dropdown, MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { SIDEBAR_ITEMS } from "@/commons/constants/sidebar";
import { filterPermission } from "@/utils/permission";
import { useSession } from "../_components/providers";
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTES } from "@/commons/constants/routes";

const { Header, Sider, Content } = Layout;

const ProtectedLayout: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { session, signOut } = useSession();
  const location = useLocation();
  const { md } = Grid.useBreakpoint();

  const userPermissions = session?.user?.role.permissions?.map((perm) => perm.name) || [];

  const filteredItems = filterPermission(
    SIDEBAR_ITEMS,
    (item) =>
      item.flag !== false &&
      (item.permissions === undefined ||
        item.permissions.some((permission) => userPermissions.includes(permission))),
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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => navigate(ROUTES.profile) as void,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => signOut(),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} breakpoint="md" collapsedWidth="0" theme="light">
        <div className="flex items-center justify-center h-16 px-4 bg-white border-b-[2px] border-gray-100 shadow">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Admin Panel
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
              NAJM Course
            </Typography.Title>

            <Dropdown menu={{ items }}>
              <div className="flex items-center gap-x-2 cursor-pointer relative">
                <span className="text-white text-lg">{session?.user?.fullname}</span>
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  alt="avatar"
                  width={30}
                  height={30}
                  src={
                    session?.user?.avatar ??
                    "https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg"
                  }
                />
                <DownOutlined />
                <button onClick={(e) => e.preventDefault()} />
              </div>
            </Dropdown>
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
