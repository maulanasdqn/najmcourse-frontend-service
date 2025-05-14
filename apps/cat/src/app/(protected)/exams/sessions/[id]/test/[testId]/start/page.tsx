import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import { match } from "ts-pattern";
import { Card, Typography, Button, message } from "antd";
import { PageHeadList } from "@/shared/components/ui/page-head-list";

const { Title, Text } = Typography;

export const Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useGetDetailSession(params.id ?? "");
  const session = data?.data;

  const selectedTest = session?.tests?.find((t) => t.test.id === params.testId);

  const [now, setNow] = useState(dayjs());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const ujianStartTime = dayjs(selectedTest?.start_date);
  const ujianEndTime = dayjs(selectedTest?.end_date);

  const isStarted = now.isAfter(ujianStartTime);
  const isExpired = now.isAfter(ujianEndTime);
  const remaining = ujianStartTime.diff(now, "second");

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = async () => {
    if (!isStarted || isExpired) return;
    if (wrapperRef.current?.requestFullscreen) {
      await wrapperRef.current.requestFullscreen();
    }
    navigate(`/exams/sessions/${params.id}/test/${params.testId}/ongoing`);
  };

  const handleFullscreenChange = () => {
    const isFull = !!document.fullscreenElement;
    setIsFullscreen(isFull);
    if (!isFull && isStarted && !isExpired) {
      message.success("Ujian dianggap selesai karena keluar dari fullscreen");
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [isStarted, isExpired]);

  if (!selectedTest) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Test tidak ditemukan
      </div>
    );
  }

  const content = match({ isExpired, isStarted })
    .with({ isExpired: true }, () => (
      <Text type="danger" strong>
        Ujian sudah berakhir
      </Text>
    ))
    .with({ isExpired: false, isStarted: true }, () => (
      <Button type="primary" onClick={handleStart}>
        Mulai Sekarang
      </Button>
    ))
    .otherwise(() => (
      <Text type="secondary">
        Ujian dapat dimulai dalam:{" "}
        <Text strong>
          {Math.floor(remaining / 60)}:{(remaining % 60).toString().padStart(2, "0")}
        </Text>
      </Text>
    ));

  return (
    <>
      <PageHeadList title={selectedTest?.test.name} />
      <div ref={wrapperRef} className="flex items-center justify-center h-auto">
        <Card className="w-full max-w-md text-center p-6 space-y-6">
          <div className="mb-6">
            <Title level={4}>Ujian Akan Dimulai</Title>
            {content}
          </div>
          <div className="text-left bg-gray-100 rounded-md p-4">
            <Title level={5}>Aturan Ujian</Title>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Dilarang keluar dari fullscreen selama ujian berlangsung</li>
              <li>Dilarang me-refresh halaman</li>
              <li>Dilarang membuka tab atau window lain</li>
              <li>Keluar dari fullscreen akan dianggap mengakhiri ujian</li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Component;
