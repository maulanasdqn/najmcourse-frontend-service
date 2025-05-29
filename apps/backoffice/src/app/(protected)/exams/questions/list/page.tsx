import { DataTable } from "@/shared/components/ui/data-table";
import { useListQuestion } from "./_hooks/use-list-question";
import { PERMISSIONS } from "@/shared/commons/constants/permissions";
import { ROUTES } from "@/shared/commons/constants/routes";
import { PageHeadList } from "@/shared/components/ui/page-head-list";
import { Fragment } from "react/jsx-runtime";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading, columns, meta } = useListQuestion();

  return (
    <Fragment>
      <PageHeadList
        title={"Bank Questions"}
        createText={"+ Create Question"}
        createRoute={ROUTES.exams.questions.create}
        createPermission={PERMISSIONS.QUESTIONS.CREATE_QUESTIONS}
      />
      <DataTable
        scroll={{ x: "2100px" }}
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
