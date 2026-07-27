import { RabbitMark } from "@/components/RabbitMark";
import { siteConfig } from "@/lib/site";

const links = [
  { label: "GitHub", href: siteConfig.contact.github },
  { label: "LinkedIn", href: siteConfig.contact.linkedin },
  { label: "E-mail", href: `mailto:${siteConfig.contact.email}` },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-overlay">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted">
          <RabbitMark className="h-5 w-5" />
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>

        <ul className="flex items-center gap-5">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm text-subtle transition-colors hover:text-iris"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
