import { LogoGithub, LogoLinkedin } from "@carbon/icons-react";

export default function SocialLinks() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <a
        href="https://github.com/14Cristhian/task_manager"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        style={{
          color: "inherit",
          textDecoration: "none",
          transition: "transform 0.2s ease, color 0.2s ease",
        }}
        onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
      >
        <LogoGithub size={22} />
      </a>

      <a
        href="https://www.linkedin.com/in/cristhian-morales-412664295/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{
          color: "inherit",
          textDecoration: "none",
          transition: "transform 0.2s ease, color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#0A66C2")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
      >
        <LogoLinkedin size={22} />
      </a>
    </div>
  );
}
