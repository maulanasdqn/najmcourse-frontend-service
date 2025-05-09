import { FormFields } from "../../_components/form-fields";
import { PageHeadDetail } from "@/app/(protected)/_components/page-head-detail/page-head-detail";
import { FC, ReactElement } from "react";
import { FormProvider } from "react-hook-form";
import { useUpdateTest } from "./_hooks/use-update-test";

export const Component: FC = (): ReactElement => {
  const { form, handler, isLoading } = useUpdateTest();
  return (
    <FormProvider {...form}>
      <PageHeadDetail title="Update Test" />
      <FormFields isLoading={isLoading} onSubmit={handler.onSubmit} />
    </FormProvider>
  );
};

export default Component;
