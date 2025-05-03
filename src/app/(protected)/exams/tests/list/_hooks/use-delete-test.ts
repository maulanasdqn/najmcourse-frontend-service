import { deleteTest } from "@/api/tests/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTest = () => {
  return useMutation({
    mutationKey: ["delete-test"],
    mutationFn: deleteTest,
  });
};
