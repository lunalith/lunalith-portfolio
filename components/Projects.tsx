import { ArrowUpRightIcon } from "@/components/Icons";
import { Section } from "@/components/Section";

/**
 * Seção de projetos — pronta, mas ainda desligada.
 *
 * Para ativar:
 *   1. preencha a lista `projects` abaixo;
 *   2. descomente `<Projects />` em app/(site)/page.tsx;
 *   3. descomente o item "Projetos" em lib/site.ts (navItems).
 */

type Project = {
  name: string;
  description: string;
  /** Tecnologias exibidas como tags monoespaçadas. */
  stack: string[];
  /** Repositório, demo ou artigo. Opcional. */
  href?: string;
};

const projects: Project[] = [];

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <Section id="projetos" title="Projetos">
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.name}>
            <article className="surface-card group flex h-full flex-col p-6 transition-colors hover:border-accent">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium text-text">{project.name}</h3>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-accent"
                    aria-label={`Abrir ${project.name}`}
                  >
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-subtle">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-overlay px-2 py-1 font-mono text-xs text-accent-2"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
