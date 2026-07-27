"use client";

import Link from "next/link";
import { useState } from "react";
import { RabbitMark } from "@/components/RabbitMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems, siteConfig } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function Navbar() {
  // Cada link do painel mobile fecha o menu no próprio onClick — em links de
  // âncora a rota não muda, então o painel aberto acabaria cobrindo justamente
  // a seção que a pessoa pediu.
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-overlay veil backdrop-blur-md">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-text transition-colors hover:text-iris"
        >
          <RabbitMark className="h-6 w-6 text-iris" />
          <span className="text-base font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-subtle transition-colors hover:bg-overlay hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-overlay bg-surface text-subtle transition-colors hover:border-iris hover:text-iris md:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div id="menu-mobile" className="border-t border-overlay bg-base md:hidden">
          <ul className="mx-auto flex w-full max-w-5xl flex-col px-6 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-sm text-subtle transition-colors hover:bg-overlay hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
