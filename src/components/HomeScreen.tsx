import React from 'react';
import { Navigation, Building2, Home as HomeIcon, Edit3, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from './Header';

export const HomeScreen: React.FC = () => {
  const {
    locationState,
    selectDirectionAndNavigate,
    setIsManualModalOpen,
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      <Header />

      <main className="flex-1 px-4 py-5 max-w-md mx-auto w-full flex flex-col justify-between gap-5">
        {/* Top Block: Location Card */}
        <div className="flex flex-col gap-4">
          {/* Minimalist & High-Contrast Location Display Card */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm flex items-center gap-3.5">
            <div className="bg-mogi-blue text-white p-3.5 rounded-2xl shadow-md flex-shrink-0">
              <Navigation className="w-6 h-6 rotate-45 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Localização Atual
              </p>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug break-words mt-0.5">
                Você está na <span className="text-mogi-blue block">{locationState.streetName}</span>
              </h2>
            </div>
          </div>

          {/* Heading Prompt */}
          <div className="text-center pt-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Para qual sentido você deseja ir?
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Toque na opção que descreve o seu destino final.
            </p>
          </div>
        </div>

        {/* Middle Block: Main Direction Selection Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Ir para o Centro */}
          <button
            onClick={() => selectDirectionAndNavigate('centro')}
            className="w-full text-left bg-mogi-green hover:bg-mogi-darkGreen text-white rounded-3xl p-5 shadow-lg active:scale-[0.98] transition-all flex items-stretch gap-4 group focus:ring-4 focus:ring-green-400 focus:outline-none"
          >
            <div className="bg-white/20 p-3.5 rounded-2xl flex items-center justify-center self-start flex-shrink-0">
              <Building2 className="w-9 h-9 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight leading-tight">
                  Ir para o Centro
                </span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              <p className="text-sm font-medium text-green-50 mt-1.5 leading-snug">
                Sentido <strong className="underline decoration-2">Terminal Central</strong>, Estação de Trem e Poupatempo.
              </p>
            </div>
          </button>

          {/* Card 2: Ir para o Bairro */}
          <button
            onClick={() => selectDirectionAndNavigate('bairro')}
            className="w-full text-left bg-mogi-badgeBlue hover:bg-mogi-blue text-white rounded-3xl p-5 shadow-lg active:scale-[0.98] transition-all flex items-stretch gap-4 group focus:ring-4 focus:ring-blue-400 focus:outline-none"
          >
            <div className="bg-white/20 p-3.5 rounded-2xl flex items-center justify-center self-start flex-shrink-0">
              <HomeIcon className="w-9 h-9 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight leading-tight">
                  Ir para o Bairro
                </span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
              <p className="text-sm font-medium text-blue-100 mt-1.5 leading-snug">
                Sentido <strong className="underline decoration-2">Braz Cubas</strong>, Jundiapeba ou Cezar de Souza.
              </p>
            </div>
          </button>
        </div>

        {/* Bottom Block: Change Street Card (Replaces former 'Ver Ambos os Sentidos' card) */}
        <div className="flex flex-col gap-3 pt-1">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="w-full text-left bg-white hover:bg-slate-100 text-slate-800 rounded-3xl p-4 border-2 border-slate-200 shadow-sm transition-all flex items-center justify-between group active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 p-2.5 rounded-2xl text-mogi-blue group-hover:bg-blue-100">
                <Edit3 className="w-6 h-6 text-mogi-blue" />
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-900 block leading-tight">
                  Mudar de Rua Manualmente
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Digite ou selecione outra via de Mogi das Cruzes
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-mogi-blue transition-all flex-shrink-0" />
          </button>
        </div>
      </main>
    </div>
  );
};
