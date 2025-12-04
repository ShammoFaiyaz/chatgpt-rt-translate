import type { TranslatorStatus } from './LayoutShell';

interface LoadingScreenProps {
  status: TranslatorStatus;
  onStart: () => void;
}

export function LoadingScreen({ status, onStart }: LoadingScreenProps) {
  const isReady = status === 'ready';
  const isError = status === 'error';

  const heading =
    status === 'loading'
      ? 'Preparing secure translator…'
      : status === 'ready'
      ? 'Translator ready'
      : 'Unable to connect securely';

  const subheading =
    status === 'loading'
      ? 'We’re setting up your audio and language channels.'
      : status === 'ready'
      ? 'You can start speaking when you hold the button.'
      : 'Please check the network or contact technical support.';

  return (
    <section className="card" aria-label="Translator status">
      <div className="orb-wrapper">
        <div className="orb">
          <div className="orb-inner" />
          <div className="orb-ring" />
        </div>
        <h2 className="heading">{heading}</h2>
        <p className="subheading">{subheading}</p>
      </div>

      <div className="roles-strip">
        <div className="roles-side">
          <div className="roles-label">👮 Officer</div>
          <div className="roles-pill roles-pill--officer">Arabic (AR)</div>
        </div>
        <div className="roles-side">
          <div className="roles-center">Secure real-time channel</div>
          <div className="roles-center roles-center-strong">AR ⇄ EN</div>
        </div>
        <div className="roles-side">
          <div className="roles-label">👤 Inmate / Patient</div>
          <div className="roles-pill roles-pill--subject">English (EN)</div>
        </div>
      </div>

      <div className="checklist">
        <div className="check-row">
          <div className="check-icon">✔</div>
          <div>
            <div className="check-text-title">Secure connection</div>
            <div className="check-text-help">
              TLS encrypted channel between device and translator service.
            </div>
          </div>
        </div>

        <div className="check-row">
          <div className="check-icon">{isError ? '✖' : isReady ? '✔' : '●'}</div>
          <div>
            <div className="check-text-title">Checking microphone</div>
            <div className="check-text-help">
              Input levels and permissions for both languages.
            </div>
          </div>
        </div>

        <div className="check-row">
          <div className="check-icon">{isReady ? '✔' : '●'}</div>
          <div>
            <div className="check-text-title">Initializing language engine</div>
            <div className="check-text-help">
              Arabic–English real-time translation pipeline.
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
        {isReady && (
          <button type="button" className="btn-primary" onClick={onStart}>
            Start translation session
          </button>
        )}
        {isError && (
          <button
            type="button"
            className="btn-primary btn-danger"
            onClick={() => window.location.reload()}
          >
            Retry connection
          </button>
        )}
      </div>
    </section>
  );
}

export default LoadingScreen;


