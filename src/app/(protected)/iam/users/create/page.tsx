"use client";

import { Page } from "admiral";
import { Col, Row, message } from "antd";
import { useCreateUserMutation } from "./_hooks/use-create-user-mutation";
import { useNavigate } from "react-router";
import { FormUser } from "../_components/form-user";
import { UserFormData } from "../_components/form-user/schema";
import { ROUTES } from "@/commons/constants/routes";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Dashboard",
      path: ROUTES.dashboard,
    },
    {
      label: "Users",
      path: ROUTES.iam.users.list,
    },
    {
      label: "Create User",
      path: "#",
    },
  ];

  const createUserMutation = useCreateUserMutation();

  const handleOnFinish = (data: UserFormData) =>
    createUserMutation.mutate(data, {
      onSuccess: () => {
        message.success("User berhasil dibuat");
        navigate("/iam/users");
      },
      onError: () => {
        message.error("User gagal dibuat");
      },
    });

  return (
    <Page title="Add User" breadcrumbs={breadcrumb}>
      <Row>
        <Col span={12} style={{ margin: "auto" }}>
          <FormUser
            formProps={{
              onFinish: handleOnFinish,
              initialValues: {
                loginType: "email",
              },
            }}
            error={createUserMutation.error}
            loading={createUserMutation.isPending}
          />
        </Col>
      </Row>
    </Page>
  );
};

export default Component;
