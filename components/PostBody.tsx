import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { PostBody as PostBodyType } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-relaxed text-subtle">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight text-text">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold tracking-tight text-text">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-subtle">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-subtle">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-subtle">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded bg-overlay px-1.5 py-0.5 font-mono text-sm text-accent-2">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      // Links externos abrem em nova aba; internos seguem na mesma.
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-4 transition-colors hover:text-love"
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const builder = urlForImage(value);
      if (!builder) return null;

      return (
        <figure className="mt-8">
          <Image
            src={builder.width(1600).url()}
            alt={value?.alt ?? ""}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-xl border border-overlay"
          />
          {value?.alt ? (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },

    code: ({ value }) => (
      <figure className="mt-6">
        {value?.language ? (
          <figcaption className="mb-1 font-mono text-xs uppercase tracking-wider text-muted">
            {value.language}
          </figcaption>
        ) : null}
        <pre className="surface-card overflow-x-auto p-4">
          <code className="font-mono text-sm text-subtle">{value.code}</code>
        </pre>
      </figure>
    ),
  },
};

export function PostBody({ value }: { value: PostBodyType }) {
  return <PortableText value={value} components={components} />;
}
