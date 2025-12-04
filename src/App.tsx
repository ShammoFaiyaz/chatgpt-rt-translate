import { useEffect, useState } from 'react';
import LayoutShell, { type TranslatorStatus } from './components/LayoutShell';
import LoadingScreen from './components/LoadingScreen';
import LiveTranslatorScreen from './components/LiveTranslatorScreen';

type Screen = 'loading' | 'live';

function App() {
  const [status, setStatus] = useState<TranslatorStatus>('loading');
  const [screen, setScreen] = useState<Screen>('loading');
  const [connectionLost, setConnectionLost] = useState(false);
  const [uiLang, setUiLang] = useState<'en' | 'ar'>('en');

  // Simulated status: loading -> ready after 2.5s
  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('ready'), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <>
      {/* Subtle fade when switching EN/AR */}
      <div key={uiLang} className="lang-fade">
        <LayoutShell
          status={status}
          mode="prison"
          uiLang={uiLang}
          showBack={screen === 'live'}
          onBack={() => setScreen('loading')}
          onToggleLang={() => setUiLang((prev) => (prev === 'en' ? 'ar' : 'en'))}
        >
          {screen === 'loading' ? (
            <LoadingScreen
              status={status}
              uiLang={uiLang}
              onStart={() => {
                setScreen('live');
              }}
            />
          ) : (
            <LiveTranslatorScreen uiLang={uiLang} />
          )}
        </LayoutShell>
      </div>

      {connectionLost && (
        <div className="overlay">
          <div className="overlay-card">
            <h3>Connection lost</h3>
            <p>The secure translation link has dropped. Voice translation is paused.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setConnectionLost(false)}
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;


