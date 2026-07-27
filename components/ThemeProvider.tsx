"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Envolve a árvore com o next-themes.
 *
 * `enableSystem` fica desligado de propósito: o site tem uma identidade escura
 * (Rosé Pine Moon) e só troca para o claro quando a pessoa pede no toggle —
 * não seguindo a preferência do sistema.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
