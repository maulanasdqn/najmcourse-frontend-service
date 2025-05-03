import { createTestSchema } from "@/api/tests/schema";
import { TTestCreateRequest } from "@/api/tests/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostCreateTest } from "./use-post-create-test";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { useGetListTest } from "@/app/(protected)/exams/tests/list/_hooks/use-get-list-test";

export const useCreateTest = () => {
  const { data: tests, isLoading } = useGetListTest({
    page: 1,
    per_page: 100,
  });
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCreateTest();
  const form = useForm<TTestCreateRequest>({
    mode: "all",
    resolver: zodResolver(createTestSchema),
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
        message.success("Test created successfully");
        navigate(ROUTES.exams.tests.list);
      },
    });
  });

  const categories = [
    { label: "Akademik", value: "Akademik" },
    {
      label: "Psikologi",
      value: "Psikologi",
    },
  ];

  const studentTypes = [
    { label: "TNI", value: "TNI" },
    {
      label: "Polri",
      value: "POLRI",
    },
    {
      label: "Staff / Admin",
      value: "-",
    },
  ];

  const options = {
    categories,
    studentTypes,
    tests: tests?.data.map((test) => ({
      label: test.name,
      value: test.id,
    })),
  };

  const handler = {
    onSubmit,
  };

  const state = {
    isLoading: isLoading || isPending,
  };

  return {
    form,
    state,
    fields,
    options,
    handler,
  };
};
