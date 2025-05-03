import { createUserSchema } from "@/api/users/schema";
import { TUserCreateRequest } from "@/api/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router";
import { usePostCreateUser } from "./use-post-create-user";
import { useGetListRole } from "@/app/(protected)/iam/roles/list/_hooks/use-get-list-role";

export const useCreateUser = () => {
  const { data: roles, isLoading } = useGetListRole({
    page: 1,
    per_page: 100,
  });
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCreateUser();
  const form = useForm<TUserCreateRequest>({
    mode: "all",
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      fullname: "",
      is_active: true,
      password: "",
      phone_number: "",
      referral_code: "",
      referred_by: "",
      role_id: "",
      student_type: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("User created successfully");
        navigate("/iam/Users/list");
      },
    });
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
