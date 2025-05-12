import { Row, Col } from "antd";
import { FC, ReactElement } from "react";
import { Outlet } from "react-router";
import { useAuth } from "./_hooks/use-auth";

export const AuthLayout: FC = (): ReactElement => {
  const { styles, token } = useAuth();

  return (
    <section style={styles.section}>
      <Row style={styles.row} justify="center">
        <Col xs={24} md={12} style={styles.formWrapper}>
          <Outlet />
        </Col>
        <Col xs={0} md={12} style={styles.illustrationWrapper}>
          <svg
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 9H7V7A5 5 0 0117 7V9Z" stroke={token.colorPrimary} strokeWidth="2" />
            <rect
              x="3"
              y="9"
              width="18"
              height="12"
              rx="2"
              stroke={token.colorPrimary}
              strokeWidth="2"
            />
            <circle cx="12" cy="15" r="2" fill={token.colorPrimary} />
          </svg>
        </Col>
      </Row>
    </section>
  );
};

export default AuthLayout;
