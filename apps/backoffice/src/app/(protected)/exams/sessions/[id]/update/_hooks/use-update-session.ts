import { sessionUpdateSchema } from "@/shared/apis/sessions/schema";
import { TSessionUpdateRequest } from "@/shared/apis/sessions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePutUpdateSession } from "@/shared/hooks/sessions/use-put-update-session";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";
import { useGetDetailSession } from "@/shared/hooks/sessions/use-get-detail-session";
import { useEffect } from "react";

export const useUpdateSession = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = usePutUpdateSession();
  const { data: detail, isLoading: isLoadingDetail } = useGetDetailSession(params.id);

  const form = useForm<TSessionUpdateRequest>({
    mode: "all",
    resolver: zodResolver(sessionUpdateSchema),
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
        message.success("Session updated successfully");
        navigate(ROUTES.exams.sessions.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const onAddTest = () => {
    fields.append({
      test_id: "",
      weight: "0%",
      multiplier: 0,
      start_date: "",
      end_date: "",
    });
  };

  const onRemoveTest = (index: number) => {
    fields.remove(index);
  };

  useEffect(() => {
    if (detail?.data) {
      form.reset({
        id: detail.data.id,
        name: detail.data.name,
        banner: detail.data.banner,
        category: detail.data.category,
        student_type: detail.data.student_type,
        description: detail.data.description,
        is_active: detail.data.is_active,
        tests: detail.data.tests.map((test) => ({
          test_id: test.test.id,
          weight: test.weight,
          multiplier: test.multiplier,
          shuffle: test.shuffle,
          start_date: test.start_date,
          end_date: test.end_date,
        })),
      });
      form.trigger();
    }
  }, [detail?.data, form]);

  const handler = {
    onSubmit,
    onAddTest,
    onRemoveTest,
  };

  const state = {
    isLoading: isLoadingDetail || isPending,
  };

  return {
    form,
    state,
    fields,
    handler,
  };
};
