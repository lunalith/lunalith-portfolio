import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Endereço do post. Clique em “Generate” para criar a partir do título.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      // Ordena a listagem do blog; sem data o post não teria onde entrar.
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      rows: 3,
      description:
        "Opcional. Aparece na lista de posts e na prévia do link. Se ficar vazio, o site usa o começo do corpo.",
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "body",
      title: "Corpo",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              description: "Descreve a imagem para leitores de tela e buscadores.",
            }),
          ],
        }),
        defineArrayMember({
          name: "code",
          title: "Trecho de código",
          type: "object",
          fields: [
            defineField({ name: "language", title: "Linguagem", type: "string" }),
            defineField({
              name: "code",
              title: "Código",
              type: "text",
              rows: 8,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "language", subtitle: "code" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Código",
              subtitle: (subtitle as string | undefined)?.split("\n")[0],
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: "Mais recentes primeiro",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle
        ? new Date(subtitle as string).toLocaleDateString("pt-BR")
        : "Sem data",
    }),
  },
});
