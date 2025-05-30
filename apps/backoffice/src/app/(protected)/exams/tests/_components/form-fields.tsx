import { ControlledInput } from "@/shared/components/ui/controlled-input";
import { ControlledUploadFile } from "@/shared/components/ui/controlled-upload-file";
import { ControlledWysiwyg } from "@/shared/components/ui/controlled-wysiwyg/wysiwyg";
import { ControlledSwitch } from "@/shared/components/ui/controlled-switch/switch";
import {
  DeleteOutlined,
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Input, Card, Space, Typography, Radio, Divider } from "antd";
import { useFormTest } from "../_hooks/use-form-test";
import { TFormFieldsProps } from "@/shared/commons/types/form-field";
import { FC, ReactElement, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { v4 } from "uuid";

const { TextArea } = Input;
const { Text, Title } = Typography;

export const FormFields: FC<TFormFieldsProps> = (props): ReactElement => {
  const { form, fields, handler } = useFormTest();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pastedQuestions, setPastedQuestions] = useState("");
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const parseAndAddQuestions = () => {
    if (!pastedQuestions.trim()) return;

    const escapeAndFormatText = (text: string): string => {
      if (!text) return "<p><br></p>";
      const escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      const paragraphs = escaped.split("\n").filter((line: string) => line.trim());
      if (paragraphs.length === 0) return "<p><br></p>";
      if (paragraphs.length === 1) return `<p>${paragraphs[0]}</p>`;
      return paragraphs.map((p: string) => `<p>${p}</p>`).join("");
    };

    const questionMatches = pastedQuestions.match(/\d+\.\s+[\s\S]*?(?=\n\s*\d+\.\s+|$)/g);

    if (!questionMatches) return;

    questionMatches.forEach((questionBlock) => {
      if (!questionBlock.trim()) return;

      const cleanedBlock = questionBlock.replace(/^\d+\.\s+/, "").trim();
      const parts = cleanedBlock.split(/\nPembahasan\s*\n/);
      const questionPart = parts[0].trim();
      const discussionPart = parts[1] ? parts[1].trim() : "";

      const optionMatch = questionPart.match(/^([\s\S]*?)\n\s*[A-E]\./s);
      const questionText = optionMatch ? optionMatch[1].trim() : questionPart;

      const optionLines = questionPart
        .split("\n")
        .filter((line) => line.trim().match(/^[A-E]\.\s+/));

      const options = optionLines.map((line) => {
        const cleanedLine = line.trim().replace(/^[A-E]\.\s*/, "");
        return {
          id: v4(),
          label: cleanedLine,
          image_url: "",
          is_correct: false,
          points: "0",
        };
      });

      fields.append({
        id: v4(),
        question: escapeAndFormatText(questionText),
        question_image_url: "",
        discussion: escapeAndFormatText(discussionPart),
        discussion_image_url: "",
        options: options,
      });
    });

    setIsModalVisible(false);
    setPastedQuestions("");
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestionIndex(index);
  };

  const handleSaveQuestion = () => {
    setEditingQuestionIndex(null);
  };

  const handleDeleteQuestion = (index: number) => {
    handler.onRemoveQuestion(index);
  };

  const handleDuplicateQuestion = (index: number) => {
    const questionToDuplicate = fields.fields[index];
    fields.append({
      ...questionToDuplicate,
      id: v4(),
      options: questionToDuplicate.options.map((opt) => ({
        ...opt,
        id: v4(),
      })),
    });
  };

  const handleAddOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];

    const newOption = {
      id: v4(),
      label: "",
      image_url: "",
      is_correct: false,
      points: "0",
    };

    const updatedOptions = [...currentOptions, newOption];
    form.setValue(`questions.${questionIndex}.options`, updatedOptions, {
      shouldDirty: true,
      shouldValidate: true,
    });

    form.trigger(`questions.${questionIndex}.options`);
  };

  const getOptionLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  const OptionsEditComponent: FC<{ questionIndex: number }> = ({ questionIndex }) => {
    const optionsFieldArray = useFieldArray({
      control: form.control,
      name: `questions.${questionIndex}.options`,
    });

    const addOption = () => {
      optionsFieldArray.append({
        id: v4(),
        label: "",
        image_url: "",
        is_correct: false,
        points: "0",
      });
    };

    const removeOption = (optionIndex: number) => {
      optionsFieldArray.remove(optionIndex);
    };

    const setCorrect = (optionIndex: number) => {
      const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
      const updated = currentOptions.map((opt, idx) => ({
        ...opt,
        is_correct: idx === optionIndex,
      }));
      form.setValue(`questions.${questionIndex}.options`, updated, {
        shouldDirty: true,
        shouldValidate: true,
      });
    };

    return (
      <div className="flex flex-col gap-y-3">
        {optionsFieldArray.fields.map((option, optionIndex) => (
          <div key={option.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <Text strong>Opsi {getOptionLabel(optionIndex)}</Text>
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeOption(optionIndex)}
              >
                Hapus
              </Button>
            </div>

            <ControlledInput
              label="Teks Pilihan"
              control={form.control}
              name={`questions.${questionIndex}.options.${optionIndex}.label`}
              placeholder="Masukkan teks pilihan jawaban"
            />

            <ControlledUploadFile
              label="Gambar Pilihan (Opsional)"
              control={form.control}
              name={`questions.${questionIndex}.options.${optionIndex}.image_url`}
            />

            <div className="flex items-center justify-between">
              <ControlledSwitch
                label="Jawaban Benar"
                control={form.control}
                name={`questions.${questionIndex}.options.${optionIndex}.is_correct`}
                onChange={() => setCorrect(optionIndex)}
              />

              <ControlledInput
                label="Poin (Khusus Psikologi)"
                control={form.control}
                name={`questions.${questionIndex}.options.${optionIndex}.points`}
                placeholder="0"
                style={{ width: 100 }}
              />
            </div>
          </div>
        ))}

        <Button type="dashed" icon={<PlusOutlined />} onClick={addOption} className="w-full">
          Tambah Pilihan Jawaban
        </Button>
      </div>
    );
  };

  return (
    <Form name="test_form" onFinish={props.onSubmit} layout="vertical">
      <div className="max-w-4xl mx-auto">
        <Card
          style={{
            marginBottom: "1rem",
          }}
        >
          <ControlledInput
            required
            label="Nama Test"
            control={form.control}
            placeholder="Masukkan nama test"
            name="name"
          />
        </Card>

        <div className="flex flex-col gap-y-4">
          {fields.fields.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-gray-500">
                <Title level={4} className="text-gray-400">
                  Belum ada soal yang dibuat
                </Title>
                <p className="mb-6">
                  Mulai dengan menambahkan soal pertama atau paste beberapa soal sekaligus
                </p>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                      handler.onAddQuestion();
                      handleEditQuestion(0);
                    }}
                  >
                    Tambah Soal Pertama
                  </Button>
                  <Button
                    icon={<CopyOutlined />}
                    size="large"
                    onClick={() => setIsModalVisible(true)}
                  >
                    Paste Soal
                  </Button>
                </Space>
              </div>
            </Card>
          ) : (
            fields.fields.map((field, index) => (
              <Card key={field.id} className="relative">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <Text strong className="text-lg">
                      Soal {index + 1}
                    </Text>
                    {editingQuestionIndex === index && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        Sedang diedit
                      </span>
                    )}
                  </div>
                  <Space>
                    {editingQuestionIndex === index ? (
                      <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveQuestion}>
                        Selesai
                      </Button>
                    ) : (
                      <Button icon={<EditOutlined />} onClick={() => handleEditQuestion(index)}>
                        Edit
                      </Button>
                    )}
                    <Button icon={<CopyOutlined />} onClick={() => handleDuplicateQuestion(index)}>
                      Duplikasi
                    </Button>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      Hapus
                    </Button>
                  </Space>
                </div>

                {editingQuestionIndex === index ? (
                  <div className="space-y-4">
                    <ControlledWysiwyg
                      label="Pertanyaan"
                      control={form.control}
                      name={`questions.${index}.question`}
                      placeholder="Masukkan teks pertanyaan"
                    />

                    <ControlledUploadFile
                      label="Gambar Pertanyaan (Opsional)"
                      control={form.control}
                      name={`questions.${index}.question_image_url`}
                    />

                    <Divider>Pilihan Jawaban</Divider>

                    <OptionsEditComponent questionIndex={index} />

                    <Divider>Pembahasan</Divider>

                    <ControlledWysiwyg
                      label="Pembahasan (Opsional)"
                      control={form.control}
                      name={`questions.${index}.discussion`}
                      placeholder="Masukkan pembahasan soal"
                    />

                    <ControlledUploadFile
                      label="Gambar Pembahasan (Opsional)"
                      control={form.control}
                      name={`questions.${index}.discussion_image_url`}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div
                        className="text-base leading-relaxed text-gray-800 mb-3"
                        dangerouslySetInnerHTML={{ __html: field.question ?? "" }}
                      />
                      {field.question_image_url && (
                        <img
                          src={field.question_image_url}
                          alt="Question"
                          className="max-w-full h-auto rounded border"
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-y-2">
                      <Radio.Group
                        className="w-full"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        {(form.getValues(`questions.${index}.options`) || field.options || []).map(
                          (option, optionIndex) => (
                            <div
                              key={option.id ?? optionIndex}
                              className={`flex items-center p-3 rounded-lg border transition-colors ${
                                option.is_correct
                                  ? "border-green-300 bg-green-50"
                                  : "border-gray-200 bg-white"
                              }`}
                            >
                              <Radio disabled value={option.id} className="mr-3">
                                <span className="font-medium text-gray-700 mr-2">
                                  {getOptionLabel(optionIndex)}.
                                </span>
                                <span className="text-gray-800">{option.label}</span>
                              </Radio>
                              {option.is_correct && (
                                <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                  Jawaban Benar
                                </span>
                              )}
                            </div>
                          ),
                        )}
                      </Radio.Group>

                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          handleAddOption(index);
                          handleEditQuestion(index);
                        }}
                        className="w-full mt-3"
                        size="small"
                      >
                        Tambah Pilihan Jawaban
                      </Button>
                    </div>

                    {field.discussion && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Text strong className="text-gray-700 block mb-2">
                          Pembahasan:
                        </Text>
                        <div
                          className="text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: field.discussion }}
                        />
                        {field.discussion_image_url && (
                          <img
                            src={field.discussion_image_url}
                            alt="Discussion"
                            className="mt-3 max-w-full h-auto rounded border"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))
          )}

          {fields.fields.length > 0 && (
            <div className="flex gap-3 justify-center pt-4">
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                  handler.onAddQuestion();
                  handleEditQuestion(fields.fields.length);
                }}
              >
                Tambah Soal Baru
              </Button>
              <Button
                type="dashed"
                icon={<CopyOutlined />}
                size="large"
                onClick={() => setIsModalVisible(true)}
              >
                Paste Soal
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!form.formState.isValid || !form.formState.isDirty || props.isLoading}
            loading={props.isLoading}
            size="large"
            className="px-8"
          >
            Simpan Test
          </Button>
        </div>
      </div>

      <Modal
        title="Paste Soal Sekaligus"
        open={isModalVisible}
        onOk={parseAndAddQuestions}
        onCancel={() => {
          setIsModalVisible(false);
          setPastedQuestions("");
        }}
        okText="Tambahkan Soal"
        cancelText="Batal"
        width={800}
      >
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">Format yang didukung:</p>
          <div className="p-3 bg-gray-100 rounded text-xs font-mono max-h-40 overflow-y-auto">
            1. Yang meliputi bidang PU (openbare werken) di Indonesia pada zaman Belanda adalah
            sebagai berikut, kecuali ...
            <br />
            A. Lands Gebouwen
            <br />
            B. Wegen
            <br />
            C. lrrigatie & Assainering
            <br />
            D. Water Kracht
            <br />
            E. Afdelingen
            <br />
            Pembahasan
            <br />
            Penjelasan jawaban yang benar
            <br />
            <br />
            2. Yang dimaksud 'jalan' sesuai Undang-Undang No. 38 Tahun 2004 adalah ...
            <br />
            A. Ruang sepanjangjalan yang dibatasi oleh lebar, tinggi, dan kedalaman ruang bebas
            tertentu
            <br />
            B. Ruang sepanjang jalan yang dibatasi oleh lebar dan tinggi tertentu
            <br />
            Pembahasan
            <br />
            Penjelasan jawaban yang benar
          </div>
        </div>
        <TextArea
          rows={12}
          value={pastedQuestions}
          onChange={(e) => setPastedQuestions(e.target.value)}
          placeholder="Paste soal-soal Anda di sini..."
        />
        <p className="mt-2 text-xs text-gray-500">
          Catatan: Soal-soal ini akan ditambahkan ke daftar soal yang sudah ada. Setiap soal harus
          dimulai dengan nomor (1., 2., dst.) dan menyertakan pilihan jawaban (A., B., C., dst.)
          serta bagian pembahasan.
        </p>
      </Modal>
    </Form>
  );
};
