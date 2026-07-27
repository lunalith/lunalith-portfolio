import { Section } from "@/components/Section";
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";

const channels = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alys-muni",
    href: siteConfig.contact.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "E-mail",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    Icon: MailIcon,
  },
  {
    label: "GitHub",
    value: "github.com/Lunalith",
    href: siteConfig.contact.github,
    Icon: GitHubIcon,
  },
];

export function Contact() {
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
                className="surface-card group flex h-full flex-col gap-3 p-5 transition-colors hover:border-iris"
              >
                <span className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-iris" />
                  <ArrowUpRightIcon className="h-4 w-4 text-muted transition-colors group-hover:text-iris" />
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
