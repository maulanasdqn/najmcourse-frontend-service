import { DataTable } from "@/app/_components/ui/data-table";
import { useListPermissions } from "./_hooks/use-list-permissions";
import { Button } from "antd";
import { Link } from "react-router";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListPermissions();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Permissions</h1>
        <h1 className="text-2xl mb-6">
          <Guard permissions={[PERMISSIONS.PERMISSIONS.CREATE_PERMISSIONS]}>
            <Link to={ROUTES.iam.permissions.create}>
              <Button size="large" type="primary">
                + Create Permission
              </Button>
            </Link>
          </Guard>
        </h1>
      </div>
      <DataTable
        rowKey={"id"}
        filterOptions={[{ label: "Nama", value: "name" }]}
        filterValues={[
          { label: "Create Users", value: "Create Users" },
          { label: "Create Permissions", value: "Create Permissions" },
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
