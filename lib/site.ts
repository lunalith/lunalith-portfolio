/**
 * Fonte única de verdade para os dados fixos do site.
 *
 * Serve tanto para renderizar as seções quanto como fallback do documento
 * `siteSettings` do Sanity — assim o site continua completo e correto mesmo
 * antes do CMS estar configurado ou se a consulta falhar.
 */

export const siteConfig = {
  name: "Alysia",
  role: "Estudante de Ciência da Computação",
  tagline:
    "Estudante de CC apaixonada por segurança da informação, buscando unir tecnologia e proteção de dados no setor bancário",
  description:
    "Portfólio e blog de Alysia — estudante de Ciência da Computação na Unisinos, com foco em segurança da informação, dados e desenvolvimento de IA.",
  /**
   * Usado para gerar URLs absolutas (Open Graph, sitemap, canonical).
   * Na Vercel, defina NEXT_PUBLIC_SITE_URL com o domínio final do projeto.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunalith.dev",
  locale: "pt_BR",
  contact: {
    email: "alysia@lunalith.dev",
    github: "https://github.com/Lunalith",
    linkedin: "https://linkedin.com/in/alys-muni/",
  },
  /** Placeholder: substituir por public/curriculo-alysia.pdf quando existir. */
  resumeUrl: "/curriculo-alysia.pdf",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Habilidades", href: "/#habilidades" },
  { label: "Trajetória", href: "/#trajetoria" },
  // Descomente quando a seção de projetos tiver conteúdo para mostrar.
  // { label: "Projetos", href: "/#projetos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];
