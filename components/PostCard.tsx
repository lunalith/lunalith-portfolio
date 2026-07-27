import Link from "next/link";
import { formatPostDate } from "@/lib/date";
import type { PostSummary } from "@/sanity/lib/types";

/** Corta o resumo sem partir palavra ao meio. */
function truncate(text: string, max = 180) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="surface-card p-6 transition-colors hover:border-accent">
      <Link href={`/blog/${post.slug}`} className="group block">
        <time
          dateTime={post.publishedAt}
          className="font-mono text-xs text-muted"
        >
          {formatPostDate(post.publishedAt)}
        </time>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-3 leading-relaxed text-subtle">
            {truncate(post.excerpt)}
          </p>
        ) : null}
      </Link>

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
    </article>
  );
}
