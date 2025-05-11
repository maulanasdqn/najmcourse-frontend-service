import { TTestUpdateRequest } from "@/api/tests/type";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostCreateTest } from "./use-post-create-test";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { testCreateSchema } from "@/api/tests/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateTest = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCreateTest();

  const form = useForm<TTestUpdateRequest>({
    mode: "all",
    resolver: zodResolver(testCreateSchema),
  });

  const fields = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "question",
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Test updated successfully");
        navigate(ROUTES.exams.tests.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const handler = {
    onSubmit,
  };

  return {
    form,
    fields,
    handler,
    isLoading: isPending,
  };
};
