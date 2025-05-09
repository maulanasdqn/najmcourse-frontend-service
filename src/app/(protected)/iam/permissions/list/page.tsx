import { DataTable } from "@/app/_components/ui/data-table";
import { useListPermissions } from "./_hooks/use-list-permissions";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";
import { Fragment } from "react/jsx-runtime";
import { PageHeadList } from "@/app/(protected)/_components/page-head-list/page-head-list";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading, columns, meta } = useListPermissions();

  return (
    <Fragment>
      <PageHeadList
        title={"List Permissions"}
        createText={"+ Create Permission"}
        createRoute={ROUTES.iam.permissions.create}
        createPermission={PERMISSIONS.PERMISSIONS.CREATE_PERMISSIONS}
      />
      <DataTable
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
