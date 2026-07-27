import Link from "next/link";
import { ArrowLeftIcon } from "@/components/Icons";
import { RabbitMark } from "@/components/RabbitMark";

/**
 * Conteúdo da página 404, compartilhado pelos dois limites de erro do app:
 * o do grupo (site) — que atende o notFound() de um post inexistente — e o da
 * raiz, que atende qualquer URL que não casa com rota nenhuma.
 */
export function NotFoundContent() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-6 py-24">
      <RabbitMark className="h-10 w-10 text-accent" />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        Página não encontrada
      </h1>

      <p className="mt-4 max-w-lg leading-relaxed text-subtle">
        O endereço acessado não existe ou foi movido.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm text-subtle transition-colors hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar para a home
      </Link>
    </div>
  );
}
