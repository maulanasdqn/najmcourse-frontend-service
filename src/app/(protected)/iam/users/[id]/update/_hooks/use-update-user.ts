import { updateUserSchema } from "@/api/users/schema";
import { TUserUpdateRequest } from "@/api/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutUpdateUser } from "./use-put-update-user";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGetDetailUser } from "../../_hooks/use-get-detail-user";
import { useEffect } from "react";
import { useGetListRole } from "@/app/(protected)/iam/roles/list/_hooks/use-get-list-role";

export const useUpdateUser = () => {
  const { data: roles } = useGetListRole({
    page: 1,
    per_page: 100,
  });
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdateUser();
  const { data, isLoading } = useGetDetailUser(params.id ?? "");
  const form = useForm<TUserUpdateRequest>({
    mode: "all",
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      avatar: "",
      birthdate: "",
      email: "",
      fullname: "",
      gender: "",
      identity_number: "",
      is_active: false,
      phone_number: "",
      referral_code: "",
      referred_by: "",
      religion: "",
      role_id: "",
      student_type: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        avatar: data.data.avatar,
        birthdate: data.data.birthdate,
        email: data.data.email,
        fullname: data.data.fullname,
        gender: data.data.gender,
        identity_number: data.data.identity_number,
        is_active: data.data.is_active,
        phone_number: data.data.phone_number,
        referral_code: data.data.referral_code,
        referred_by: data.data.referred_by,
        religion: data.data.religion,
        role_id: data.data.role.id,
        student_type: data.data.student_type,
      });
    }
  }, [data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        id: params.id ?? "",
        ...data,
      },
      {
        onSuccess: () => {
          form.reset();
          message.success("User updated successfully");
          navigate("/iam/users/list");
        },
      },
    );
  });

  const state = {
    isLoading: isLoading || isPending,
  };

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
    roles: roles?.data.map((role) => ({
      label: role.name,
      value: role.id,
    })),
    studentTypes,
  };

  const handler = {
    onSubmit,
  };

  return {
    form,
    state,
    handler,
    options,
  };
};
