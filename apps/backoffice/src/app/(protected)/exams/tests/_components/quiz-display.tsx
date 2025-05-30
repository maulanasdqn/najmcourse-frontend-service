import { FC, ReactElement, useState } from "react";
import { Radio, Button, Card, Space, Typography } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";

const { Text } = Typography;

interface QuizOption {
  id: string;
  label: string;
  image_url?: string;
  is_correct: boolean;
  points: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  question_image_url?: string;
  discussion?: string;
  discussion_image_url?: string;
  options: QuizOption[];
}

interface QuizDisplayProps {
  question: QuizQuestion;
  questionIndex: number;
  onEditQuestion?: (index: number) => void;
  onDeleteQuestion?: (index: number) => void;
  onDuplicateQuestion?: (index: number) => void;
  onRemoveOption?: (questionIndex: number, optionIndex: number) => void;
  onAddOption?: (questionIndex: number) => void;
  showAnswers?: boolean;
  isPreview?: boolean;
}

export const QuizDisplay: FC<QuizDisplayProps> = ({
  question,
  questionIndex,
  onEditQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onRemoveOption,
  onAddOption,
  showAnswers = false,
  isPreview = false,
}): ReactElement => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };

  const getOptionLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  return (
    <Card
      className="mb-6 shadow-sm"
      style={{
        borderRadius: "8px",
        border: "1px solid #e8e8e8",
      }}
    >
      {!isPreview && (
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
          <Text strong className="text-gray-600">
            Soal {questionIndex + 1}
          </Text>
          <Space>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEditQuestion?.(questionIndex)}
            >
              Edit
            </Button>
            <Button
              size="small"
              icon={<CopyOutlined />}
              onClick={() => onDuplicateQuestion?.(questionIndex)}
            >
              Duplikasi
            </Button>
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteQuestion?.(questionIndex)}
            >
              Hapus
            </Button>
          </Space>
        </div>
      )}

      <div className="mb-6">
        <div
          className="text-base leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
        {question.question_image_url && (
          <div className="mt-3">
            <img
              src={question.question_image_url}
              alt="Question"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-4">
        <Radio.Group
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full flex flex-col gap-y-4"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {question.options.map((option, optionIndex) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              style={{
                backgroundColor: selectedOption === option.id ? "#f0f9ff" : "#ffffff",
                borderColor: selectedOption === option.id ? "#3b82f6" : "#e5e7eb",
              }}
            >
              <div className="flex items-center flex-1">
                <Radio value={option.id} className="mr-3">
                  <span className="font-medium text-gray-700 mr-2">
                    {getOptionLabel(optionIndex)}.
                  </span>
                  <span className="text-gray-800">{option.label}</span>
                </Radio>
                {option.image_url && (
                  <div className="ml-3">
                    <img
                      src={option.image_url}
                      alt={`Option ${getOptionLabel(optionIndex)}`}
                      className="max-w-32 h-auto rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {showAnswers && option.is_correct && (
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                    <CheckOutlined className="text-white text-xs" />
                  </div>
                )}

                {!isPreview && (
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => onRemoveOption?.(questionIndex, optionIndex)}
                  />
                )}
              </div>
            </div>
          ))}
        </Radio.Group>

        {!isPreview && (
          <Button
            type="dashed"
            className="w-full mt-4"
            onClick={() => onAddOption?.(questionIndex)}
          >
            Tambahkan opsi atau{" "}
            <span className="text-blue-500 underline cursor-pointer">"Lainnya"</span>
          </Button>
        )}
      </div>

      {question.discussion && showAnswers && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Text strong className="text-gray-700 block mb-2">
            Pembahasan:
          </Text>
          <div
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.discussion }}
          />
          {question.discussion_image_url && (
            <div className="mt-3">
              <img
                src={question.discussion_image_url}
                alt="Discussion"
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
        </div>
      )}

      {!isPreview && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <Text className="text-sm text-gray-500">Kunci jawaban: {questionIndex + 1} (5 poin)</Text>
          <Space>
            <Button type="link" icon={<CopyOutlined />}>
              Salin
            </Button>
            <Button type="link" icon={<DeleteOutlined />}>
              Hapus
            </Button>
            <Button type="link">Wajib diisi</Button>
            <Button type="link">⋮</Button>
          </Space>
        </div>
      )}
    </Card>
  );
};
