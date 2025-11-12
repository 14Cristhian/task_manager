import { useQuery } from "@tanstack/react-query";
import { TaskService, Task } from "@/features/tasks/services/taskService";

export const TASKS_QUERY_KEY = ["tasks"];

export function useTasks() {
  return useQuery<Task[], Error>({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => TaskService.getAll(),
    staleTime: 1000 * 30,
    retry: 1,
  });
}
