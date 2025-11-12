import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/features/tasks/services/taskService";
import { TASKS_QUERY_KEY } from "./useTasks";

export function useDeleteTask() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });

  return {
    deleteTask: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
}
