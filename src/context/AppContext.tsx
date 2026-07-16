import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppScreen, DirectionFilter, RotasOnibusData, UserLocationState } from '../types/bus';
import { fetchBusRoutes } from '../services/api';
import { getCurrentUserLocation, DEFAULT_STREET } from '../services/geolocation';

interface AppContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  directionFilter: DirectionFilter;
  setDirectionFilter: (filter: DirectionFilter) => void;
  locationState: UserLocationState;
  setLocationState: React.Dispatch<React.SetStateAction<UserLocationState>>;
  busRoutesData: RotasOnibusData | null;
  statusMessage: string;
  isManualModalOpen: boolean;
  setIsManualModalOpen: (open: boolean) => void;
  selectDirectionAndNavigate: (direction: 'centro' | 'bairro') => void;
  handleManualStreetChange: (street: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('all');
  const [busRoutesData, setBusRoutesData] = useState<RotasOnibusData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Detectando sua localização em Mogi das Cruzes...');
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);

  const [locationState, setLocationState] = useState<UserLocationState>({
    streetName: DEFAULT_STREET,
    lat: null,
    lng: null,
    isGranted: false,
    isLoading: true,
    error: null,
    isManual: false,
  });

  // Inicialização no Splash: Carrega os dados da API e solicita permissão de geolocalização simultaneamente
  useEffect(() => {
    let isMounted = true;

    async function initializeApp() {
      // 1. Iniciar pré-carregamento dos dados da API (com cache de 15 min)
      const dataPromise = fetchBusRoutes((msg) => {
        if (isMounted) setStatusMessage(msg);
      });

      // 2. Solicitar localização GPS do usuário
      const locationPromise = getCurrentUserLocation();

      const [data, loc] = await Promise.all([dataPromise, locationPromise]);

      if (isMounted) {
        setBusRoutesData(data);
        setLocationState(loc);
        setStatusMessage('Tudo pronto!');
        
        // Transiciona da Splash para a Tela Inicial
        setTimeout(() => {
          if (isMounted) setCurrentScreen('home');
        }, 1200);
      }
    }

    initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectDirectionAndNavigate = (direction: 'centro' | 'bairro') => {
    setDirectionFilter(direction);
    setCurrentScreen('lines');
  };

  const handleManualStreetChange = (newStreet: string) => {
    setLocationState((prev) => ({
      ...prev,
      streetName: newStreet,
      isManual: true,
    }));
    setIsManualModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        directionFilter,
        setDirectionFilter,
        locationState,
        setLocationState,
        busRoutesData,
        statusMessage,
        isManualModalOpen,
        setIsManualModalOpen,
        selectDirectionAndNavigate,
        handleManualStreetChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}
