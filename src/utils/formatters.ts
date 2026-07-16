/**
 * Limpa visualmente o nome de uma rua para exibição ao usuário,
 * removendo entidades como "&nbsp;", "\u00a0" e múltiplos espaços sem alterar os dados internos.
 */
export function formatStreetName(street: string): string {
  if (!street) return '';
  return street
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
