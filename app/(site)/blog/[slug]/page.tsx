import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/Icons";
import { PostBody } from "@/components/PostBody";
import { formatPostDate } from "@/lib/date";
import { getPost, getPostSlugs } from "@/sanity/lib/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pré-gera as rotas dos posts existentes no build.
 *
 * Sem projeto do Sanity configurado a lista vem vazia — e aí nenhuma rota é
 * pré-gerada, o que é o comportamento correto para um blog sem posts.
 */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Post não encontrado" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt,
      tags: post.tags ?? undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-subtle transition-colors hover:text-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Voltar para o blog
      </Link>

      <header className="mt-8">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-xs text-muted"
        >
          {formatPostDate(post.publishedAt)}
        </time>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.tags?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-overlay px-2 py-1 font-mono text-xs text-accent-2"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-10">
        <PostBody value={post.body} />
      </div>
    </article>
  );
}
