/**
 * Variáveis de ambiente do Sanity.
 *
 * De propósito nada aqui lança erro quando as variáveis faltam: o site precisa
 * continuar buildando e sendo publicado antes do projeto no Sanity existir. Os
 * pontos que realmente dependem do CMS consultam `isSanityConfigured` e caem
 * para um estado vazio (blog sem posts, Studio com instruções de setup).
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * Data fixa da versão da API. Manter congelado é intencional: é o que garante
 * que uma mudança futura na API do Sanity não altere as respostas em produção.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";

export const isSanityConfigured = projectId.length > 0;
