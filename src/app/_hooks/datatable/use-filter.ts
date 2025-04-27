/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const useFilter = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cb = (params: URLSearchParams) => {
    const queryParams = params.toString();
    navigate(queryParams ? `?${queryParams}` : "");
  };
  return useMemo(
    () => ({
      searchParams,
      cb,
    }),
    [searchParams],
  );
};

export type TFilter = string | undefined;
