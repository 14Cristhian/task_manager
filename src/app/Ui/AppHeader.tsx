"use client";

import { Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel } from "@carbon/react";
import { Notification, Moon, Sun } from "@carbon/icons-react";

type AppHeaderProps = {
  title: string;
  onThemeToggle: () => void;
  theme: "g10" | "g100";
  onNotificationClick?: () => void;
};

export default function AppHeader({ title, onThemeToggle, theme, onNotificationClick }: AppHeaderProps) {
  return (
    <Header aria-label={title}>
      <HeaderName href="#" prefix="">
        {title}
      </HeaderName>

      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Notificaciones" onClick={onNotificationClick} tooltipAlignment="center">
          <Notification size={20} />
        </HeaderGlobalAction>

        <HeaderGlobalAction aria-label="Cambiar tema" onClick={onThemeToggle} tooltipAlignment="end">
          {theme === "g10" ? <Moon size={20} /> : <Sun size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>

      <HeaderPanel href="#notification-button" />
    </Header>
  );
}
