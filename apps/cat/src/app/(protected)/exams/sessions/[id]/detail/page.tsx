import { Button, Card, Tag } from "antd";
import { generatePath, Link, useParams } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import { useGetDetailByTestAndUserIdAnswer } from "@/shared/hooks/answers/use-get-detail-by-test-and-user-id-answer";
import { SessionUser } from "@/shared/libs/localstorage";
import { FC, Fragment, ReactElement, useState, useEffect } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import dayjs from "dayjs";
import { clsx } from "clsx";
import { ROUTES } from "@/shared/commons/constants/routes";
import type { TSessionDetailItem, TSessionDetailTestItem } from "@/shared/apis/sessions/type";

// Countdown Timer Component
const CountdownTimer: FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diff = target.diff(now);

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded-md p-3 mt-2">
      <p className="text-sm font-semibold text-yellow-800 mb-2">Ujian dimulai dalam:</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-yellow-700">{formatTime(timeLeft.days)}</div>
          <div className="text-xs text-yellow-600">Hari</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-yellow-700">{formatTime(timeLeft.hours)}</div>
          <div className="text-xs text-yellow-600">Jam</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-yellow-700">{formatTime(timeLeft.minutes)}</div>
          <div className="text-xs text-yellow-600">Menit</div>
        </div>
        <div className="bg-white rounded p-2">
          <div className="text-lg font-bold text-yellow-700">{formatTime(timeLeft.seconds)}</div>
          <div className="text-xs text-yellow-600">Detik</div>
        </div>
      </div>
    </div>
  );
};

// User type from localStorage
type TUserItem = {
  id: string;
  role: {
    id: string;
    name: string;
    permissions: Array<{
      id: string;
      name: string;
      created_at: string;
      updated_at: string;
    }>;
    created_at: string;
    updated_at: string;
  };
  fullname: string;
  email: string;
  avatar?: string | null;
  phone_number: string;
  referred_by: string | null;
  referral_code: string | null;
  student_type: string;
  is_active: boolean;
  is_profile_completed: boolean;
  identity_number: string | null;
  religion: string | null;
  gender: string | null;
  birthdate: string | null;
  updated_at: string;
  created_at: string;
};

// Component to handle individual test card with exam completion check
const TestCard: FC<{
  test: TSessionDetailTestItem;
  session: TSessionDetailItem;
  currentUser: TUserItem | undefined;
}> = ({ test, session, currentUser }) => {
  const now = dayjs();

  // Check if user has already taken this exam
  const { data: answerData } = useGetDetailByTestAndUserIdAnswer({
    testId: test.test.id,
    userId: currentUser?.id ?? "",
  });
  const hasCompletedExam = !!answerData?.data;

  const startDate = dayjs(test.start_date);
  const endDate = dayjs(test.end_date);

  let statusText = "";
  let tagColor = "";

  if (hasCompletedExam) {
    statusText = "Ujian Telah Diselesaikan";
    tagColor = "green";
  } else if (endDate.isBefore(now)) {
    statusText = "Ujian Telah Berakhir";
    tagColor = "red";
  } else if (startDate.isAfter(now)) {
    statusText = "Ujian Belum Dimulai";
    tagColor = "yellow";
  } else {
    statusText = "Ujian Sedang Berlangsung";
    tagColor = "blue";
  }

  const titleClass = clsx("font-semibold", {
    "text-green-700": tagColor === "green",
    "text-blue-700": tagColor === "blue",
    "text-yellow-700": tagColor === "yellow",
    "text-gray-700": tagColor === "red",
  });

  const cardClass = clsx("shadow-sm border", {
    "bg-green-50 border-green-100 hover:border-green-300": tagColor === "green",
    "bg-blue-50 border-blue-100 hover:border-blue-300": tagColor === "blue",
    "bg-yellow-50 border-yellow-100 hover:border-yellow-300": tagColor === "yellow",
    "bg-gray-50 border-gray-200 cursor-not-allowed": tagColor === "red",
  });

  return (
    <Card
      title={<span className={titleClass}>{test.test.name}</span>}
      className={cardClass}
      styles={{
        header: {
          backgroundColor:
            tagColor === "green"
              ? "#f0fdf4"
              : tagColor === "red"
                ? "#f3f4f6"
                : tagColor === "yellow"
                  ? "#fef9c3"
                  : "#e0f2fe",
          borderBottom:
            tagColor === "green"
              ? "1px solid #bbf7d0"
              : tagColor === "red"
                ? "1px solid #d1d5db"
                : tagColor === "yellow"
                  ? "1px solid #fde68a"
                  : "1px solid #bae6fd",
        },
      }}
    >
      <div className="flex flex-col gap-y-4 h-full">
        <Tag className="w-fit" color={tagColor}>
          {statusText}
        </Tag>
        {hasCompletedExam && (
          <div className="bg-green-100 border border-green-300 rounded-md p-2">
            <p className="text-sm text-green-800">
              <strong>Skor:</strong> {answerData?.data?.score || 0}
            </p>
          </div>
        )}
        {tagColor === "yellow" && <CountdownTimer targetDate={test.start_date} />}
        <div className="flex flex-col">
          <p className="text-sm text-gray-700">
            <strong>Kategori:</strong> {session?.category}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Jumlah Soal:</strong> {test?.test?.questions?.length}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Tanggal Mulai:</strong> {dayjs(test.start_date).format("DD/MM/YYYY HH:mm")}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Tanggal Selesai:</strong> {dayjs(test.end_date).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
        <div className="mt-auto pt-4">
          {hasCompletedExam && (
            <Link
              to={generatePath(ROUTES.exams.sessions.test.result, {
                id: session.id,
                testId: test.test.id,
              })}
            >
              <Button type="default" block>
                Lihat Hasil Ujian
              </Button>
            </Link>
          )}
          {!hasCompletedExam && tagColor === "red" && (
            <Button type="default" block disabled>
              Ujian Telah Berakhir
            </Button>
          )}
          {!hasCompletedExam && (tagColor === "blue" || tagColor === "yellow") && (
            <Link
              to={generatePath(ROUTES.exams.sessions.test.ongoing, {
                id: session.id,
                testId: test.test.id,
              })}
              onClick={(e) => {
                if (tagColor === "yellow") e.preventDefault();
              }}
              style={tagColor === "yellow" ? { pointerEvents: "none" } : {}}
            >
              <Button type="primary" block disabled={tagColor === "yellow"}>
                Ikuti Ujian
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailSession(params.id ?? "");
  const session = data?.data;
  const currentUser = SessionUser.get()?.user;

  return (
    <Fragment>
      <PageHeadDetail title={`Daftar Test ${session?.name}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {session?.tests?.map((test) => (
          <div key={test.test.id}>
            <TestCard test={test} session={session} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Component;
