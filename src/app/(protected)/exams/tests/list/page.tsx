import { DataTable } from "@/app/_components/ui/data-table";
import { useListTest } from "./_hooks/use-list-test";
import { Button } from "antd";
import { Link } from "react-router";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListTest();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Tests</h1>
        <h1 className="text-2xl mb-6">
          <Guard permissions={[PERMISSIONS.TESTS.CREATE_TESTS]}>
            <Link to={ROUTES.exams.tests.create}>
              <Button size="large" type="primary">
                + Create Test
              </Button>
            </Link>
          </Guard>
        </h1>
      </div>
      <DataTable
        rowKey={"id"}
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        meta={meta}
      />
    </section>
  );
};

export default Component;
