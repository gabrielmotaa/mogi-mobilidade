/**
 * Tipos para o arquivo JSON de rotas de ônibus da prefeitura.
 * Raiz do arquivo: { linhas: LinhaResumo[]; itinerarios: Record<string, RuaItinerarios> }
 */

/** Item da lista `linhas` (nível raiz do arquivo). */
export interface LinhaResumo {
  linha: string;
  nome: string;
  /** Horários/pontos de partida no sentido A */
  partida_a: string[];
  /** Horários/pontos de partida no sentido B */
  partida_b: string[];
}

/**
 * Versão mínima da linha, usada dentro de cada rua em `itinerarios[rua].linhas`.
 * Só tem os dois campos identificadores (sem partida_a/b, sem os demais detalhes).
 */
export interface LinhaMinima {
  linha: string;
  nome: string;
}

/**
 * Dados completos da linha, aninhados dentro de cada item de `itinerarios[rua].itinerarios`.
 * Note que é uma estrutura diferente de LinhaResumo (mais campos, sem partida_a/b).
 */
export interface LinhaDetalhada {
  id: number;
  created_at: string; // ISO datetime como string
  updated_at: string; // ISO datetime como string
  linha: string;
  integracao: string;
  sentido: string;
  dias: string;
  nome: string;
  empresa: string;
  regiao: string;
  obs: string | null;
  ponto_a: string;
  ponto_b: string;
  apelido: string;
  saida: string;
  status: string;
  bilhetagem: string;
  atualizacao: string | null;
  zp: string;
}

/** Item da lista `itinerarios`. */
export interface Itinerario {
  id: number;
  linha: LinhaDetalhada;
  ordem: number;
  logradouro: string;
  bairro: string | null;
  obs: string;
  sentido: string;
  leg: number;
  mapa: null;
  ponto: null;
  data: null;
  os: null;
  created_at: string;
  updated_at: string;
  cod_viario: number | null;
  trajeto: string | null;
}

/**
 * Bloco de dados de uma rua específica dentro de `itinerarios`.
 * Ex.: itinerarios["Rua Rodesia"]
 */
export interface RuaItinerarios {
  linhas: LinhaMinima[];
  itinerarios: Itinerario[];
}

/** Estrutura raiz do arquivo JSON retornado pela API da prefeitura. */
export interface RotasOnibusData {
  linhas: LinhaResumo[];
  /** Chave = nome da rua/logradouro (ex.: "Rua Rodesia") */
  itinerarios: Record<string, RuaItinerarios>;
}

// ----------------------------------------------------
// Tipos de Estado Interno da Aplicação Mogi Mobilidade
// ----------------------------------------------------

export type DirectionFilter = 'centro' | 'bairro' | 'all';
export type AppScreen = 'splash' | 'home' | 'lines';

export interface UserLocationState {
  streetName: string;
  lat: number | null;
  lng: number | null;
  isGranted: boolean;
  isLoading: boolean;
  error: string | null;
  isManual: boolean;
}

export interface ProcessedBusArrival {
  linhaCodigo: string; // ex: "C402"
  linhaNome: string;   // ex: "Estação de Braz Cubas"
  viaSummary: string;  // ex: "Via Terminal Central" ou "Via Av. Manoel Bezerra"
  sentidoNormalizado: 'centro' | 'bairro'; // categorização simplificada
  sentidoOriginal: string; // string original da API (ex: "Sentido Centro", "Bairro", "Ponto A")
  minutosRestantes: number; // ex: 8
  horarioSaida: string;   // ex: "14:15"
  statusBadge: 'EM TRÂNSITO' | 'CHEGANDO' | 'PREVISTO' | 'REGULAR';
  statusColorClass: string;
}
