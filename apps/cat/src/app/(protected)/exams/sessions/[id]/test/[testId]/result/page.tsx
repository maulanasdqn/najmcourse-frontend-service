import { Button, Card, Descriptions, Result, Spin, Tag, Typography, Divider, Alert } from "antd";
import { Link, useParams, generatePath } from "react-router";
import { useGetDetailByTestAndUserIdAnswer } from "@/shared/hooks/answers/use-get-detail-by-test-and-user-id-answer";
import { FC, ReactElement, useMemo } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { useSession } from "@/shared/components/providers";
import { ROUTES } from "@/shared/commons/constants/routes";
import parse from "html-react-parser";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useGetDetailTest } from "@/shared/hooks/tests/use-get-detail-test";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";

const { Title, Text } = Typography;

export const Component: FC = (): ReactElement => {
  const { session: userData } = useSession();
  const params = useParams<{ id: string; testId: string }>();
  const { data: answerData, isLoading: isLoadingAnswer } = useGetDetailByTestAndUserIdAnswer({
    testId: params.testId ?? "",
    userId: userData?.user?.id ?? "",
  });
  const { data: dataTest } = useGetDetailTest(params.testId);
  const { data: dataSession } = useGetDetailSession(params.id);

  const answerResult = answerData?.data;
  const questions = answerResult?.questions ?? [];

  const { score, correctAnswersCount, totalQuestions } = useMemo(() => {
    if (!questions || questions.length === 0) {
      return {
        score: answerResult?.score ?? 0,
        correctAnswersCount: 0,
        totalQuestions: 0,
      };
    }

    let correctCount = 0;
    questions.forEach((q) => {
      const userSelectedOption = q.options.find((opt) => opt.is_user_selected);
      const correctOption = q.options.find((opt) => opt.is_correct);

      if (userSelectedOption && correctOption && userSelectedOption.id === correctOption.id) {
        correctCount++;
      }
    });

    const total = questions.length;
    return {
      score: answerResult?.score ?? (total > 0 ? Math.round((correctCount / total) * 100) : 0),
      correctAnswersCount: correctCount,
      totalQuestions: total,
    };
  }, [questions, answerResult?.score]);

  if (isLoadingAnswer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!answerResult) {
    return (
      <Result
        status="warning"
        title="Data Ujian Tidak Ditemukan"
        subTitle="Maaf, kami tidak dapat menemukan detail untuk ujian ini."
        extra={
          <Link to={ROUTES.exams.sessions.list}>
            <Button type="primary">Kembali ke Daftar Sesi</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeadDetail title={`Hasil Ujian: ${dataTest?.data?.name}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <Card className="shadow-sm md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <img
              src={
                userData?.user?.avatar ??
                "https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
            />
            <Title level={4} className="mb-1">
              {userData?.user?.fullname}
            </Title>
            <Text type="secondary">
              {userData?.user?.student_type} - {dataSession?.data?.category}
            </Text>
          </div>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <Title level={3} className="mb-8 text-left text-blue-600">
            Ringkasan Hasil Ujian
          </Title>
          <Descriptions
            bordered
            layout="horizontal"
            column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
          >
            <Descriptions.Item label="Nama Ujian" span={2}>
              {dataTest?.data?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Kategori Ujian" span={2}>
              {dataSession?.data?.category}
            </Descriptions.Item>
            <Descriptions.Item label="Total Soal">{totalQuestions}</Descriptions.Item>
            <Descriptions.Item label="Jawaban Benar">
              <Text strong className="text-green-600">
                {correctAnswersCount}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Nilai Ujian" span={2}>
              <Tag
                color={score >= 70 ? "success" : score >= 50 ? "warning" : "error"}
                className="text-2xl px-4 py-1"
              >
                {score}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
          <div className="mt-8 text-center">
            <Link to={generatePath(ROUTES.exams.sessions.detail, { id: params.id ?? "" })}>
              <Button type="primary" size="large">
                Kembali ke Detail Sesi
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {questions && questions.length > 0 && (
        <Card className="w-full shadow-lg mt-6">
          <Title level={3} className="text-blue-600 mb-6">
            Pembahasan Soal
          </Title>
          <div className="space-y-8">
            {questions.map((q, index) => {
              const userSelectedOption = q.options.find((opt) => opt.is_user_selected);
              const correctOption = q.options.find((opt) => opt.is_correct);
              const isAnswerCorrect =
                userSelectedOption && correctOption && userSelectedOption.id === correctOption.id;

              return (
                <div
                  key={q.id}
                  className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
                >
                  <div className="mb-4">
                    <Text strong className="text-base">
                      Pertanyaan {index + 1}:
                    </Text>
                    <div className="prose max-w-none mt-1">{parse(q.question)}</div>
                    {q.question_image_url && (
                      <img
                        src={q.question_image_url}
                        alt="Gambar Pertanyaan"
                        className="mt-2 rounded max-w-md max-h-80 object-contain"
                      />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <Text strong>Pilihan Jawaban:</Text>
                    {q.options.map((opt) => {
                      const isUserSelected = opt.is_user_selected;
                      const isCorrect = opt.is_correct;
                      let optionStyle = "p-2 border rounded flex items-center justify-between";
                      let icon = null;

                      if (isCorrect) {
                        optionStyle += " bg-green-50 border-green-300 text-green-700";
                        icon = <CheckCircleFilled className="text-green-500" />;
                      } else if (isUserSelected && !isCorrect) {
                        optionStyle += " bg-red-50 border-red-300 text-red-700";
                        icon = <CloseCircleFilled className="text-red-500" />;
                      } else {
                        optionStyle += " bg-gray-50 border-gray-200";
                      }

                      return (
                        <div key={opt.id} className={optionStyle}>
                          <span>{opt.label}</span>
                          {icon}
                        </div>
                      );
                    })}
                  </div>

                  {userSelectedOption && (
                    <Alert
                      message={isAnswerCorrect ? "Jawaban Anda Benar" : "Jawaban Anda Salah"}
                      type={isAnswerCorrect ? "success" : "error"}
                      showIcon
                      className="mb-4"
                    />
                  )}
                  {!userSelectedOption && (
                    <Alert
                      message="Anda tidak menjawab pertanyaan ini."
                      type="warning"
                      showIcon
                      className="mb-4"
                    />
                  )}

                  <Divider orientation="left" className="text-sm">
                    Pembahasan
                  </Divider>
                  <div className="prose max-w-none bg-blue-50 p-3 rounded">
                    {q.discussion ? (
                      parse(q.discussion)
                    ) : (
                      <Text type="secondary">Pembahasan tidak tersedia.</Text>
                    )}
                    {q.discussion_image_url && (
                      <img
                        src={q.discussion_image_url}
                        alt="Gambar Pembahasan"
                        className="mt-2 rounded max-w-md max-h-80 object-contain"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Component;
