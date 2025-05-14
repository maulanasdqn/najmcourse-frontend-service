import { Card, Button, Typography, Radio, Tag } from "antd";
import parse from "html-react-parser";
import { FC, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import dayjs from "dayjs";
import { useAnswerStore } from "@/shared/libs/zustand/answer";
import { useSession } from "@/shared/components/providers";
import { match } from "ts-pattern";

const { Title, Text } = Typography;

export const Component: FC = (): ReactElement => {
  const params = useParams();
  const { data } = useGetDetailSession(params.id ?? "");
  const { session: userData } = useSession();
  const session = data?.data;

  const selectedTest = session?.tests?.find((t) => t.test.id === params.testId);
  const questions = selectedTest?.test?.questions ?? [];

  const [current, setCurrent] = useState(0);
  const [marked, setMarked] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState("00:00");

  const currentQuestion = questions[current];

  const { setMeta, setAnswer, clearAnswer, answers, getPayload } = useAnswerStore();

  console.log("Answers:", answers);

  useEffect(() => {
    if (!selectedTest?.start_date || !selectedTest?.end_date) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const end = dayjs(selectedTest.end_date);
      const diff = end.diff(now, "second");

      if (diff <= 0) {
        setTimeLeft("00:00");
        clearInterval(interval);
        return;
      }

      const m = Math.floor(diff / 60);
      const s = diff % 60;
      setTimeLeft(`${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTest]);

  useEffect(() => {
    if (!selectedTest || !session?.id || !userData?.user?.id) return;
    useAnswerStore.getState().setMeta({
      session_id: session.id,
      test_id: selectedTest.test.id,
      user_id: userData.user.id,
    });
  }, [selectedTest?.test.id, session?.id, userData?.user?.id]);

  const handleAnswer = (value: string) => {
    setAnswer({
      question_id: currentQuestion.id,
      option_id: value,
    });
  };

  const handleClear = () => {
    clearAnswer(currentQuestion.id);
  };

  const handleMark = () => {
    if (!marked.includes(currentQuestion.id)) {
      setMarked([...marked, currentQuestion.id]);
    }
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
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
    const payload = getPayload();
    console.log("Submit Payload:", payload);
  };

  if (!selectedTest || questions.length === 0) {
    return <div className="text-center py-12 text-gray-500">Soal tidak tersedia</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-6 min-h-screen">
      <div>
        <Card className="shadow-sm">
          <Title level={5} className="mb-4">
            {selectedTest.test.name} - Question No. {current + 1}
          </Title>
          <div className="mb-4">{parse(currentQuestion.question)}</div>

          <Radio.Group
            onChange={(e) => handleAnswer(e.target.value)}
            value={getSelectedOption(currentQuestion.id)}
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
            <Button onClick={handleMark}>Mark for Review & Next</Button>
            <Button danger onClick={handleClear}>
              Clear Response
            </Button>
            <Button type="primary" onClick={handleSaveNext}>
              Save & Next
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-y-4">
        <Card title="Time Left" className="text-center shadow-sm">
          <Text strong className="text-2xl">
            {timeLeft}
          </Text>
        </Card>
        <Card title="Question Palette" className="shadow-sm">
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
                >
                  {idx + 1}
                </Button>
              );
            })}
          </div>
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <div>
              <Tag color="green" /> Answered
            </div>
            <div>
              <Tag color="red" /> Not Answered
            </div>
            <div>
              <Tag color="purple" /> Marked for Review
            </div>
          </div>
        </Card>
        <Button block type="primary" danger onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Component;
