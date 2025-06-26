import { TSessionCreateRequest, TSessionUpdateRequest } from "@/shared/apis/sessions/type";
import { examCategories, studentTypes } from "../../../_constants/options";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetListTest } from "@/shared/hooks/tests/use-get-list-test";

export const useFormSession = () => {
  const { data } = useGetListTest({
    page: 1,
    per_page: 100,
  });

  const form = useFormContext<TSessionCreateRequest | TSessionUpdateRequest>();

  const fields = useFieldArray({
    control: form.control,
    name: "tests",
  });

  const onAddTest = () => {
    fields.append({
      test_id: "",
      weight: "0%",
      multiplier: 0,
      timer: 60,
      start_date: "",
      end_date: "",
    });
  };

  const onRemoveTest = (index: number) => {
    fields.remove(index);
  };

  const handler = {
    onAddTest,
    onRemoveTest,
  };

  const weights = [
    { label: "0%", value: "0%" },
    { label: "10%", value: "10%" },
    { label: "15%", value: "15%" },
    { label: "20%", value: "20%" },
    { label: "25%", value: "25%" },
    { label: "30%", value: "30%" },
    { label: "35%", value: "35%" },
    { label: "40%", value: "40%" },
    { label: "45%", value: "45%" },
    { label: "50%", value: "50%" },
  ];

  const options = {
    examCategories,
    studentTypes,
    weightOptions: weights,
    tests: data?.data
      .filter((test) => test.category === form.watch("category"))
      .map((test) => ({
        label: test.name,
        value: test.id,
      })),
  };

  const state = {
    isLoading: false,
  };

  return {
    form,
    state,
    fields,
    options,
    handler,
  };
};
