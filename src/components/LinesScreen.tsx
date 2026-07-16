import React, { useMemo } from 'react';
import { Bus, Clock, Navigation, ArrowLeftRight, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from './Header';
import { getBusArrivalsForStreet } from '../services/busParser';

/**
 * Formata o tempo restante de forma amigável:
 * - Menos de 60 min: "15 min"
 * - 60 min ou mais: "1h 15min", "20h 57min", "2h"
 */
function formatRemainingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (remainingMins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMins}min`;
}

export const LinesScreen: React.FC = () => {
  const {
    directionFilter,
    locationState,
    busRoutesData,
    setCurrentScreen,
    setDirectionFilter,
  } = useApp();

  // Calcular horários iminentes baseados nos dados da API, rua e filtro ativo
  const busArrivals = useMemo(() => {
    if (!busRoutesData) return [];
    return getBusArrivalsForStreet(busRoutesData, locationState.streetName, directionFilter);
  }, [busRoutesData, locationState.streetName, directionFilter]);

  const getDirectionTitle = () => {
    if (directionFilter === 'centro') return 'Centro';
    if (directionFilter === 'bairro') return 'Bairro';
    return 'Ambos os Sentidos';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      <Header />

      <main className="flex-1 px-4 py-5 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Active Filter Header */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-mogi-blue">
            <Bus className="w-7 h-7 flex-shrink-0" />
            <h2 className="text-xl font-bold tracking-tight">
              Ônibus passando agora sentido:{' '}
              <span className="text-mogi-green font-extrabold capitalize block sm:inline mt-1 sm:mt-0">
                {getDirectionTitle()}
              </span>
            </h2>
          </div>

        </div>

        {/* Location Banner inside Lines Screen */}
        <div className="bg-slate-200/80 border border-slate-300 rounded-xl p-3.5 flex items-center gap-2.5 text-slate-800">
          <Navigation className="w-5 h-5 text-mogi-blue flex-shrink-0" />
          <p className="text-base font-medium truncate">
            Sua localização:{' '}
            <strong className="text-slate-900 font-bold">{locationState.streetName}</strong>
          </p>
        </div>

        {/* Bus Arrivals Cards List */}
        {
          busArrivals.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 my-4 shadow-sm flex flex-col items-center">
              <AlertCircle className="w-12 h-12 text-slate-400 mb-2" />
              <p className="font-bold text-slate-700 text-xl">Nenhuma linha encontrada</p>
              <p className="text-slate-500 text-base mt-1">
                Não foram encontradas viagens programadas para esta localização no momento.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {busArrivals.map((bus, idx) => (
                <div
                  key={`${bus.linhaCodigo}-${idx}`}
                  className="bg-white border-2 border-slate-200 hover:border-mogi-blue/40 rounded-3xl p-5 shadow-sm transition-all flex flex-col gap-3"
                >
                  {/* Header Row: Badge Code on Left, Arrival Countdown on Right */}
                  <div className="flex items-center justify-between">
                    <div className="bg-mogi-blue text-white font-black text-2xl px-4 py-2 rounded-2xl shadow-sm tracking-wider">
                      {bus.linhaCodigo}
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-700 font-black text-2xl">
                      <Clock className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <span>{formatRemainingTime(bus.minutosRestantes)}</span>
                    </div>
                  </div>

                  {/* Middle Row: Full Destination Name (Large, complete text, no truncation!) */}
                  <div className="pt-1">
                    <h3 className="text-xl font-extrabold text-slate-900 leading-snug break-words">
                      {bus.linhaNome}
                    </h3>
                  </div>

                  {/* Bottom Row: Via & Scheduled Departure Time */}
                  <div className="flex items-center justify-between text-slate-600 border-t border-slate-100 pt-3 mt-1">
                    <span className="text-sm font-semibold text-slate-600">
                      {bus.viaSummary}
                    </span>
                    <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
                      Saída: {bus.horarioSaida}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        {/* Change Direction Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              setDirectionFilter('all');
              setCurrentScreen('home');
            }}
            className="w-full bg-mogi-blue hover:bg-mogi-badgeBlue text-white font-black text-lg py-4 px-5 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all focus:ring-4 focus:ring-blue-300"
          >
            <ArrowLeftRight className="w-6 h-6 text-white" />
            <span>Voltar / Mudar Sentido</span>
          </button>
        </div>
      </main >
    </div >
  );
};
