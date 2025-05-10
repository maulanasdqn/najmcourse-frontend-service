import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail";
import { Result } from "antd";
import { FC, Fragment, ReactElement } from "react";

const Component: FC = (): ReactElement => (
  <Fragment>
    <PageHeadDetail title="List Test Results" />
    <Result status="info" title="Comming Soon" subTitle="The feature is not available yet." />
  </Fragment>
);

export default Component;
