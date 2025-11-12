import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskService } from "@/features/tasks/services/taskService";
import { TASKS_QUERY_KEY } from "./useTasks";

export function useAddTask() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { title: string; description: string }) => {
      await TaskService.insert(payload);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });

  return {
    addTask: mutation.mutateAsync, 
    isLoading: mutation.isPending,
  };
}

export function useToggleTask() {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, done }: { id: number; done: boolean }) => {
      await TaskService.toggle(id, done);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });

  return {
    toggle: mutation.mutateAsync, 
    isLoading: mutation.isPending,
  };
}
