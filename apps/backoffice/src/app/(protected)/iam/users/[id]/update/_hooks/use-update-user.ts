import { TUserUpdateBackofficeRequest } from "@/shared/apis/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { ROUTES } from "@/shared/commons/constants/routes";
import { userUpdateBackofficeSchema } from "@/shared/apis/users/schema";
import { usePutUpdateBackofficeUser } from "@/shared/hooks/users/use-put-update-user";
import { useGetDetailUser } from "@/shared/hooks/users/use-get-detail-user";

export const useUpdateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdateBackofficeUser();
  const { data, isLoading } = useGetDetailUser(params.id ?? "");
  const form = useForm<TUserUpdateBackofficeRequest>({
    mode: "all",
    resolver: zodResolver(userUpdateBackofficeSchema),
    defaultValues: {
      email: "",
      fullname: "",
      is_active: false,
      phone_number: "",
      referral_code: "",
      referred_by: "",
      role_id: "",
      student_type: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.data.id,
        email: data.data.email,
        fullname: data.data.fullname,
        is_active: data.data.is_active,
        phone_number: data.data.phone_number,
        referral_code: data.data.referral_code,
        referred_by: data.data.referred_by,
        role_id: data.data.role.id,
        student_type: data.data.student_type,
      });
    }
  }, [data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("User updated successfully");
        navigate(ROUTES.iam.users.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const state = {
    isLoading: isLoading || isPending,
  };

  const handler = {
    onSubmit,
  };

  return {
    form,
    state,
    handler,
  };
};
