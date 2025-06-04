import { TTestCreateRequest, TTestUpdateRequest } from "@/shared/apis/tests/type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 } from "uuid";

export const useFormTest = () => {
  const form = useFormContext<TTestCreateRequest | TTestUpdateRequest>();

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
      category: form.getValues("category") || "Psikologi",
      questions: [],
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

  return {
    form,
    fields,
    subTestFields,
    handler,
  };
};
