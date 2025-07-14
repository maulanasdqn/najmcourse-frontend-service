import { TTestCreateRequest, TTestUpdateRequest } from "@/shared/apis/tests/type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { match } from "ts-pattern";
import { v4 } from "uuid";

export const useFormTest = () => {
  const form = useFormContext<TTestCreateRequest | TTestUpdateRequest>();

  const subjectOptions = match(form.watch("category"))
    .with("Akademik", () => [
      {
        label: "Matematika",
        value: "Matematika",
      },
      {
        label: "Inggris",
        value: "Inggris",
      },
      {
        label: "Indonesia",
        value: "Indonesia",
      },
      {
        label: "Wawasan Kebangsaan",
        value: "Wawasan Kebangsaan",
      },
      {
        label: "Pengetahuan Umum",
        value: "Pengetahuan Umum",
      },
      {
        label: "Fisika",
        value: "Fisika",
      },
    ])
    .with("Psikologi", () => [
      {
        label: "SKD",
        value: "SKD",
      },
      {
        label: "Kepribadian",
        value: "Kepribadian",
      },
      {
        label: "Kecerdasan",
        value: "Kecerdasan",
      },
    ])
    .otherwise(() => []);

  const fields = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const subTestFields = useFieldArray({
    control: form.control,
    name: "sub_tests",
  });

  const onAddQuestion = () => {
    fields.append({
      id: v4(),
      question: "",
      question_image_url: "",
      discussion: "",
      discussion_image_url: "",
      options: [],
    });
  };

  const onRemoveQuestion = (index: number) => {
    fields.remove(index);
  };

  const onAddSubTest = () => {
    subTestFields.append({
      id: v4(),
      name: "",
      banner: "",
      category: "",
      questions: [],
      passing_grade: 0,
    });
  };

  const onRemoveSubTest = (index: number) => {
    subTestFields.remove(index);
  };

  const handler = {
    onAddQuestion,
    onRemoveQuestion,
    onAddSubTest,
    onRemoveSubTest,
  };

  const options = {
    subjectOptions,
  };

  return {
    form,
    fields,
    subTestFields,
    handler,
    options,
  };
};
