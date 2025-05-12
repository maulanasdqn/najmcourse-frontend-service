import { Button, Result } from "antd";
import { FC, ReactElement } from "react";

const AppNotFound: FC = (): ReactElement => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default AppNotFound;
