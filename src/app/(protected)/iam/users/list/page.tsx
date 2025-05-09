import { DataTable } from "@/app/_components/ui/data-table";
import { useListUser } from "./_hooks/use-list-user";
import { PageHeadList } from "@/app/(protected)/_components/page-head-list/page-head-list";
import { Fragment } from "react/jsx-runtime";
import { ROUTES } from "@/commons/constants/routes";
import { PERMISSIONS } from "@/commons/constants/permissions";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListUser();

  return (
    <Fragment>
      <PageHeadList
        title={"List Users"}
        createText={"+ Create User"}
        createRoute={ROUTES.iam.users.create}
        createPermission={PERMISSIONS.USERS.CREATE_USERS}
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
