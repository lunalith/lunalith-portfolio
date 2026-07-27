import { Section } from "@/components/Section";
import { aboutParagraphs } from "@/lib/content";

export function About() {
  return (
    <Section id="sobre" title="Sobre">
      <div className="space-y-5">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed text-subtle">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
