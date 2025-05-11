import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { FormProvider } from "react-hook-form";
import { useUpdateUser } from "./_hooks/use-update-user";
import { FormFields } from "../../_components/form-fields";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useUpdateUser();

  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Update User" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
