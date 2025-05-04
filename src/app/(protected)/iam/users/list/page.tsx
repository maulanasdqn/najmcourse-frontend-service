import { DataTable } from "@/app/_components/ui/data-table";
import { useListUser } from "./_hooks/use-list-user";
import { Button } from "antd";
import { Link } from "react-router";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListUser();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Users</h1>
        <Guard permissions={[PERMISSIONS.USERS.CREATE_USERS]}>
          <Link to={ROUTES.iam.users.create}>
            <Button size="large" type="primary">
              + Create User
            </Button>
          </Link>
        </Guard>
      </div>
      <DataTable
        scroll={{ x: "1400px" }}
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
