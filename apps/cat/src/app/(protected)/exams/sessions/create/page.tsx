import { PageHeadDetail } from "@/shared/components/ui/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useCreateSession } from "./_hooks/use-create-session";
import { FormFields } from "../_components/form-fields";

export const Component: FC = (): ReactElement => {
  const { form, state, handler } = useCreateSession();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Create Session" />
      <FormFields isLoading={state.isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
