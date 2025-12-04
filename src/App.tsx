import { useEffect, useState } from 'react';
import LayoutShell, { type TranslatorStatus } from './components/LayoutShell';
import LoadingScreen from './components/LoadingScreen';
import LiveTranslatorScreen from './components/LiveTranslatorScreen';

type Screen = 'loading' | 'live';

function App() {
  const [status, setStatus] = useState<TranslatorStatus>('loading');
  const [screen, setScreen] = useState<Screen>('loading');

  // Simulated status: loading -> ready after 2.5s
  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('ready'), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <LayoutShell status={status} mode="prison">
      {screen === 'loading' ? (
        <LoadingScreen
          status={status}
          onStart={() => {
            setScreen('live');
          }}
        />
      ) : (
        <LiveTranslatorScreen />
      )}
    </LayoutShell>
  );
}

export default App;


