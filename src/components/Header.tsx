import React from 'react';
import { MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 shadow-sm flex items-center gap-3">
      <div className="bg-mogi-blue p-2 rounded-xl text-white shadow-md">
        <MapPin className="w-6 h-6 fill-current text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-mogi-blue leading-none">
          Mogi Mobilidade
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Ônibus em Tempo Real • Mogi das Cruzes
        </p>
      </div>
    </header>
  );
};
