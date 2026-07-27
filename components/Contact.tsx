import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/Icons";
import { Section } from "@/components/Section";
import { getResolvedSettings } from "@/lib/settings";

/** Mostra o link sem o protocolo — "linkedin.com/in/..." lê melhor que a URL. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export async function Contact() {
  const { email, github, linkedin } = await getResolvedSettings();

  const channels = [
    {
      label: "LinkedIn",
      value: displayUrl(linkedin),
      href: linkedin,
      Icon: LinkedInIcon,
    },
    {
      label: "E-mail",
      value: email,
      href: `mailto:${email}`,
      Icon: MailIcon,
    },
    {
      label: "GitHub",
      value: displayUrl(github),
      href: github,
      Icon: GitHubIcon,
    },
  ];

  return (
    <Section id="contato" title="Contato">
      <ul className="grid gap-3 sm:grid-cols-3">
        {channels.map(({ label, value, href, Icon }) => {
          const isExternal = !href.startsWith("mailto:");

          return (
            <li key={label}>
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="surface-card group flex h-full flex-col gap-3 p-5 transition-colors hover:border-accent"
              >
                <span className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-accent" />
                  <ArrowUpRightIcon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                </span>
                <span className="text-sm font-medium text-text">{label}</span>
                {/* break-all evita que o e-mail estoure o cartão no mobile. */}
                <span className="break-all font-mono text-xs text-subtle">
                  {value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
