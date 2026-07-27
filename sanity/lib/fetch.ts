import { client } from "./client";
import {
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  siteSettingsQuery,
} from "./queries";
import type { Post, PostSummary, SiteSettings } from "./types";

/**
 * Janela de revalidação do conteúdo vindo do CMS.
 *
 * Um minuto é o meio-termo: publicar um post aparece no site quase na hora, e
 * ainda assim a grande maioria dos acessos é servida do cache.
 */
const REVALIDATE_SECONDS = 60;

type FetchArgs<T> = {
  query: string;
  params?: Record<string, unknown>;
  /** Valor devolvido quando o CMS não está configurado ou a consulta falha. */
  fallback: T;
};

async function sanityFetch<T>({
  query,
  params = {},
  fallback,
}: FetchArgs<T>): Promise<T> {
  if (!client) return fallback;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    // Degradar é melhor que derrubar a página: uma indisponibilidade do CMS
    // não deveria tirar do ar a home inteira, que é o que recrutador abre.
    // O erro fica no log do servidor para não passar despercebido.
    console.error("[sanity] falha ao consultar o CMS:", error);
    return fallback;
  }
}

export function getPosts() {
  return sanityFetch<PostSummary[]>({ query: postsQuery, fallback: [] });
}

export function getPostSlugs() {
  return sanityFetch<string[]>({ query: postSlugsQuery, fallback: [] });
}

export function getPost(slug: string) {
  return sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    fallback: null,
  });
}

export function getSiteSettings() {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    fallback: null,
  });
}
