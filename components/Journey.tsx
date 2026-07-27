import { Section } from "@/components/Section";
import { journeyParagraphs } from "@/lib/content";

export function Journey() {
  return (
    <Section id="trajetoria" title="Trajetória">
      <div className="space-y-5">
        {journeyParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed text-subtle">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
