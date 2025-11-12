import "../styles/globals.css";
import { ReactNode } from "react";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
  title: "Task Manager",
  description: "Next.js + Supabase + React Query + Carbon",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
