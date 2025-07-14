/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from "html-react-parser";
import {
  Button,
  Card,
  Descriptions,
  Result,
  Spin,
  Tag,
  Typography,
  Divider,
  Alert,
  Collapse,
} from "antd";
import { Link, useParams, generatePath } from "react-router";
import { useGetDetailByTestAndUserIdAnswer } from "@/shared/hooks/answers/use-get-detail-by-test-and-user-id-answer";
import { useGetAllSubTestResults } from "@/shared/hooks/answers/use-get-all-subtest-results";
import { FC, ReactElement, useMemo } from "react";
import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { useSession } from "@/shared/components/providers";
import { ROUTES } from "@/shared/commons/constants/routes";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useGetDetailTest } from "@/shared/hooks/tests/use-get-detail-test";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";

const { Title, Text } = Typography;

export const Component: FC = (): ReactElement => {
  const { session: userData } = useSession();
  const params = useParams<{ id: string; testId: string }>();
  const { data: dataTest, isLoading: isLoadingTest } = useGetDetailTest(params.testId);
  const {
    data: dataSession,
    isLoading: isLoadingSession,
    error: sessionError,
  } = useGetDetailSession(params.id);

  const isPsikologi = dataSession?.data?.category === "Psikologi";
  const subTests = useMemo(() => dataTest?.data?.sub_tests ?? [], [dataTest?.data?.sub_tests]);
  const hasSubTests = isPsikologi && subTests.length > 0;

  const subTestResults = useGetAllSubTestResults({
    testId: params.testId ?? "",
    userId: userData?.user?.id ?? "",
    subTestIds: hasSubTests ? subTests.map((st) => st.id) : [],
  });

  const { data: answerData, isLoading: isLoadingAnswer } = useGetDetailByTestAndUserIdAnswer({
    testId: params.testId ?? "",
    userId: userData?.user?.id ?? "",
  });

  const isLoading =
    isLoadingSession ||
    isLoadingTest ||
    (hasSubTests ? subTestResults.some((result) => result.isLoading) : isLoadingAnswer);

  const answerResult = hasSubTests ? null : answerData?.data;
  const questions = useMemo(() => answerResult?.questions ?? [], [answerResult?.questions]);

  const getScoreColor = (score: number): string => {
    if (score >= 70) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  const { score, correctAnswersCount, totalQuestions, subTestScores } = useMemo(() => {
    if (hasSubTests) {
      const subScore = subTestResults.reduce((_sum, result) => result.data?.data?.score ?? 0, 0);
      const subScores = subTestResults.map((result, index) => {
        const subTestData = result.data?.data;
        const subTestQuestions = subTestData?.questions ?? [];

        let correctCount = 0;
        subTestQuestions.forEach((q: any) => {
          const userSelectedOption = q.options.find((opt: any) => opt.is_user_selected);
          const correctOption = q.options.find((opt: any) => opt.is_correct);

          if (userSelectedOption && correctOption && userSelectedOption.id === correctOption.id) {
            correctCount++;
          }
        });

        const total = subTestQuestions.length;

        return {
          subTestName: subTests[index]?.name ?? `Sub-Test ${index + 1}`,
          subTestCategory: subTests[index]?.category ?? "",
          passing_grade: subTests[index]?.passing_grade ?? 0,
          score: subScore,
          correctCount,
          totalQuestions: total,
          questions: subTestQuestions,
        };
      });

      const totalCorrect = subScores.reduce((sum, sub) => sum + sub.correctCount, 0);
      const totalQs = subScores.reduce((sum, sub) => sum + sub.totalQuestions, 0);
      const avgScore =
        subScores.length > 0
          ? Math.round(subScores.reduce((sum, sub) => sum + sub.score, 0) / subScores.length)
          : 0;

      return {
        score: avgScore,
        correctAnswersCount: totalCorrect,
        totalQuestions: totalQs,
        subTestScores: subScores,
      };
    } else {
      // Single test calculation
      if (!questions || questions.length === 0) {
        return {
          score: answerResult?.score ?? 0,
          correctAnswersCount: 0,
          totalQuestions: 0,
          subTestScores: [],
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
        subTestScores: [],
      };
    }
  }, [hasSubTests, subTestResults, subTests, questions, answerResult?.score]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (sessionError || !dataSession?.data) {
    return (
      <Result
        status="warning"
        title="Sesi Tidak Ditemukan"
        subTitle="Maaf, kami tidak dapat menemukan sesi ujian ini. Pastikan URL yang Anda akses benar."
        extra={
          <Link to={ROUTES.exams.sessions.list}>
            <Button type="primary">Kembali ke Daftar Sesi</Button>
          </Link>
        }
      />
    );
  }

  if (!dataTest?.data) {
    return (
      <Result
        status="warning"
        title="Test Tidak Ditemukan"
        subTitle="Maaf, kami tidak dapat menemukan detail test ini."
        extra={
          <Link to={ROUTES.exams.sessions.list}>
            <Button type="primary">Kembali ke Daftar Sesi</Button>
          </Link>
        }
      />
    );
  }

  if (!hasSubTests && !answerResult) {
    return (
      <Result
        status="warning"
        title="Data Ujian Tidak Ditemukan"
        subTitle="Maaf, kami tidak dapat menemukan detail untuk ujian ini. Pastikan Anda sudah menyelesaikan ujian."
        extra={
          <Link to={ROUTES.exams.sessions.list}>
            <Button type="primary">Kembali ke Daftar Sesi</Button>
          </Link>
        }
      />
    );
  }

  if (hasSubTests && subTestResults.some((result) => result.error)) {
    return (
      <Result
        status="warning"
        title="Data Ujian Tidak Ditemukan"
        subTitle="Maaf, kami tidak dapat menemukan detail untuk beberapa sub-test. Pastikan Anda sudah menyelesaikan semua sub-test."
        extra={
          <Link to={ROUTES.exams.sessions.list}>
            <Button type="primary">Kembali ke Daftar Sesi</Button>
          </Link>
        }
      />
    );
  }

  const isPassed = subTestScores.some((subTest) => subTest.score >= subTest.passing_grade);

  return (
    <div className="min-h-screen">
      <PageHeadDetail
        backRoute={generatePath(ROUTES.exams.sessions.detail, {
          id: params.id ?? "",
        })}
        title={`Hasil Ujian`}
      />
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
            {dataSession?.data?.category === "Akademik" && (
              <Descriptions.Item label="Jawaban Benar">
                <Text strong className="text-green-600">
                  {correctAnswersCount}
                </Text>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Nilai Ujian" span={2}>
              <Tag color={getScoreColor(score)} className="text-2xl px-4 py-1">
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

      {hasSubTests && subTestScores.length > 0 && (
        <>
          <Card
            style={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
            className="w-full shadow-lg mt-6"
          >
            <div className="flex w-full justify-between mb-6">
              <Title level={3}>Ringkasan Per Sub-Test</Title>
              <div className="">
                <Tag
                  style={{
                    fontSize: "20px",
                    padding: "5px 10px",
                  }}
                  color={isPassed ? "green" : "red"}
                >
                  {isPassed ? "Lulus" : "Tidak Lulus"}
                </Tag>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subTestScores.map((subTest, index) => (
                <Card key={index} className="shadow-sm border">
                  <div className="text-center flex flex-col gap-y-2 items-start justify-center">
                    <Title level={3} className="mb-2">
                      {subTest.subTestName}
                    </Title>
                    <div className="flex gap-x-4 justify-end w-full">
                      <span className="font-semibold">Nilai</span>
                      <Tag color={getScoreColor(subTest.score)} className="text-xl px-3 py-1 mb-2">
                        {subTest.score}
                      </Tag>
                    </div>

                    <div className="flex gap-x-4 w-full justify-end">
                      <span className="font-semibold">Passing Grade</span>
                      <Tag color={"green"} className="text-xl px-3 py-1 mb-2">
                        {subTest.passing_grade}
                      </Tag>
                    </div>
                    <div className="text-sm text-gray-600"></div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="w-full shadow-lg mt-6">
            <Title level={3} className="text-blue-600 mb-6">
              Pembahasan Soal Per Sub-Test
            </Title>
            <Collapse>
              {subTestScores.map((subTest, subTestIndex) => (
                <Collapse.Panel
                  header={
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subTest.subTestName}</span>
                      <Tag color={getScoreColor(subTest.score)}>
                        Nilai: {subTest.score} ({subTest.totalQuestions})
                      </Tag>
                    </div>
                  }
                  key={subTestIndex}
                >
                  <div className="space-y-6">
                    {subTest.questions.map((q: any, questionIndex: number) => {
                      const userSelectedOption = q.options.find((opt: any) => opt.is_user_selected);
                      const correctOption = q.options.find((opt: any) => opt.is_correct);
                      const isAnswerCorrect =
                        userSelectedOption &&
                        correctOption &&
                        userSelectedOption.id === correctOption.id;
                      return (
                        <div
                          key={q.id}
                          className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
                        >
                          <div className="mb-4">
                            <Text strong className="text-base">
                              Pertanyaan {questionIndex + 1}:
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

                          {subTest.subTestCategory === "Psikologi" && (
                            <>
                              <div className="space-y-2 mb-4">
                                <Text strong>Pilihan Jawaban:</Text>
                                {q.options.map((opt: any) => {
                                  let optionStyle =
                                    "p-2 border rounded flex items-center justify-between";

                                  optionStyle += " bg-gray-50 border-gray-200";

                                  return (
                                    <div key={opt.id} className={optionStyle}>
                                      <span>{opt.label}</span>
                                    </div>
                                  );
                                })}
                              </div>

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
                            </>
                          )}

                          {subTest.subTestCategory === "Akademik" && (
                            <>
                              <div className="space-y-2 mb-4">
                                <Text strong>Pilihan Jawaban:</Text>
                                {q.options.map((opt: any) => {
                                  const isUserSelected = opt.is_user_selected;
                                  const isCorrect = opt.is_correct;
                                  let optionStyle =
                                    "p-2 border rounded flex items-center justify-between";
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
                                  message={
                                    isAnswerCorrect ? "Jawaban Anda Benar" : "Jawaban Anda Salah"
                                  }
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
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </Card>
        </>
      )}

      {!hasSubTests && questions && questions.length > 0 && (
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
