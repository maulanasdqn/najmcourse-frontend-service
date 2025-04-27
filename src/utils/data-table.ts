import { TResponseList } from "@/commons/types/response";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeSource = <T extends Record<string, any>>(source?: TResponseList<T>) => {
  if (!source) return undefined;

  return {
    data: source.data,
    meta: {
      page: source.meta.page,
      per_page: source.meta.per_page,
      total: source.meta.total,
    },
  };
};
