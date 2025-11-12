"use client";

import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import TaskList from "@/components/tasks/TaskList";
import { Theme, Grid, Column, Content } from "@carbon/react";

import Footer from "./Ui/Footer";
import AppHeader from "./Ui/AppHeader";

export default function Page() {
  // Estado para manejar el tema
  const [theme, setTheme] = useState<"g10" | "g100">("g10");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "g10" ? "g100" : "g10"));
  };

  return (
    <Theme theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* ===== HEADER ===== */}
        <AppHeader title="Gestor de Tareas" theme={theme} onThemeToggle={toggleTheme} />

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <Content
          id="main-content"
          style={{
            flex: "1 0 auto",
            padding: "2rem 1rem",
          }}
        >
          <header
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                marginBottom: "0.5rem",
                fontWeight: 700,
                color: "var(--cds-text-primary)",
              }}
            >
              Gestor de Tareas
            </h1>
            <p
              style={{
                color: "var(--cds-text-secondary)",
                fontSize: "1rem",
              }}
            >
              Organiza tus pendientes de forma clara y eficiente.
            </p>
          </header>

          <Grid fullWidth style={{ gap: "1.5rem" }}>
            <Column sm={4} md={8} xlg={6}>
              <AddTaskForm />
            </Column>
            <Column sm={4} md={8} xlg={10}>
              <TaskList />
            </Column>
          </Grid>
        </Content>

        {/* ===== FOOTER ===== */}
        <Footer />
      </div>
    </Theme>
  );
}
