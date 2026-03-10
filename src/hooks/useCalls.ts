import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Call } from "../types";
import { fetchCalls, updateCallStatus } from "../api/calls";

export function useCalls() {
  const queryClient = useQueryClient();

  type UpdateStatusVars = {
    id: string;
    status: Call["status"];
  };

  const callsQuery = useQuery({
    queryKey: ["calls"],
    queryFn: fetchCalls,
    refetchOnWindowFocus: true,
  });

  const updateStatus = useMutation<Call, Error, UpdateStatusVars, { prev: Call[] | undefined }>({
    mutationFn: updateCallStatus,

    onMutate: async ({ id, status }: UpdateStatusVars) => {
      const prev = queryClient.getQueryData<Call[]>(["calls"]);

      queryClient.setQueryData<Call[]>(["calls"], (calls) =>
        (calls ?? []).map((c) => (c.id === id ? { ...c, status } : c)),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(["calls"], ctx.prev);
      }
    },
  });

  return { callsQuery, updateStatus };
}
