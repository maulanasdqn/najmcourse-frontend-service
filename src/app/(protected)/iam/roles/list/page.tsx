import { DataTable } from "@/app/_components/ui/data-table";
import { useListRole } from "./_hooks/use-list-role";
import { Button } from "antd";
import { Link } from "react-router";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListRole();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Roles</h1>
        <Guard permissions={[PERMISSIONS.ROLES.CREATE_ROLES]}>
          <Link to={ROUTES.iam.roles.create}>
            <Button size="large" type="primary">
              + Create Role
            </Button>
          </Link>
        </Guard>
      </div>
      <DataTable
        rowKey={"id"}
        filterOptions={[{ label: "Nama", value: "name" }]}
        filterValues={[
          { label: "Admin", value: "Admin" },
          { label: "Student", value: "Student" },
        ]}
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        meta={meta}
      />
    </section>
  );
};

export default Component;
