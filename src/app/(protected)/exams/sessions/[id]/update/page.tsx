import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useUpdateSession } from "./_hooks/use-update-session";
import { FormFields } from "../../_components/form-fields";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useUpdateSession();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Update Session" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
