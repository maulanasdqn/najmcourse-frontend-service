import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useCreatePermission } from "./_hooks/use-create-permission";
import { FormFields } from "../_components/form-fields";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useCreatePermission();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Create Permission" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
