import { PageHeadList } from "@/shared/components/ui/page-head-list";
import { Result } from "antd";
import { FC, Fragment, ReactElement } from "react";

const Component: FC = (): ReactElement => (
  <Fragment>
    <PageHeadList title="List Payments" />
    <Result status="info" title="Comming Soon" subTitle="The feature is not available yet." />
  </Fragment>
);

export default Component;
