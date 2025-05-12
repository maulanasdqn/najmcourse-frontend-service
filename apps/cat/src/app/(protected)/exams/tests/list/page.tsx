import { DataTable } from "@/shared/components/ui/data-table";
import { useListTest } from "./_hooks/use-list-test";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import { PageHeadList } from "@/shared/components/ui/page-head-list";
import { Fragment } from "react/jsx-runtime";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading, columns, meta } = useListTest();

  return (
    <Fragment>
      <PageHeadList
        title={"List Tests"}
        createText={"+ Create Test"}
        createRoute={ROUTES.exams.tests.create}
        createPermission={PERMISSIONS.TESTS.CREATE_TESTS}
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
