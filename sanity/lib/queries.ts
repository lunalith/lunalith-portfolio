import { defineQuery } from "next-sanity";

/**
 * `defined(slug.current)` filtra rascunhos sem endereço — sem isso um post pela
 * metade quebraria a geração de rotas estáticas do blog.
 */
const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "excerpt": coalesce(excerpt, pt::text(body[0])),
  tags
`;

export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc) {
      ${postFields}
    }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)].slug.current
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    shortBio,
    email,
    github,
    linkedin,
    themeColors
  }
`);
