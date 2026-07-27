import { Section } from "@/components/Section";
import { skills } from "@/lib/content";

export function Skills() {
  return (
    <Section id="habilidades" title="Habilidades">
      {/* Lista simples, sem categorias: para incluir uma nova habilidade basta
          adicionar a string em lib/content.ts. */}
      <ul className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-lg border border-overlay bg-surface px-4 py-2 font-mono text-sm text-accent-2"
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
