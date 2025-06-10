import { Card, Button, Typography, Radio, Tag, Modal, Select } from "antd";
import parse from "html-react-parser";
import { FC, ReactElement, useEffect, useState, useCallback, useRef } from "react";
import { generatePath, useNavigate, useParams } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import dayjs from "dayjs";
import { useAnswerStore } from "@/shared/libs/zustand/answer";
import { useSession } from "@/shared/components/providers";
import { match } from "ts-pattern";
import { usePostCreateAkademikAnswer } from "@/shared/hooks/answers/use-post-create-akademik-answer";
import { usePostCreatePsikologiAnswer } from "@/shared/hooks/answers/use-post-create-psikologi-answer";
import { ROUTES } from "@/shared/commons/constants/routes";

const { Title, Text } = Typography;

export const Component: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { mutate: mutateAkademik } = usePostCreateAkademikAnswer();
  const { mutate: mutatePsikologi } = usePostCreatePsikologiAnswer();
  const params = useParams();
  const { data } = useGetDetailSession(params.id ?? "");
  const { session: userData } = useSession();
  const session = data?.data;

  const selectedTest = session?.tests?.find((t) => t.test.id === params.testId);
  const isPsikologi = session?.category === "Psikologi";
  const subTests = selectedTest?.test?.sub_tests ?? [];

  const [selectedSubTestId, setSelectedSubTestId] = useState<string>("");
  const [showSubTestSelection, setShowSubTestSelection] = useState(
    isPsikologi && subTests.length > 0,
  );

  const currentSubTest = subTests.find((st) => st.id === selectedSubTestId);
  const questions =
    isPsikologi && currentSubTest
      ? currentSubTest.questions
      : (selectedTest?.test?.questions ?? []);

  const [current, setCurrent] = useState(0);
  const [marked, setMarked] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState("00:00:00");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenModal, setShowFullscreenModal] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[current];
  const hasSubmittedRef = useRef(false);

  const { setAnswer, answers, getPayload } = useAnswerStore();

  const autoSubmit = useCallback(() => {
    if (hasSubmittedRef.current || isSubmitting) return;

    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    const payload = getPayload();
    console.log("Auto Submit Payload:", payload);

    const mutateFunction = isPsikologi ? mutatePsikologi : mutateAkademik;

    mutateFunction(payload, {
      onSuccess: () => {
        navigate(
          generatePath(ROUTES.exams.sessions.test.result, {
            id: params.id ?? "",
            testId: params.testId,
          }),
        );
      },
      onError: (err) => {
        console.log("Auto Submit Error", err);
        hasSubmittedRef.current = false;
        setIsSubmitting(false);
      },
    });
  }, [
    getPayload,
    mutateAkademik,
    mutatePsikologi,
    isPsikologi,
    navigate,
    params.id,
    params.testId,
    isSubmitting,
  ]);

  const enterFullscreen = useCallback(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }, []);

  const checkFullscreen = useCallback(() => {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  }, []);

  const handleFullscreenChange = useCallback(() => {
    const isCurrentlyFullscreen = checkFullscreen();
    setIsFullscreen(isCurrentlyFullscreen);

    if (!isCurrentlyFullscreen && !showFullscreenModal && !hasSubmittedRef.current) {
      Modal.warning({
        title: "Keluar dari Mode Fullscreen",
        content: "Anda telah keluar dari mode fullscreen. Jawaban akan otomatis dikirim.",
        onOk: () => {
          autoSubmit();
        },
        okText: "OK",
        centered: true,
      });
    }
  }, [checkFullscreen, showFullscreenModal, autoSubmit]);

  useEffect(() => {
    if (!selectedTest?.start_date || !selectedTest?.end_date) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const end = dayjs(selectedTest.end_date);
      const diff = end.diff(now, "second");

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        if (!hasSubmittedRef.current) {
          Modal.warning({
            title: "Waktu Habis",
            content: "Waktu ujian telah habis. Jawaban akan otomatis dikirim.",
            onOk: () => {
              autoSubmit();
            },
            okText: "OK",
            centered: true,
          });
        }
        return;
      }
      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeLeft(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTest, autoSubmit]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "s") ||
        e.key === "F5" ||
        (e.ctrlKey && e.key === "r")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (!selectedTest || !session?.id || !userData?.user?.id) return;
    useAnswerStore.getState().setMeta({
      session_id: session.id,
      test_id: selectedTest.test.id,
      user_id: userData.user.id,
      sub_test_id: selectedSubTestId,
    });
  }, [selectedTest, selectedTest?.test.id, session?.id, userData?.user?.id, selectedSubTestId]);

  const handleAnswer = (value: string) => {
    setAnswer({
      question_id: currentQuestion.id,
      option_id: value,
    });
  };

  const handleSaveNext = () => {
    setMarked(marked.filter((id) => id !== currentQuestion.id));
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const getStatus = (id: string) => {
    const answered = answers.find((a) => a.question_id === id);
    if (answered) return "answered";
    if (marked.includes(id)) return "marked";
    return "not-answered";
  };

  const getSelectedOption = (questionId: string) =>
    answers.find((a) => a.question_id === questionId)?.option_id;

  const handleSubmit = () => {
    if (hasSubmittedRef.current || isSubmitting) return;

    Modal.confirm({
      title: "Konfirmasi Submit",
      content: "Apakah Anda yakin ingin mengirim jawaban? Tindakan ini tidak dapat dibatalkan.",
      onOk: () => {
        hasSubmittedRef.current = true;
        setIsSubmitting(true);

        const payload = getPayload();
        console.log("Manual Submit Payload:", payload);

        const mutateFunction = isPsikologi ? mutatePsikologi : mutateAkademik;

        mutateFunction(payload, {
          onSuccess: () => {
            exitFullscreen();
            navigate(
              generatePath(ROUTES.exams.sessions.test.result, {
                id: params.id ?? "",
                testId: params.testId,
              }),
            );
          },
          onError: (err) => {
            exitFullscreen();
            console.log("Manual Submit Error", err);
            hasSubmittedRef.current = false;
            setIsSubmitting(false);
          },
        });
      },
      okText: "Ya, Kirim",
      cancelText: "Batal",
      centered: true,
    });
  };

  const handleStartExam = () => {
    enterFullscreen();
    setShowFullscreenModal(false);
  };

  const handleSubTestSelect = (subTestId: string) => {
    setSelectedSubTestId(subTestId);
    setShowSubTestSelection(false);
    setCurrent(0); // Reset to first question
    useAnswerStore.getState().reset(); // Clear previous answers
  };

  const areAllQuestionsAnswered = answers.length === questions.length;

  if (!selectedTest) {
    return <div className="text-center py-12 text-gray-500">Test tidak tersedia</div>;
  }

  if (showSubTestSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-sm">
          <div className="text-center">
            <Title level={3}>Pilih Sub-Test</Title>
            <Text className="block mb-4">
              Silakan pilih sub-test yang ingin Anda kerjakan untuk kategori Psikologi.
            </Text>
            <div className="space-y-3">
              {subTests.map((subTest) => (
                <Card
                  key={subTest.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSubTestSelect(subTest.id)}
                >
                  <div className="text-left">
                    <Title level={5} className="mb-2">
                      {subTest.name}
                    </Title>
                    <Text className="text-gray-600">{subTest.description}</Text>
                    <div className="mt-2">
                      <Tag color="blue">{subTest.questions.length} Soal</Tag>
                      <Tag color="green">{subTest.category}</Tag>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center py-12 text-gray-500">Soal tidak tersedia</div>;
  }

  if (showFullscreenModal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 shadow-sm">
          <div className="text-center">
            <Title level={3}>Mode Ujian Fullscreen</Title>
            <Text className="block mb-4">
              Ujian akan dimulai dalam mode fullscreen. Jika Anda keluar dari mode fullscreen atau
              waktu habis, jawaban akan otomatis dikirim.
            </Text>
            <div className="space-y-2 text-left mb-6">
              <Text strong>Peraturan:</Text>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Tetap dalam mode fullscreen selama ujian</li>
                <li>Jangan menekan F12 atau membuka developer tools</li>
                <li>Jangan refresh halaman</li>
                <li>Jawaban akan otomatis dikirim jika melanggar aturan</li>
              </ul>
            </div>
            <Button type="primary" size="large" onClick={handleStartExam} block>
              Mulai Ujian
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 p-6 min-h-screen">
        <div className="flex flex-col gap-y-4">
          <Card className="shadow-sm">
            <div className="flex w-full justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-bold text-xl uppercase">{userData?.user?.fullname}</h1>
                <span>
                  {userData?.user?.student_type} - {session?.category}
                </span>
                {isPsikologi && currentSubTest && (
                  <span className="text-sm text-blue-600 font-medium">
                    Sub-Test: {currentSubTest.name}
                  </span>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-2 h-2 rounded-full ${isFullscreen ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <Text className={`text-xs ${isFullscreen ? "text-green-600" : "text-red-600"}`}>
                    {isFullscreen ? "Mode Fullscreen Aktif" : "Mode Fullscreen Tidak Aktif"}
                  </Text>
                </div>
              </div>
              <img
                src={
                  userData?.user?.avatar ??
                  "https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg"
                }
                alt="avatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
          </Card>
          <Card className="shadow-sm">
            <Title level={5} className="mb-4 font-bold">
              Pertanyaan No. {current + 1}
            </Title>
            <div className="mb-4">{parse(currentQuestion.question)}</div>

            {currentQuestion.question_image_url && (
              <img
                src={currentQuestion.question_image_url}
                alt="Gambar Pertanyaan"
                className="mt-2 rounded max-w-md max-h-80 object-contain"
              />
            )}

            <Radio.Group
              onChange={(e) => handleAnswer(e.target.value)}
              value={getSelectedOption(currentQuestion.id)}
              disabled={isSubmitting}
            >
              <div className="flex flex-col gap-2">
                {currentQuestion.options.map((opt) => (
                  <Radio key={opt.id} value={opt.id}>
                    {opt.label}
                  </Radio>
                ))}
              </div>
            </Radio.Group>

            <div className="flex justify-between mt-6 flex-wrap gap-2">
              <Button type="primary" onClick={handleSaveNext} disabled={isSubmitting}>
                Selanjutnya
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-y-4">
          <Card title="Waktu Tersisa" className="text-center shadow-sm">
            <Text strong className={`text-2xl ${timeLeft === "00:00:00" ? "text-red-500" : ""}`}>
              {timeLeft}
            </Text>
          </Card>
          <Card title="Daftar Pertanyaan" className="shadow-sm">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const status = getStatus(q.id);
                const color = match(status)
                  .with("answered", () => "green")
                  .with("marked", () => "purple")
                  .otherwise(() => "red");
                return (
                  <Button
                    key={q.id}
                    size="small"
                    className="text-white"
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrent(idx)}
                    disabled={isSubmitting}
                  >
                    {idx + 1}
                  </Button>
                );
              })}
            </div>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div>
                <Tag color="green" /> Terjawab
              </div>
              <div>
                <Tag color="red" /> Belum Dijawab
              </div>
            </div>
          </Card>
          <Button
            block
            type="primary"
            onClick={handleSubmit}
            disabled={!areAllQuestionsAnswered || isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Selesai"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Component;
