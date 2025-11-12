import { supabase } from "@/lib/supabase/client";

export interface Task {
  id?: number;
  title: string;
  description: string;
  done?: boolean;
}

export class TaskService {
  static async getAll(): Promise<Task[]> {
    const { data, error } = await supabase.from<Task>("tasks").select("*").order("id", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  }

  static async insert({ title, description }: Pick<Task, "title" | "description">): Promise<void> {
    if (!title || !title.trim()) throw new Error("El título es obligatorio");
    const { error } = await supabase.from("tasks").insert([{ title, description, done: false }]);
    if (error) throw new Error(error.message);
  }

  static async toggle(id: number, done: boolean): Promise<void> {
    const { error } = await supabase.from("tasks").update({ done }).eq("id", id);
    if (error) throw new Error(error.message);
  }

  static async update(id: number, fields: Partial<Task>): Promise<void> {
    const { error } = await supabase.from("tasks").update(fields).eq("id", id);
    if (error) throw new Error(error.message);
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}
