"use client";

import { useState } from "react";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import TaskList from "@/components/tasks/TaskList";
import {
  Theme,
  Grid,
  Column,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Content,
  Layer,
  HeaderPanel,
} from "@carbon/react";
import { Notification, LogoGithub, LogoLinkedin, Sun, Moon } from "@carbon/icons-react";

type ThemeType = "g10" | "g100" | "white" | "g90";

export default function Page() {
  // Estado para manejar el tema
  const [theme, setTheme] = useState<ThemeType>("g10"); // g10 = claro | g100 = oscuro

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
        <Header aria-label="Gestor de Tareas">
          <HeaderName href="#" prefix="">
            Gestor de Tareas
          </HeaderName>

          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Notificaciones" onClick={() => {}} tooltipAlignment="center">
              <Notification size={20} />
            </HeaderGlobalAction>

            {/* === Boton de cambio de tema === */}
            <HeaderGlobalAction aria-label="Cambiar tema" onClick={toggleTheme} tooltipAlignment="end">
              {theme === "g10" ? <Moon size={20} /> : <Sun size={20} />}
            </HeaderGlobalAction>
          </HeaderGlobalBar>

          <HeaderPanel href="#notification-button" />
        </Header>

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
        <Theme theme="g100">
          <Layer
            style={{
              flexShrink: 0,
              backgroundColor: "#000",
              color: "#f4f4f4",
              borderTop: "1px solid #262626",
              padding: "1.5rem 2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Izquierda */}
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  margin: 0,
                  color: "#f4f4f4",
                }}
              >
                © {new Date().getFullYear()} Gestor de Tareas
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#c6c6c6",
                  margin: 0,
                }}
              >
                Desarrollado con Carbon Design System
              </p>
            </div>

            {/* Derecha */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <HeaderGlobalAction aria-label="GitHub" onClick={() => window.open("https://github.com", "_blank")}>
                <LogoGithub size={20} />
              </HeaderGlobalAction>

              <HeaderGlobalAction aria-label="LinkedIn" onClick={() => window.open("https://linkedin.com", "_blank")}>
                <LogoLinkedin size={20} />
              </HeaderGlobalAction>
            </div>
          </Layer>
        </Theme>
      </div>
    </Theme>
  );
}
