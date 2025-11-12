import { Layer, Theme } from "@carbon/react";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
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

        <SocialLinks />
      </Layer>
    </Theme>
  );
}
