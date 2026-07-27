type RabbitMarkProps = {
  className?: string;
};

/**
 * Assinatura visual do site: um coelho em traço simples.
 *
 * Herda `currentColor`, então acompanha a cor do elemento pai em qualquer tema.
 * Placeholder — a versão definitiva da marca pode substituir só este arquivo.
 */
export function RabbitMark({ className }: RabbitMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="9.4" cy="7" rx="1.9" ry="4.6" transform="rotate(-14 9.4 7)" />
      <ellipse cx="14.6" cy="7" rx="1.9" ry="4.6" transform="rotate(14 14.6 7)" />
      <circle cx="12" cy="16" r="5" />
      <circle cx="10.2" cy="15.3" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="15.3" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}
