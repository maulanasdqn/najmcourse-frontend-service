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
      weight: "",
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
    { label: "5%", value: 0.5 },
    { label: "10%", value: 1.0 },
    { label: "15%", value: 1.5 },
    { label: "20%", value: 2.0 },
    { label: "25%", value: 2.5 },
    { label: "30%", value: 3.0 },
    { label: "35%", value: 3.5 },
    { label: "40%", value: 4.0 },
    { label: "45%", value: 4.5 },
    { label: "50%", value: 5.0 },
    { label: "55%", value: 5.5 },
    { label: "60%", value: 6.0 },
    { label: "65%", value: 6.5 },
    { label: "70%", value: 7.0 },
    { label: "75%", value: 7.5 },
    { label: "80%", value: 8.0 },
    { label: "85%", value: 8.5 },
    { label: "90%", value: 9.0 },
    { label: "95%", value: 9.5 },
    { label: "100%", value: 10.0 },
  ];

  const options = {
    examCategories,
    studentTypes,
    weightOptions: weights,
    tests: data?.data.map((test) => ({
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
