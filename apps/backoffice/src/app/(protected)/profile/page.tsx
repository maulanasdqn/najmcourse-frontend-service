import { Result } from "antd";
import { FC, Fragment, ReactElement } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";

const Component: FC = (): ReactElement => (
  <Fragment>
    <PageHeadDetail title="Profile" />
    <Result status="info" title="Comming Soon" subTitle="The feature is not available yet." />
  </Fragment>
);

export default Component;
