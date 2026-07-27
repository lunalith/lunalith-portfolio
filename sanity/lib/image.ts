import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Monta a URL de uma imagem do Sanity já redimensionada e no formato mais leve
 * que o navegador aceitar (`auto('format')` entrega WebP/AVIF quando dá).
 *
 * Devolve `null` quando não há asset — é o que permite pular a renderização em
 * vez de emitir um <img> quebrado.
 */
export function urlForImage(source: SanityImageSource | undefined) {
  if (!source) return null;
  return builder.image(source).auto("format").fit("max");
}
