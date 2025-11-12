import { TaskService } from "@/features/tasks/services/taskService";

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnValue({ data: [], error: null }),
      insert: jest.fn().mockReturnValue({ error: null }),
      update: jest.fn().mockReturnValue({ error: null }),
      eq: jest.fn().mockReturnThis(),
    })),
  },
}));

describe("TaskService", () => {
  it("lanza error si title vacío", async () => {
    await expect(TaskService.insert({ title: "", description: "a" })).rejects.toThrow("El título es obligatorio");
  });

  it("inserta correctamente", async () => {
    await expect(TaskService.insert({ title: "Tarea", description: "desc" })).resolves.toBeUndefined();
  });

  it("getAll retorna array", async () => {
    const all = await TaskService.getAll();
    expect(Array.isArray(all)).toBeTruthy();
  });

  it("toggle no lanza error", async () => {
    await expect(TaskService.toggle(1, true)).resolves.toBeUndefined();
  });
});
