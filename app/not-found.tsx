import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NotFoundContent } from "@/components/NotFoundContent";
import { ThemeAccents } from "@/components/ThemeAccents";

/**
 * 404 de qualquer URL que não casa com rota nenhuma.
 *
 * Este limite fica acima do grupo (site), então não herda o layout dele — a
 * navbar e o rodapé precisam ser montados aqui para a página não sair solta.
 */
export default function NotFound() {
  return (
    <>
      <ThemeAccents />
      <Navbar />
      <main className="flex-1 pt-16">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
