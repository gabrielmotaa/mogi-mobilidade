import React from 'react';
import { Bus, MapPin, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { statusMessage } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1a237e_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Badge */}
      <div className="pt-8 z-10 flex items-center gap-2">
        <div className="bg-mogi-blue p-2 rounded-xl text-white shadow-lg">
          <Bus className="w-7 h-7" />
        </div>
      </div>

      {/* Central Visual & Radar Animation */}
      <div className="flex flex-col items-center justify-center my-auto z-10 w-full max-w-sm text-center">
        <h1 className="text-3xl font-extrabold text-mogi-blue mb-8 tracking-tight">
          Mogi Mobilidade
        </h1>

        <div className="relative flex items-center justify-center w-64 h-64 mb-8">
          {/* Radar Circles */}
          <div className="absolute inset-0 bg-mogi-blue/10 rounded-full animate-radar" />
          <div className="absolute inset-4 bg-mogi-blue/15 rounded-full" />
          <div className="absolute inset-10 bg-mogi-blue/20 rounded-full shadow-inner" />

          {/* Map Pin Marker */}
          <div className="absolute top-12 right-12 text-mogi-blue animate-bounce">
            <MapPin className="w-7 h-7 fill-mogi-blue" />
          </div>

          {/* Central Location Circle Indicator */}
          <div className="w-28 h-28 bg-white/90 backdrop-blur border-2 border-mogi-blue/30 rounded-full flex items-center justify-center shadow-xl z-20">
            <Bus className="w-12 h-12 text-mogi-blue" />
          </div>
        </div>

        {/* Loading Spinner & Status Text */}
        <div className="flex items-center justify-center gap-2 text-mogi-blue font-bold text-xl mb-2">
          <Loader2 className="w-6 h-6 animate-spin text-mogi-blue" />
          <span>Detectando sua localização...</span>
        </div>

        <p className="text-slate-600 font-medium text-base px-4">
          {statusMessage || 'Coletando rotas e horários para o seu ponto atual.'}
        </p>
      </div>

      {/* Footer Branding Disclaimer */}
      <div className="pb-6 z-10 text-center">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Mogi das Cruzes • Mobilidade Urbana
        </span>
      </div>
    </div>
  );
};
