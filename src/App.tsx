import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { LinesScreen } from './components/LinesScreen';
import { ManualStreetModal } from './components/ManualStreetModal';
import { BottomNav } from './components/BottomNav';

const MainContainer: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-mogi-blue selection:text-white">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'lines' && <LinesScreen />}

      <ManualStreetModal />
      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContainer />
    </AppProvider>
  );
}

export default App;
