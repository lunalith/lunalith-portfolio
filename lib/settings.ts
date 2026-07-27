import { cache } from "react";
import { getSiteSettings } from "@/sanity/lib/fetch";
import type { AccentToken } from "@/sanity/lib/types";
import { siteConfig } from "./site";

/**
 * Lista fechada de tokens de destaque aceitos.
 *
 * A checagem não é só defensiva: o valor vem do CMS e acaba interpolado dentro
 * de uma tag <style>. Sem validar, qualquer string salva no Sanity viraria CSS
 * arbitrário na página.
 */
const ACCENT_TOKENS: readonly AccentToken[] = [
  "iris",
  "foam",
  "gold",
  "love",
  "pine",
];

function resolveAccent(
  value: string | null | undefined,
  fallback: AccentToken,
): AccentToken {
  return ACCENT_TOKENS.includes(value as AccentToken)
    ? (value as AccentToken)
    : fallback;
}

/** Campo vazio ou só com espaços no CMS não deve apagar o valor padrão. */
function orDefault(value: string | null | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

/**
 * Junta o que veio do Sanity com os padrões de lib/site.ts.
 *
 * `cache` deduplica a consulta dentro de um mesmo render: Hero, Contato,
 * rodapé e as cores de destaque leem daqui e ainda assim o CMS é consultado
 * uma vez só por requisição.
 */
export const getResolvedSettings = cache(async () => {
  const settings = await getSiteSettings();

  return {
    bio: orDefault(settings?.shortBio, siteConfig.tagline),
    email: orDefault(settings?.email, siteConfig.contact.email),
    github: orDefault(settings?.github, siteConfig.contact.github),
    linkedin: orDefault(settings?.linkedin, siteConfig.contact.linkedin),
    accent: resolveAccent(settings?.themeColors?.accent, "iris"),
    accentSecondary: resolveAccent(
      settings?.themeColors?.accentSecondary,
      "foam",
    ),
  };
});

export type ResolvedSettings = Awaited<ReturnType<typeof getResolvedSettings>>;
