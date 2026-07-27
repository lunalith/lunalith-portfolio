import type { StructureResolver } from "sanity/structure";

/**
 * Menu lateral do Studio.
 *
 * "Configurações do site" é tratado como documento único (singleton): abre
 * direto no formulário, em vez de mostrar uma lista onde daria para criar um
 * segundo documento do mesmo tipo por engano.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Posts")
        .child(
          S.documentTypeList("post")
            .title("Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.divider(),
      S.listItem()
        .title("Configurações do site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
