/**
 * Formata a data de um post em português.
 *
 * O timeZone fixo em UTC é intencional: o Sanity guarda a data em UTC e, sem
 * fixar, servidor e navegador poderiam renderizar dias diferentes — o que dá
 * erro de hidratação e, perto da meia-noite, mostra a data errada.
 */
export function formatPostDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
