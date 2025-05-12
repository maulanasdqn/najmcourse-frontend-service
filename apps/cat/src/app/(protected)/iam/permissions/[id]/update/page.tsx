import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useUpdatePermission } from "./_hooks/use-update-permission";
import { FormFields } from "../../_components/form-fields";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useUpdatePermission();

  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Update Permission" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
