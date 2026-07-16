import type { RotasOnibusData, ProcessedBusArrival, DirectionFilter } from '../types/bus';

/**
 * Filtra e calcula as saídas/chegadas iminentes de ônibus com base na rua selecionada,
 * no sentido escolhido e no horário atual.
 */
export function getBusArrivalsForStreet(
  data: RotasOnibusData,
  streetName: string,
  directionFilter: DirectionFilter
): ProcessedBusArrival[] {
  const result: ProcessedBusArrival[] = [];

  if (!data || !data.linhas) return result;

  // 1. Localizar chave de itinerário correspondente à rua
  const streetKeys = Object.keys(data.itinerarios || {});
  let matchedStreetKey = streetKeys.find(
    (key) => key.toLowerCase() === streetName.toLowerCase()
  );

  // Se não encontrar exato, busca parcial por palavras-chave
  if (!matchedStreetKey) {
    matchedStreetKey = streetKeys.find((key) =>
      key.toLowerCase().includes('deodato') || key.toLowerCase().includes('centro')
    );
  }

  const ruaData = matchedStreetKey ? data.itinerarios[matchedStreetKey] : null;
  const activeLinesOnStreet = ruaData?.linhas || [];

  // Se a rua tiver linhas cadastradas no itinerário, filtramos por elas; senão usamos todas as linhas gerais
  const linesToProcess = activeLinesOnStreet.length > 0
    ? data.linhas.filter(l => activeLinesOnStreet.some(m => m.linha === l.linha))
    : data.linhas;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  linesToProcess.forEach((linha) => {
    // 2. Processar Sentido A (Centro)
    if (directionFilter === 'centro' || directionFilter === 'all') {
      if (Array.isArray(linha.partida_a) && linha.partida_a.length > 0) {
        const arrivalA = processSchedules(
          linha.linha,
          linha.nome,
          linha.partida_a,
          'centro',
          'Sentido: Centro',
          currentMinutes
        );
        if (arrivalA) result.push(arrivalA);
      }
    }

    // 3. Processar Sentido B (Bairro)
    if (directionFilter === 'bairro' || directionFilter === 'all') {
      if (Array.isArray(linha.partida_b) && linha.partida_b.length > 0) {
        const arrivalB = processSchedules(
          linha.linha,
          linha.nome,
          linha.partida_b,
          'bairro',
          'Sentido: Bairro',
          currentMinutes
        );
        if (arrivalB) result.push(arrivalB);
      }
    }
  });

  // 4. Ordenação pelo menor tempo restante para a próxima viagem (mais iminente primeiro)
  result.sort((a, b) => a.minutosRestantes - b.minutosRestantes);

  return result;
}

function processSchedules(
  linhaCodigo: string,
  linhaNome: string,
  partidas: string[],
  sentidoNormalizado: 'centro' | 'bairro',
  sentidoOriginal: string,
  currentMinutes: number
): ProcessedBusArrival | null {
  if (!partidas || partidas.length === 0) return null;

  // Encontrar o próximo horário programado mais próximo
  let nextDepartureMinutes = Infinity;
  let nextDepartureStr = '';

  for (const timeStr of partidas) {
    // Trata horários em formato HH:MM:SS ou HH:MM
    const parts = timeStr.split(':').map(Number);
    if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) continue;

    const [h, m] = parts;
    const departureMinutes = h * 60 + m;
    let diff = departureMinutes - currentMinutes;

    // Se o horário já passou hoje, considerar para o próximo ciclo de 24h (+1440 min)
    if (diff < 0) {
      diff += 1440;
    }

    if (diff < nextDepartureMinutes) {
      nextDepartureMinutes = diff;
      // Formata como HH:MM para exibição limpa
      const formattedH = h.toString().padStart(2, '0');
      const formattedM = m.toString().padStart(2, '0');
      nextDepartureStr = `${formattedH}:${formattedM}`;
    }
  }

  // Se não houver horário válido encontrado, não exibe este sentido para a linha
  if (nextDepartureMinutes === Infinity) {
    return null;
  }

  // Extração amigável de via do nome (ex: "Estação de Braz Cubas via Terminal Central")
  let cleanNome = linhaNome;
  let viaSummary = 'Via Principal';
  if (linhaNome.includes('via')) {
    const parts = linhaNome.split('via');
    cleanNome = parts[0].trim();
    viaSummary = `Via ${parts[1].trim()}`;
  }

  return {
    linhaCodigo,
    linhaNome: cleanNome,
    viaSummary,
    sentidoNormalizado,
    sentidoOriginal,
    minutosRestantes: nextDepartureMinutes,
    horarioSaida: nextDepartureStr,
    statusBadge: 'PREVISTO',
    statusColorClass: '',
  };
}
