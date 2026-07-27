import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

/**
 * Casca comum das seções da home: âncora, largura e ritmo vertical iguais em
 * todas, para que a página tenha uma cadência previsível ao rolar.
 */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20"
    >
      <h2
        id={`${id}-titulo`}
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-3 h-px w-12 bg-iris" />
      <div className="mt-8">{children}</div>
    </section>
  );
}
