import { DataTable } from "@/shared/components/ui/data-table";
import { useListSession } from "./_hooks/use-list-session";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import { Fragment } from "react/jsx-runtime";
import { PageHeadList } from "@/shared/components/ui/page-head-list";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading, columns, meta } = useListSession();

  return (
    <Fragment>
      <PageHeadList
        title={"List Sessions"}
        createText={"+ Create Session"}
        createRoute={ROUTES.exams.sessions.create}
        createPermission={PERMISSIONS.SESSIONS.CREATE_SESSIONS}
      />
      <DataTable
        scroll={{ x: "1400px" }}
        rowKey={"id"}
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        meta={meta}
      />
    </Fragment>
  );
};

export default Component;
