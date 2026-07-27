import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeAccents } from "@/components/ThemeAccents";

/**
 * Layout das páginas públicas.
 *
 * O Studio do Sanity fica fora deste grupo de rotas de propósito: ele ocupa a
 * tela inteira e não deve herdar a navbar nem o rodapé do site.
 */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeAccents />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-text"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      {/* pt-16 compensa a altura da navbar fixa (h-16). */}
      <main id="conteudo" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
