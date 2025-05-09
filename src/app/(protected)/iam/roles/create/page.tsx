import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail";
import { FormProvider } from "react-hook-form";
import { useCreateRole } from "./_hooks/use-create-role";
import { FormFields } from "../_components/form-fields";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useCreateRole();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Create Role" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
