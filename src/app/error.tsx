import type { FC, ReactElement } from "react";
import { useRouteError, useNavigate } from "react-router";
import { Button, Flex, Result } from "antd";

const AppError: FC = (): ReactElement => {
  const error = useRouteError() as Response;
  console.log("global error: ", error);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Flex style={{ minHeight: "100vh" }} justify="center" align="center">
      {error.status === 403 ? (
        <Result
          status="403"
          title="403"
          subTitle="Forbidden - Anda tidak memiliki akses untuk halaman ini."
          extra={
            <Button type="primary" onClick={handleGoBack}>
              Kembali
            </Button>
          }
        />
      ) : (
        <Result
          status="500"
          title="Internal Server Error"
          subTitle={"Terjadi kesalahan di server silahkan hubungi admin."}
          extra={
            <Button type="primary" onClick={handleGoBack}>
              Kembali
            </Button>
          }
        />
      )}
    </Flex>
  );
};

export default AppError;
