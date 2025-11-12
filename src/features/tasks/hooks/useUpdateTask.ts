import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/features/tasks/services/taskService";
import { TASKS_QUERY_KEY } from "./useTasks";

export function useUpdateTask() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { id: number; title: string; description: string }) =>
      TaskService.update(payload.id, {
        title: payload.title,
        description: payload.description,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });

  return {
    updateTask: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
