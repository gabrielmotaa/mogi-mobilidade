import React, { useState, useMemo } from 'react';
import { Search, MapPin, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatStreetName } from '../utils/formatters';

const PRESET_STREETS = [
  'Rua Dr. Deodato Wertheimer',
  'Av. Voluntário Fernando Pinheiro Franco',
  'Av. Francisco Rodrigues Filho',
  'Rua Ipiranga',
  'Centro Cívico',
  'Av. Lourenço de Souza Franco (Jundiapeba)',
  'Rua Barão de Jaceguai',
  'Av. Japão',
];

/**
 * Remove acentos e caracteres especiais de uma string para busca insensível a acentuação.
 * Exemplo: "Rômulo" -> "romulo"
 */
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export const ManualStreetModal: React.FC = () => {
  const { isManualModalOpen, setIsManualModalOpen, handleManualStreetChange, locationState, busRoutesData } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Sugestões de ruas vindas do contrato da API + preset (insensível a acentos)
  const availableStreets = useMemo(() => {
    const apiStreets = busRoutesData?.itinerarios ? Object.keys(busRoutesData.itinerarios) : [];
    const combined = Array.from(new Set([...PRESET_STREETS, ...apiStreets]));
    if (!searchTerm.trim()) return combined;

    const normalizedQuery = normalizeText(searchTerm);
    return combined.filter((st) => normalizeText(st).includes(normalizedQuery));
  }, [busRoutesData, searchTerm]);

  if (!isManualModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 flex flex-col max-h-[85vh] shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 text-mogi-blue">
            <MapPin className="w-6 h-6 text-mogi-blue" />
            <h3 className="text-lg font-bold">Mudar de rua manualmente</h3>
          </div>
          <button
            onClick={() => setIsManualModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="py-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite o nome da rua ou avenida..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mogi-blue font-medium"
            />
          </div>
        </div>

        {/* Street List Items */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1 my-1">
          {availableStreets.map((street) => {
            const isSelected = locationState.streetName === street;
            return (
              <button
                key={street}
                onClick={() => handleManualStreetChange(street)}
                className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'border-mogi-blue bg-blue-50 text-mogi-blue font-bold shadow-sm'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 font-medium'
                }`}
              >
                <span className="text-base truncate">{formatStreetName(street)}</span>
                {isSelected && <Check className="w-5 h-5 text-mogi-blue flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 text-center">
          <button
            onClick={() => setIsManualModalOpen(false)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
