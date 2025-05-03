import { createSessionSchema } from "@/api/sessions/schema";
import { TSessionCreateRequest } from "@/api/sessions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePutUpdateSession } from "./use-put-update-session";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { useGetListTest } from "@/app/(protected)/exams/tests/list/_hooks/use-get-list-test";
import { useGetDetailSession } from "../../_hooks/use-get-detail-session";
import { useEffect } from "react";

export const useUpdateSession = () => {
  const { data: tests, isLoading } = useGetListTest({
    page: 1,
    per_page: 100,
  });
  const params = useParams();
  const { data: detail } = useGetDetailSession(params.id ?? "");
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdateSession();
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
    mutate(
      {
        id: params.id ?? "",
        ...data,
      },
      {
        onSuccess: () => {
          form.reset();
          message.success("Session updated successfully");
          navigate(ROUTES.exams.sessions.list);
        },
      },
    );
  });

  useEffect(() => {
    if (detail) {
      form.reset({
        name: detail.data.name,
        category: detail.data.category,
        student_type: detail.data.student_type,
        description: detail.data.description,
        is_active: detail.data.is_active,
        tests: detail.data.tests.map((test) => ({
          test_id: test.test.id,
          weight: test.weight,
          multiplier: test.multiplier,
          start_date: test.start_date,
          end_date: test.end_date,
        })),
      });
    }
  }, [detail, form]);

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
