import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddTask } from "@/features/tasks/hooks/useAddTask";
import { TaskService } from "@/features/tasks/services/taskService";

jest.mock("@/features/tasks/services/taskService");

const createWrapper = () => {
  const qc = new QueryClient();
  return ({ children }: any) => <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

describe("useAddTask", () => {
  it("llama a TaskService.insert y setea success", async () => {
    (TaskService.insert as jest.Mock).mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useAddTask(), { wrapper: createWrapper() });

    act(() => {
      result.current.addTask({ title: "a", description: "b" } as any);
    });

    expect(TaskService.insert).toHaveBeenCalledWith({ title: "a", description: "b" });
  });
});
