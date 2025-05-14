import { Card } from "antd";
import { useListSession } from "./_hooks/use-list-session";
import { Fragment } from "react/jsx-runtime";
import { PageHeadList } from "@/shared/components/ui/page-head-list";
import { FC, ReactElement, useMemo } from "react";
import { ROUTES } from "@/shared/commons/constants/routes";
import { match, P } from "ts-pattern";
import { generatePath, Link } from "react-router";

export const Component: FC = (): ReactElement => {
  const { dataSource, isLoading } = useListSession();

  const loadingCardKeys = useMemo(
    () => Array.from({ length: 6 }).map(() => crypto.randomUUID()),
    [],
  );

  return (
    <Fragment>
      <PageHeadList title={"Daftar Sesi Ujian"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {match({ isLoading, dataSource })
          .with({ isLoading: true }, () =>
            loadingCardKeys.map((k) => <Card key={k} loading className="h-44" />),
          )
          .with(
            { isLoading: false, dataSource: P.when((d) => d && d.length > 0) },
            ({ dataSource }) =>
              dataSource
                ?.filter((item) => item.is_active !== false)
                .map((item) => (
                  <Link key={item.id} to={generatePath(ROUTES.exams.sessions.detail, item)}>
                    <Card title={item.name}>
                      <p>{item.description}</p>
                      <p className="text-sm">
                        <strong>Kategori Ujian:</strong> {item.category}
                      </p>
                      <p className="text-sm">
                        <strong>Jumlah Test:</strong> {item.tests_count}
                      </p>
                    </Card>
                  </Link>
                )),
          )
          .otherwise(() => (
            <div className="col-span-full text-center text-gray-400 py-10">
              <p className="text-lg">Belum ada sesi ujian</p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Component;
