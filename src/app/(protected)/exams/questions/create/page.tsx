import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useCreateTest } from "./_hooks/use-create-test";
import { FormFields } from "../_components/form-fields";

export const Component: FC = (): ReactElement => {
  const { form, handler, isLoading } = useCreateTest();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Create Test" />
      <FormFields isLoading={isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
