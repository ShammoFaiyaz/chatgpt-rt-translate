import type { ReactNode } from 'react';

export type TranslatorStatus = 'loading' | 'ready' | 'error';

interface LayoutShellProps {
  status: TranslatorStatus;
  mode?: 'prison' | 'hospital';
  children: ReactNode;
}

export function LayoutShell({ status, mode = 'prison', children }: LayoutShellProps) {
  const statusLabel =
    status === 'loading'
      ? 'Preparing'
      : status === 'ready'
      ? 'Online – Encrypted'
      : 'Connection issue';

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Top bar */}
        <header className="app-topbar">
          <div className="app-topbar-left">
            <div className="app-logo-pill">MINISTRY LOGO</div>
            <div>
              <div className="app-title">INOVA TRANSLATOR</div>
              <div className="app-subtitle">
                Corrections communications interface · Demo only ({mode})
              </div>
            </div>
          </div>

          <div className="app-topbar-right">
            <div className="app-pill">
              <span>Session #A-104</span>
            </div>
            <div className="app-pill app-pill--status">
              <span className="app-pill-dot" />
              <span>{statusLabel}</span>
            </div>
            <div className="app-pill">
              <span>AR ⇄ EN</span>
            </div>
            <span className="app-dev-label">DEV MODE</span>
          </div>
        </header>

        {/* Main content */}
        <main className="app-main">{children}</main>

        {/* Footer */}
        <footer className="app-footer">
          <div>🔐 End-to-end encrypted · 📶 Connection: Stable</div>
          <small>Inova Translator · Demo interface · Powered by INOVA</small>
        </footer>
      </div>
    </div>
  );
}

export default LayoutShell;


