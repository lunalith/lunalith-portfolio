import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * Cliente de leitura do site.
 *
 * `null` enquanto o projeto no Sanity não estiver configurado — quem consome
 * passa por sanityFetch, que devolve o fallback nesse caso em vez de quebrar.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // CDN do Sanity: respostas em cache, sem custo de API por request.
      // O conteúdo é público e a revalidação do Next já cobre a atualização.
      useCdn: true,
      perspective: "published",
    })
  : null;
