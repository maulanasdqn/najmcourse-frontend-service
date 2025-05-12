import { Grid, theme } from "antd";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export const useAuth = () => {
  const screens = useBreakpoint();
  const { token } = useToken();

  const styles = {
    section: {
      height: "100vh",
      backgroundColor: "#FFF",
    },
    illustrationWrapper: {
      backgroundColor: token.colorPrimaryBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: token.paddingXL,
      height: "100%",
    },
    formWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: screens.md ? `${token.paddingXL}px` : `${token.padding}px`,
      height: "100%",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center" as const,
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center" as const,
    },
    row: {
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  };

  return {
    styles,
    token,
  };
};
