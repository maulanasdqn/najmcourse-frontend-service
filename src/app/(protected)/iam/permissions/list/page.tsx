import { DataTable } from "@/app/_components/ui/data-table";
import { useListPermissions } from "./_hooks/use-list-permissions";
import { Button } from "antd";
import { Link } from "react-router";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListPermissions();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Permissions</h1>
        <h1 className="text-2xl mb-6">
          <Link to="/iam/permissions/create">
            <Button size="large" type="primary">
              + Create Permission
            </Button>
          </Link>
        </h1>
      </div>
      <DataTable
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
