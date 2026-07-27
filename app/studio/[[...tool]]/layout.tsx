/**
 * O Studio ocupa a tela inteira e traz o próprio tema.
 *
 * Este layout existe para isolá-lo do layout do site: sem navbar, sem rodapé.
 * O wrapper com altura de viewport é o que o Studio precisa para esticar —
 * o body do site é flex-col e não daria altura a ele sozinho.
 */
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-dvh">{children}</div>;
}
