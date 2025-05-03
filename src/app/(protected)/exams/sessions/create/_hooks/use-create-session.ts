import { createSessionSchema } from "@/api/sessions/schema";
import { TSessionCreateRequest } from "@/api/sessions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostCreateSession } from "./use-post-create-session";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { useGetListTest } from "@/app/(protected)/exams/tests/list/_hooks/use-get-list-test";

export const useCreateSession = () => {
  const { data: tests, isLoading } = useGetListTest({
    page: 1,
    per_page: 100,
  });
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCreateSession();
  const form = useForm<TSessionCreateRequest>({
    mode: "all",
    resolver: zodResolver(createSessionSchema),
  });

  const fields = useFieldArray({
    control: form.control,
    name: "tests",
    keyName: "test_id",
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Session created successfully");
        navigate(ROUTES.exams.sessions.list);
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
