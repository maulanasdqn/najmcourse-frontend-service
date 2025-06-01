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

  const filteredDataSource = useMemo(
    () => dataSource?.filter((item) => item.is_active !== false) || [],
    [dataSource],
  );

  return (
    <Fragment>
      <PageHeadList title={"Daftar Sesi Ujian"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {match({ isLoading, dataSource, filteredDataSource })
          .with({ isLoading: true }, () =>
            loadingCardKeys.map((k) => <Card key={k} loading className="h-44" />),
          )
          .with(
            {
              isLoading: false,
              dataSource: P.when((d) => d && d.length > 0),
              filteredDataSource: P.when((f) => f.length > 0),
            },
            ({ filteredDataSource }) =>
              filteredDataSource.map((item) => (
                <Link key={item.id} to={generatePath(ROUTES.exams.sessions.detail, item)}>
                  <Card className="shadow-md" title={item.name}>
                    <img
                      className="w-full h-auto mb-4 rounded-lg"
                      src={
                        item.banner ??
                        "https://www.open.edu.au/-/media/blog/2022/04-april/how-to-study-for-exams-at-university.jpg?rev=36c9b6e3e64543d082bead36c4f4585d&hash=097053DEA83CCCDFAD0483FF6AFB2E5E"
                      }
                      alt="banner"
                      width={400}
                      height={200}
                    />
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
            <div className="col-span-full flex flex-col items-center gap-y-6 text-center text-gray-400 py-10">
              <img
                alt=""
                src="https://cdni.iconscout.com/illustration/premium/thumb/sorry-item-not-found-illustration-download-in-svg-png-gif-file-formats--available-product-tokostore-pack-e-commerce-shopping-illustrations-2809510.png"
              />
              <p className="text-2xl font-semibold text-gray-700">Belum ada sesi ujian</p>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Component;
