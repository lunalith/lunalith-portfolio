import { defineField, defineType } from "sanity";

/**
 * Nomes dos tokens da paleta Rosé Pine que podem virar cor de destaque.
 *
 * É uma lista fechada, e não um seletor de cor livre, porque o site é vitrine
 * profissional: qualquer combinação escolhida aqui continua legível nos dois
 * temas. Para liberar cores arbitrárias, troque `options.list` por um campo de
 * texto com validação de hex — e aí o contraste passa a ser responsabilidade
 * de quem edita.
 */
const ACCENT_OPTIONS = [
  { title: "Iris (lilás)", value: "iris" },
  { title: "Foam (azul claro)", value: "foam" },
  { title: "Gold (dourado)", value: "gold" },
  { title: "Love (rosa)", value: "love" },
  { title: "Pine (azul escuro)", value: "pine" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  // O bloqueio de documento único (sem criar/duplicar/apagar) fica em
  // sanity.config.ts — no Sanity 6 isso é configurado por `document.actions`.
  groups: [
    { name: "conteudo", title: "Conteúdo", default: true },
    { name: "contato", title: "Contato" },
    { name: "tema", title: "Tema" },
  ],
  fields: [
    defineField({
      name: "shortBio",
      title: "Bio curta",
      type: "text",
      rows: 3,
      group: "conteudo",
      description:
        "Frase de posicionamento exibida no topo da home. Se ficar vazia, o site usa o texto padrão do código.",
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      group: "contato",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      group: "contato",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      group: "contato",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "themeColors",
      title: "Cores do tema",
      type: "object",
      group: "tema",
      description:
        "Trocam os destaques do site sem mexer no código. O fundo e o texto seguem fixos na paleta Rosé Pine.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "accent",
          title: "Destaque principal (links e botões)",
          type: "string",
          options: { list: ACCENT_OPTIONS },
          initialValue: "iris",
        }),
        defineField({
          name: "accentSecondary",
          title: "Destaque secundário (tags)",
          type: "string",
          options: { list: ACCENT_OPTIONS },
          initialValue: "foam",
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configurações do site" }),
  },
});
