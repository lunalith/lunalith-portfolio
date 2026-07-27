import { NotFoundContent } from "@/components/NotFoundContent";

/**
 * Atende o notFound() disparado dentro do grupo (site) — na prática, um post
 * cujo slug não existe. A navbar e o rodapé já vêm do layout do grupo.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
