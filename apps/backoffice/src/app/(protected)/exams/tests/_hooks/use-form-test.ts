import { TTestCreateRequest, TTestUpdateRequest } from "@/shared/apis/tests/type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { v4 } from "uuid";

export const useFormTest = () => {
  const form = useFormContext<TTestCreateRequest | TTestUpdateRequest>();

  const fields = useFieldArray({
    control: form.control,
    name: "questions",
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

  const handler = {
    onAddQuestion,
    onRemoveQuestion,
  };

  return {
    form,
    fields,
    handler,
  };
};
