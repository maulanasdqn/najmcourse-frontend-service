import { updateTestSchema } from "@/api/tests/schema";
import { TTestUpdateRequest } from "@/api/tests/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { usePutUpdateTest } from "./use-put-update-test";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/commons/constants/routes";
import { useGetListTest } from "@/app/(protected)/exams/tests/list/_hooks/use-get-list-test";
import { useEffect } from "react";
import { useGetDetailTest } from "../../_hooks/use-get-detail-test";

export const useUpdateTest = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: tests, isLoading } = useGetListTest({
    page: 1,
    per_page: 100,
  });
  const { data: detail } = useGetDetailTest(params.id);
  const { mutate, isPending } = usePutUpdateTest();

  const form = useForm<TTestUpdateRequest>({
    mode: "all",
    resolver: zodResolver(updateTestSchema),
  });

  const fields = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "question",
  });

  useEffect(() => {
    if (detail) {
      form.reset(
        {
          id: detail?.data.id,
          name: detail?.data.name,
          questions: detail?.data.questions.map((question) => ({
            id: question.id,
            question: question.question,
            discussion: question.discussion,
            question_image_url: question.question_image_url,
            discussion_image_url: question.discussion_image_url,
            options: question.options.map((option) => ({
              id: option.id,
              label: option.label,
              image_url: option.image_url,
              points: String(option.points ?? ""),
              is_correct: option.is_correct,
            })),
          })),
        },
        {
          keepIsValid: true,
          keepDirty: true,
        },
      );
      form.trigger();
    }
  }, [detail, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Test updated successfully");
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
