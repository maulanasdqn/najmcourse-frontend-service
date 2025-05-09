import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail";
import { FormProvider } from "react-hook-form";
import { useUpdateRole } from "./_hooks/use-update-role";
import { FormFields } from "../../_components/form-fields";
import { FC, ReactElement } from "react";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useUpdateRole();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Update Role" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
