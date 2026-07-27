import { getResolvedSettings } from "@/lib/settings";

/**
 * Aplica as cores de destaque escolhidas em "Configurações do site" no Sanity.
 *
 * Reaponta apenas os papéis (--rp-accent / --rp-accent-2) para outro token da
 * paleta — os valores em si continuam vindo da Rosé Pine e trocando junto com
 * o tema claro/escuro. Os nomes já vêm validados contra a lista fechada em
 * lib/settings.ts, então a interpolação abaixo não aceita CSS arbitrário.
 */
export async function ThemeAccents() {
  const { accent, accentSecondary } = await getResolvedSettings();

  // Iguais ao padrão do CSS: não há o que sobrescrever.
  if (accent === "iris" && accentSecondary === "foam") return null;

  return (
    <style>
      {`:root{--rp-accent:var(--rp-${accent});--rp-accent-2:var(--rp-${accentSecondary})}`}
    </style>
  );
}
