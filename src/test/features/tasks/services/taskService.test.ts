import { TaskService } from "@/features/tasks/services/taskService";
import { supabase } from "@/lib/supabase/client";

jest.mock("@/lib/supabase/client", () => {
  const mockFrom = jest.fn(() => ({
    select: jest.fn(() => ({
      order: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
    insert: jest.fn().mockResolvedValue({ data: [], error: null }),
    update: jest.fn(() => ({
      eq: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
    delete: jest.fn(() => ({
      eq: jest.fn().mockResolvedValue({ data: [], error: null }),
    })),
  }));

  return {
    supabase: {
      from: mockFrom,
    },
  };
});

describe("TaskService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería obtener todas las tareas correctamente", async () => {
    const mockData = [{ id: 1, title: "Test", description: "Desc", done: false }];

    // Simula que supabase.from("tasks").select().order() devuelve estos datos
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({ data: mockData, error: null }),
      })),
    });

    const tasks = await TaskService.getAll();

    expect(supabase.from).toHaveBeenCalledWith("tasks");
    expect(tasks).toEqual(mockData);
  });

  it("debería lanzar error si Supabase devuelve error en getAll", async () => {
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest.fn(() => ({
        order: jest.fn().mockResolvedValue({ data: null, error: { message: "DB error" } }),
      })),
    });

    await expect(TaskService.getAll()).rejects.toThrow("DB error");
  });

  it("debería insertar una tarea correctamente", async () => {
    (supabase.from as jest.Mock).mockReturnValueOnce({
      insert: jest.fn().mockResolvedValue({ error: null }),
    });

    await TaskService.insert({ title: "New", description: "Desc" });

    expect(supabase.from).toHaveBeenCalledWith("tasks");
  });

  it("debería lanzar error si el título está vacío", async () => {
    await expect(TaskService.insert({ title: " ", description: "" })).rejects.toThrow("El título es obligatorio");
  });

  it("debería actualizar el estado done correctamente", async () => {
    const mockEq = jest.fn().mockResolvedValue({ error: null });
    const mockUpdate = jest.fn(() => ({ eq: mockEq }));

    (supabase.from as jest.Mock).mockReturnValueOnce({
      update: mockUpdate,
    });

    await TaskService.toggle(1, true);

    expect(mockUpdate).toHaveBeenCalledWith({ done: true });
    expect(mockEq).toHaveBeenCalledWith("id", 1);
  });

  it("debería eliminar correctamente", async () => {
    const mockEq = jest.fn().mockResolvedValue({ error: null });
    const mockDelete = jest.fn(() => ({ eq: mockEq }));

    (supabase.from as jest.Mock).mockReturnValueOnce({
      delete: mockDelete,
    });

    await TaskService.delete(1);

    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith("id", 1);
  });
});
