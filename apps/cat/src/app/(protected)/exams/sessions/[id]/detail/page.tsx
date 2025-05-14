import { Card } from "antd";
import { generatePath, Link, useParams } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import { FC, Fragment, ReactElement } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import dayjs from "dayjs";
import { clsx } from "clsx";
import { ROUTES } from "@/shared/commons/constants/routes";

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailSession(params.id ?? "");
  const session = data?.data;
  const now = dayjs();

  return (
    <Fragment>
      <PageHeadDetail title={`Daftar Test ${session?.name}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {session?.tests?.map((test) => {
          const isExpired = dayjs(test.end_date).isBefore(now);

          const titleClass = clsx("font-semibold", {
            "text-blue-700": !isExpired,
            "text-gray-700": isExpired,
          });

          const cardClass = clsx("shadow-sm border cursor-pointer", {
            "bg-blue-50 border-blue-100": !isExpired,
            "bg-gray-50 border-gray-200 cursor-not-allowed": isExpired,
          });

          const headerStyle = {
            backgroundColor: isExpired ? "#f3f4f6" : "#e0f2fe",
            borderBottom: isExpired ? "1px solid #d1d5db" : "1px solid #bae6fd",
          };

          const cardContent = (
            <Card
              title={<span className={titleClass}>{test.test.name}</span>}
              className={cardClass}
              styles={{ header: headerStyle }}
            >
              <p className="text-sm text-gray-700">
                <strong>ID:</strong> {test.test.id}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Tanggal Mulai:</strong> {dayjs(test.start_date).format("DD/MM/YYYY HH:mm")}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Tanggal Selesai:</strong> {dayjs(test.end_date).format("DD/MM/YYYY HH:mm")}
              </p>
            </Card>
          );

          return isExpired ? (
            <div key={test.test.id}>{cardContent}</div>
          ) : (
            <Link
              key={test.test.id}
              to={generatePath(ROUTES.exams.sessions.test.detail, {
                id: session.id,
                testId: test.test.id,
              })}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Component;
