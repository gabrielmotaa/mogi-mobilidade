import React from 'react';
import { Home, Bus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, setDirectionFilter } = useApp();

  if (currentScreen === 'splash') return null;

  const handleLinesTabClick = () => {
    // Regra do fluxo: Caso o usuário vá direto para "Linhas", deve aparecer ambos os sentidos.
    setDirectionFilter('all');
    setCurrentScreen('lines');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Início */}
        <button
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center justify-center py-1 px-6 rounded-2xl transition-all ${
            currentScreen === 'home'
              ? 'bg-emerald-100 text-emerald-800 font-extrabold shadow-sm scale-105'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <Home
            className={`w-6 h-6 mb-0.5 ${
              currentScreen === 'home' ? 'text-emerald-700 stroke-[2.5]' : 'text-slate-500'
            }`}
          />
          <span className="text-xs tracking-tight">Início</span>
        </button>

        {/* Tab 2: Linhas */}
        <button
          onClick={handleLinesTabClick}
          className={`flex flex-col items-center justify-center py-1 px-6 rounded-2xl transition-all ${
            currentScreen === 'lines'
              ? 'bg-emerald-100 text-emerald-800 font-extrabold shadow-sm scale-105'
              : 'text-slate-500 hover:text-slate-800 font-semibold'
          }`}
        >
          <Bus
            className={`w-6 h-6 mb-0.5 ${
              currentScreen === 'lines' ? 'text-emerald-700 stroke-[2.5]' : 'text-slate-500'
            }`}
          />
          <span className="text-xs tracking-tight">Linhas</span>
        </button>
      </div>
    </nav>
  );
};
