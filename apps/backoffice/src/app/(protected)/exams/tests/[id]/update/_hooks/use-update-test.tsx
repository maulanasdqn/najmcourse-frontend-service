import { TTestUpdateRequest } from "@/shared/apis/tests/type";
import { useFieldArray, useForm } from "react-hook-form";
import { usePutUpdateTest } from "@/shared/hooks/tests/use-put-update-test";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";
import { useEffect } from "react";
import { useGetDetailTest } from "@/shared/hooks/tests/use-get-detail-test";
import { testUpdateSchema } from "@/shared/apis/tests/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useUpdateTest = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: detail, isLoading } = useGetDetailTest(params.id);
  const { mutate, isPending } = usePutUpdateTest();

  const form = useForm<TTestUpdateRequest>({
    mode: "all",
    resolver: zodResolver(testUpdateSchema),
    shouldUnregister: false,
  });

  const fields = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "question",
  });

  useEffect(() => {
    if (detail?.data) {
      form.reset({
        id: detail?.data.id,
        name: detail?.data.name,
        category: detail?.data.category,
        banner: detail?.data.banner,
        sub_tests: detail?.data?.sub_tests?.map?.((sub_test) => ({
          id: sub_test.id,
          name: sub_test.name,
          category: detail?.data?.category,
          description: sub_test.description,
          questions: sub_test.questions.map((question) => ({
            id: question.id,
            question: question.question,
            discussion: question.discussion,
            question_image_url: question.question_image_url,
            discussion_image_url: question.discussion_image_url,
            options: question.options.map((option) => ({
              id: option.id,
              label: option.label,
              image_url: option.image_url,
              points: parseFloat(String(option.points)),
              is_correct: option.is_correct,
            })),
          })),
        })),
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
            points: parseFloat(String(option.points)),
            is_correct: option.is_correct,
          })),
        })),
      });
      form.trigger();
    }
  }, [detail?.data, form]);

  console.log(form.formState.errors);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Test updated successfully");
        navigate(ROUTES.exams.tests.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message ?? "Something went wrong"),
    });
  });

  const handler = {
    onSubmit,
  };

  return {
    form,
    fields,
    handler,
    isLoading: isLoading || isPending,
  };
};
