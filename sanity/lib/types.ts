import type { PortableTextBlock } from "next-sanity";

export type PostImage = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
};

export type CodeBlock = {
  _type: "code";
  _key: string;
  language?: string;
  code: string;
};

export type PostBody = Array<PortableTextBlock | PostImage | CodeBlock>;

/** Campos usados na listagem — o corpo não vem, para não pesar a consulta. */
export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string | null;
  tags: string[] | null;
};

export type Post = PostSummary & {
  body: PostBody;
};

export type AccentToken = "iris" | "foam" | "gold" | "love" | "pine";

export type SiteSettings = {
  shortBio: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  themeColors: {
    accent: AccentToken | null;
    accentSecondary: AccentToken | null;
  } | null;
};
