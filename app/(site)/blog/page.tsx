import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Textos sobre experiências, especializações e trajetória de estudo em segurança da informação e dados.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  // Já vêm ordenados por data decrescente na própria consulta GROQ.
  const posts = await getPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
      <div className="mt-3 h-px w-12 bg-accent" />
      <p className="mt-6 max-w-2xl leading-relaxed text-subtle">
        Anotações sobre o que venho estudando: segurança da informação, dados e
        o que aprendo na prática ao longo da graduação.
      </p>

      {posts.length === 0 ? (
        <p className="surface-card mt-10 p-6 text-subtle">
          Ainda não há posts publicados por aqui. Em breve.
        </p>
      ) : (
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
