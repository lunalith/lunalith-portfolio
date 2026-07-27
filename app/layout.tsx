import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Inter para títulos e corpo; JetBrains Mono só em detalhes pontuais
// (tags de tecnologia, trechos de código). Ambas via next/font, que baixa e
// serve as fontes do próprio domínio — sem request extra ao Google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase resolve as URLs relativas de Open Graph para absolutas —
  // sem ele, as prévias de link no LinkedIn e no WhatsApp quebram.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Segurança da Informação e Dados`,
    // As páginas internas só informam o próprio título; o sufixo vem daqui.
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.contact.github }],
  keywords: [
    "segurança da informação",
    "cybersecurity",
    "ciência da computação",
    "dados",
    "Python",
    "portfólio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Segurança da Informação e Dados`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Segurança da Informação e Dados`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  // Acompanha o tema ativo para tingir a barra de endereço no mobile.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#232136" },
    { media: "(prefers-color-scheme: light)", color: "#faf4ed" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning é exigido pelo next-themes: ele escreve a classe
    // do tema no <html> antes da hidratação, divergindo do HTML do servidor.
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
