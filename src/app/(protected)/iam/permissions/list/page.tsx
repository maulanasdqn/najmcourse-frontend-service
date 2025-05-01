import { DataTable } from "@/app/_components/ui/data-table";
import { useListPermissions } from "./_hooks/use-list-permissions";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListPermissions();

  return (
    <section className="px-8">
      <h1 className="text-2xl mb-6 px-2">Permissions</h1>
      <DataTable loading={isLoading} dataSource={dataSource} columns={columns} meta={meta} />
    </section>
  );
};

export default Component;
