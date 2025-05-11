import { TMetaRequest } from "@/shared/commons/types/meta";

export const cleanParams = (params?: TMetaRequest) => {
  if (!params) return {};
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      const isEmptyString = value === "";
      const isNull = value === null;
      const isUndefined = value === undefined;
      return !isEmptyString && !isNull && !isUndefined;
    }),
  );
};
