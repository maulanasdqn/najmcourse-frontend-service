import { DataTable } from "@/shared/components/ui/data-table";
import { useListRole } from "./_hooks/use-list-role";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import { PageHeadList } from "@/shared/components/ui/page-head-list/";
import { Fragment } from "react/jsx-runtime";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading, columns, meta } = useListRole();

  return (
    <Fragment>
      <PageHeadList
        title={"List Roles"}
        createText={"+ Create Role"}
        createRoute={ROUTES.iam.roles.create}
        createPermission={PERMISSIONS.ROLES.CREATE_ROLES}
      />
      <DataTable
        rowKey={"id"}
        filterOptions={[{ label: "Nama", value: "name" }]}
        filterValues={[
          { label: "Admin", value: "Admin" },
          { label: "Student", value: "Student" },
          { label: "Staf", value: "Staf" },
        ]}
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        meta={meta}
      />
    </Fragment>
  );
};

export default Component;
