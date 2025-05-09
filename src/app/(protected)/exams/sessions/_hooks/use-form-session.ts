import { TSessionCreateRequest, TSessionUpdateRequest } from "@/api/sessions/type";
import { examCategories, studentTypes } from "@/app/(protected)/_constants/options";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useGetListTest } from "../../tests/list/_hooks/use-get-list-test";

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
      weight: 0,
      multiplier: 0,
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

  const options = {
    examCategories,
    studentTypes,
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
