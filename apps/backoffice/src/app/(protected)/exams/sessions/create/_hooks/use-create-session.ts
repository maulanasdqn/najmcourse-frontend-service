import { sessionCreateSchema } from "@/shared/apis/sessions/schema";
import { TSessionCreateRequest } from "@/shared/apis/sessions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostCreateSession } from "./use-post-create-session";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useCreateSession = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostCreateSession();

  const form = useForm<TSessionCreateRequest>({
    mode: "all",
    resolver: zodResolver(sessionCreateSchema),
    defaultValues: {
      is_active: true,
    },
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
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const handler = {
    onSubmit,
  };

  const state = {
    isLoading: isPending,
  };

  return {
    form,
    state,
    fields,
    handler,
  };
};
