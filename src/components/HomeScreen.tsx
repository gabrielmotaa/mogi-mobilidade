import React from 'react';
import { Navigation, Building2, Home as HomeIcon, Edit3, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Header } from './Header';

export const HomeScreen: React.FC = () => {
  const { locationState, selectDirectionAndNavigate, setIsManualModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      <Header />

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full flex flex-col gap-6">
        {/* Location Display Card */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="bg-mogi-blue text-white p-3 rounded-xl shadow">
            <Navigation className="w-6 h-6 rotate-45" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block">
              Localização Atual
            </span>
            <p className="text-base text-slate-900 leading-tight mt-0.5">
              Você está na{' '}
              <strong className="font-bold text-mogi-blue block text-lg truncate">
                {locationState.streetName}
              </strong>
            </p>
          </div>
        </div>

        {/* Heading Prompt */}
        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-slate-900">
            Para qual sentido você deseja ir?
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Toque na opção que descreve o seu destino final.
          </p>
        </div>

        {/* High-Accessibility Action Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1: Ir para o Centro */}
          <button
            onClick={() => selectDirectionAndNavigate('centro')}
            className="w-full text-left bg-mogi-green hover:bg-mogi-darkGreen text-white rounded-3xl p-5 shadow-lg active:scale-[0.98] transition-all flex items-stretch gap-4 group focus:ring-4 focus:ring-green-400 focus:outline-none"
          >
            <div className="bg-white/20 p-3 rounded-2xl flex items-center justify-center self-start">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight leading-tight">
                  Ir para o Centro
                </span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-medium text-green-50 mt-1">
                Sentido <strong className="underline">Terminal Central</strong>, Estação de Trem e Poupatempo.
              </p>
            </div>
          </button>

          {/* Card 2: Ir para o Bairro */}
          <button
            onClick={() => selectDirectionAndNavigate('bairro')}
            className="w-full text-left bg-mogi-badgeBlue hover:bg-mogi-blue text-white rounded-3xl p-5 shadow-lg active:scale-[0.98] transition-all flex items-stretch gap-4 group focus:ring-4 focus:ring-blue-400 focus:outline-none"
          >
            <div className="bg-white/20 p-3 rounded-2xl flex items-center justify-center self-start">
              <HomeIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight leading-tight">
                  Ir para o Bairro
                </span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm font-medium text-blue-100 mt-1">
                Sentido <strong className="underline">Braz Cubas</strong>, Jundiapeba ou Cezar de Souza.
              </p>
            </div>
          </button>
        </div>

        {/* Change Street Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-2 text-mogi-blue hover:text-mogi-badgeBlue font-bold text-base px-4 py-3 rounded-xl border border-mogi-blue/20 bg-blue-50/50 hover:bg-blue-100/50 transition-colors focus:ring-2 focus:ring-mogi-blue"
          >
            <Edit3 className="w-5 h-5 text-mogi-blue" />
            <span>Mudar de rua manualmente</span>
          </button>
        </div>
      </main>
    </div>
  );
};
