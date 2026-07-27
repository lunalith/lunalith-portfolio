import { RabbitMark } from "@/components/RabbitMark";
import { getResolvedSettings } from "@/lib/settings";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const { email, github, linkedin } = await getResolvedSettings();

  const links = [
    { label: "GitHub", href: github },
    { label: "LinkedIn", href: linkedin },
    { label: "E-mail", href: `mailto:${email}` },
  ];

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
          {links.map((link) => {
            const isExternal = !link.href.startsWith("mailto:");

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-sm text-subtle transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
