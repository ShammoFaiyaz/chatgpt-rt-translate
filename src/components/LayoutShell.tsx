import type { ReactNode } from 'react';

export type TranslatorStatus = 'loading' | 'ready' | 'error';

interface LayoutShellProps {
  status: TranslatorStatus;
  mode?: 'prison' | 'hospital';
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  uiLang: 'en' | 'ar';
  onToggleLang?: () => void;
}

export function LayoutShell({
  status,
  mode = 'prison',
  children,
  showBack,
  onBack,
  uiLang,
  onToggleLang,
}: LayoutShellProps) {
  const isArabic = uiLang === 'ar';

  const statusLabel =
    status === 'loading'
      ? isArabic
        ? 'جارٍ تجهيز القناة الآمنة…'
        : 'Preparing secure channel…'
      : status === 'ready'
      ? isArabic
        ? 'متصل · مشفّر'
        : 'Online · Encrypted'
      : isArabic
      ? 'مشكلة في الاتصال'
      : 'Connection issue';

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* Top capsules: powered-by + logged-in user */}
        <header className="app-header">
          <div className="app-header-left">
            <a
              className="app-brand-card"
              href="https://www.inovasolutions.ai/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="app-brand-text">
                {isArabic ? 'بدعم من' : 'Powered By'}
              </span>
              <img src="/inova-logo.svg" alt="Inova" className="app-brand-logo" />
            </a>

            {showBack && (
              <button
                type="button"
                className="app-header-back"
                onClick={onBack}
                aria-label="Back to start screen"
              />
            )}
          </div>

          <div className="app-header-center" aria-hidden="true">
            <img
              src="/PITP-guard-logo.svg"
              alt=""
              className="app-header-logo"
            />
            <div className="app-header-tagline">
              {isArabic
                ? 'الروبوت الذكي للترجمة الفورية والتفاعلية للنزلاء'
                : 'Prisoner Intelligent Translation Platform (PITP)'}
            </div>
          </div>

          <div className="app-header-right">
            {onToggleLang && (
              <button
                type="button"
                className="app-header-lang"
                onClick={onToggleLang}
                aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {isArabic ? 'EN' : 'عربي'}
              </button>
            )}

            <div className="app-user-card" aria-label="Logged in user">
              <div className="app-user-main">
                <div className="app-user-avatar" aria-hidden="true">
                  👮
                </div>
                <div className="app-user-text">
                  <div className="app-user-name">
                    {isArabic ? 'الملازم فيصل الحربي' : 'Lt. Faisal Al-Harbi'}
                  </div>
                  <div className="app-user-role">
                    {isArabic ? 'ضابط الإصلاحيات' : 'Corrections officer'} ·{' '}
                    <span className="app-user-mode">{isArabic ? 'السجن' : 'Prison'}</span>
                  </div>
                  <div className={`app-user-status app-user-status--${status}`}>{statusLabel}</div>
                </div>
              </div>
              <div className="app-user-actions">
                <button
                  type="button"
                  className="app-user-icon-button"
                  aria-label="User settings"
                >
                  ⚙
                </button>
                <button type="button" className="app-user-logout">
                  {isArabic ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

export default LayoutShell;


