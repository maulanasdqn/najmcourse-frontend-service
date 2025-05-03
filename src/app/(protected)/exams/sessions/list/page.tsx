import { DataTable } from "@/app/_components/ui/data-table";
import { useListSession } from "./_hooks/use-list-session";
import { Button } from "antd";
import { Link } from "react-router";
import { Guard } from "@/app/_components/guard";
import { PERMISSIONS } from "@/commons/constants/permissions";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const { dataSource, isLoading, columns, meta } = useListSession();

  return (
    <section className="px-8 bg-white py-6 rounded-lg">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl mb-6">List Sessions</h1>
        <h1 className="text-2xl mb-6">
          <Guard permissions={[PERMISSIONS.SESSIONS.CREATE_SESSIONS]}>
            <Link to={ROUTES.exams.sessions.create}>
              <Button size="large" type="primary">
                + Create Session
              </Button>
            </Link>
          </Guard>
        </h1>
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
