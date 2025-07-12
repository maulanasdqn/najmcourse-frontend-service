import { TTestUpdateRequest } from "@/shared/apis/tests/type";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostCreateTest } from "@/shared/hooks/tests/use-post-create-test";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";
import { testCreateSchema } from "@/shared/apis/tests/schema";
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
    mutate(
      {
        ...data,
        sub_tests: data.sub_tests?.map((subTest) => ({
          ...subTest,
          passing_grade: Number(subTest.passing_grade),
        })),
      } as any,
      {
        onSuccess: () => {
          form.reset();
          message.success("Test updated successfully");
          navigate(ROUTES.exams.tests.list);
        },
        onError: (err) => void message.error(err?.response?.data?.message),
      },
    );
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
