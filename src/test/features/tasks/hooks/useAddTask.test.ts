import { TaskService } from "@/features/tasks/services/taskService";
import { supabase } from "@/lib/supabase/client";

jest.mock("@/lib/supabase/client", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    order: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  },
}));

describe("TaskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería obtener todas las tareas correctamente", async () => {
    const mockData = [{ id: 1, title: "Test", description: "Desc", done: false }];
    (supabase.select as jest.Mock).mockResolvedValueOnce({ data: mockData, error: null });

    const tasks = await TaskService.getAll();

    expect(supabase.from).toHaveBeenCalledWith("tasks");
    expect(tasks).toEqual(mockData);
  });

  it("debería lanzar error si Supabase devuelve error en getAll", async () => {
    (supabase.select as jest.Mock).mockResolvedValueOnce({ data: null, error: { message: "DB error" } });
    await expect(TaskService.getAll()).rejects.toThrow("DB error");
  });

  it("debería insertar una tarea correctamente", async () => {
    (supabase.insert as jest.Mock).mockResolvedValueOnce({ error: null });
    await TaskService.insert({ title: "New", description: "Desc" });
    expect(supabase.insert).toHaveBeenCalledWith([{ title: "New", description: "Desc", done: false }]);
  });

  it("debería lanzar error si el título está vacío", async () => {
    await expect(TaskService.insert({ title: " ", description: "" })).rejects.toThrow("El título es obligatorio");
  });

  it("debería actualizar el estado done correctamente", async () => {
    (supabase.update as jest.Mock).mockResolvedValueOnce({ error: null });
    await TaskService.toggle(1, true);
    expect(supabase.update).toHaveBeenCalledWith({ done: true });
    expect(supabase.eq).toHaveBeenCalledWith("id", 1);
  });

  it("debería eliminar correctamente", async () => {
    (supabase.delete as jest.Mock).mockResolvedValueOnce({ error: null });
    await TaskService.delete(1);
    expect(supabase.delete).toHaveBeenCalled();
    expect(supabase.eq).toHaveBeenCalledWith("id", 1);
  });
});
