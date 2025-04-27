import { ConfigProvider, type ThemeConfig } from "antd";
import { Outlet } from "react-router";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4D9AC1", // Biru cerah buat primary color
    colorLink: "#4D9AC1",
    colorBgLayout: "#FFFFFF", // Latar belakang tetap putih
    colorText: "#0B0A13", // Text warna hitam kebiruan
  },
  components: {
    Menu: {
      itemColor: "#2A3E52", // Navy untuk warna item
      itemSelectedColor: "#B5DBED", // Biru muda pas item selected
      itemHoverBg: "#4D9AC1", // Hover pakai biru cerah
      itemHoverColor: "#B5DBED",
      itemSelectedBg: "#4D9AC1",
      fontSize: 14,
      horizontalItemSelectedColor: "#4D9AC1",
    },
    Layout: {
      headerColor: "#FFFFFF",
      headerBg: "#2A3E52", // Header dark navy
    },
    Button: {
      colorPrimary: "#4D9AC1",
      colorPrimaryHover: "#2A3E52",
      colorPrimaryActive: "#2A3E52",
    },
  },
};

const ThemeProvider: React.FC<React.PropsWithChildren> = () => {
  return (
    <ConfigProvider theme={theme}>
      <Outlet />
    </ConfigProvider>
  );
};

export default ThemeProvider;
