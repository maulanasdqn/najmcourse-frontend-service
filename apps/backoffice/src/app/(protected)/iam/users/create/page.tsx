import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { FormProvider } from "react-hook-form";
import { useCreateUser } from "./_hooks/use-create-user";
import { FormFields } from "../_components/form-fields";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useCreateUser();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Create User" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
