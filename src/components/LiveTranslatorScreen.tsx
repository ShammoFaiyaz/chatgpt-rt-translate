import { useEffect, useState } from 'react';

interface LiveTranslatorScreenProps {
  uiLang: 'en' | 'ar';
}

function LiveTranslatorScreen({ uiLang }: LiveTranslatorScreenProps) {
  const [showConversations, setShowConversations] = useState(false);
  const [dotStep, setDotStep] = useState(0);
  const isArabic = uiLang === 'ar';
  // Static example conversation only – no real logic.
  const officerMessages = [
    {
      id: 1,
      original: 'السلام عليكم، ما اسمك الكامل؟',
      translation: 'Peace be upon you. What is your full name?',
      time: '14:02',
      confidence: 0.96,
    },
    {
      id: 2,
      original: 'هل تشعر بأي ألم أو مشكلة صحية الآن؟',
      translation: 'Are you feeling any pain or medical issues right now?',
      time: '14:03',
      confidence: 0.94,
    },
  ];

  const inmateMessages = [
    {
      id: 1,
      original: 'My name is John Michael Rivera.',
      translation: 'اسمي جون مايكل ريفيرا.',
      time: '14:02',
      confidence: 0.97,
    },
    {
      id: 2,
      original: 'I have chest pain and difficulty breathing.',
      translation: 'أشعر بألم في الصدر وصعوبة في التنفس.',
      time: '14:03',
      confidence: 0.93,
    },
  ];

  // Animate "listening" dots when mic is active
  useEffect(() => {
    if (!showConversations) {
      setDotStep(0);
      return;
    }
    const id = window.setInterval(() => {
      setDotStep((prev) => (prev + 1) % 3);
    }, 500);
    return () => window.clearInterval(id);
  }, [showConversations]);

  return (
    <section className="card status-fade" aria-label="Live translator dashboard">
      {/* Header */}
      <header className="live-header">
        <div>
          <h2 className="heading">
            {isArabic ? 'جلسة ترجمة حية' : 'Live translation session'}
          </h2>
          <p className="live-subheading">
            {isArabic
              ? 'يتم ربط الضابط والنزيل بقناة صوتية آمنة، ويتم ترجمة كل جملة فورياً وتسجيلها لمراجعة الحوادث.'
              : 'Guard and inmate are linked through a secure audio channel. Every utterance is translated in real time and logged for incident review.'}
          </p>
        </div>
        <div className="live-session-meta">
          <div className="live-session-tag live-session-tag--soft">
            {isArabic
              ? 'الوضع: استقبال السجناء · فحص طبي'
              : 'Mode: Prison intake · Medical checkup'}
          </div>
        </div>
      </header>

      {/* Identity panels */}
      <div className="identity-row">
        <section className="identity-card" aria-label="Officer profile">
          <div className="identity-title-row">
            <span className="identity-role-chip identity-role-chip--officer">
              👮 {isArabic ? 'الضابط' : 'Officer'}
            </span>
          </div>
          <table className="identity-table">
            <tbody>
              <tr>
                <th rowSpan={6} className="identity-avatar-cell">
                  <div className="identity-avatar">👤</div>
                </th>
                <th scope="row">{isArabic ? 'الاسم' : 'Name'}</th>
                <td>{isArabic ? 'الملازم فيصل الحربي' : 'Lt. Faisal Al-Harbi'}</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'الرقم الوظيفي' : 'Badge'}</th>
                <td>#72418</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'المسمّى الوظيفي' : 'Designation'}</th>
                <td>{isArabic ? 'ضابط إصلاحيات · أمن العنبر C' : 'Corrections officer · Block C Security'}</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'الدور الأساسي' : 'Primary role'}</th>
                <td>{isArabic ? 'المتحدث الرئيسي' : 'Primary communicator'}</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'العمر' : 'Age'}</th>
                <td colSpan={2}>41</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'اللغة الأساسية' : 'Primary language'}</th>
                <td colSpan={2}>
                  Arabic (<span className="lang-code">AR</span>)
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="identity-card" aria-label="Inmate profile">
          <div className="identity-title-row">
            <span className="identity-role-chip identity-role-chip--inmate">
              👤 {isArabic ? 'النزيل' : 'Inmate'}
            </span>
          </div>
          <table className="identity-table">
            <tbody>
              <tr>
                <th rowSpan={6} className="identity-avatar-cell">
                  <div className="identity-avatar">👤</div>
                </th>
                <th scope="row">{isArabic ? 'الاسم' : 'Name'}</th>
                <td>{isArabic ? 'جون مايكل ريفيرا' : 'John Michael Rivera'}</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'الرقم' : 'ID'}</th>
                <td>45821</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'الغرفة' : 'Cell'}</th>
                <td>B-12</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'العمر' : 'Age'}</th>
                <td>36</td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'اللغة' : 'Language'}</th>
                <td>
                  English (<span className="lang-code">EN</span>)
                </td>
              </tr>
              <tr>
                <th scope="row">{isArabic ? 'ملاحظات' : 'Notes'}</th>
                <td>{isArabic ? 'خطر قلبي · ألم حالي في الصدر' : 'Cardiac risk · Current chest pain'}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      {/* Location strip */}
      <div className="location-strip">
        <div>
          {isArabic
            ? '📍 سجن الرياض المركزي · الجناح الطبي · الغرفة M-203'
            : '📍 Riyadh Central Facility · Medical Wing · Room M-203'}
        </div>
        <div className="location-strip-meta">
          {/* keep device name literal, just translate the label */}
          {isArabic ? 'Device RT-UNIT-07 · الوقت المحلي 14:03' : 'Device RT-UNIT-07 · Local time 14:03'}
        </div>
      </div>

      {/* Telemetry */}
      <div className="telemetry-row">
        <div className="telemetry-item telemetry-item--status">
          <span className="telemetry-label">{isArabic ? 'الحالة' : 'Status'}</span>
          <span className="telemetry-value telemetry-value--good">
            {isArabic ? 'متصل · مشفّر' : 'Online – Encrypted'}
          </span>
        </div>
        <div className="telemetry-item telemetry-item--latency">
          <span className="telemetry-label">{isArabic ? 'زمن الاستجابة' : 'Latency'}</span>
          <span className="telemetry-value telemetry-value--good">82 ms</span>
        </div>
        <div className="telemetry-item telemetry-item--connection">
          <span className="telemetry-label">{isArabic ? 'الاتصال' : 'Connection'}</span>
          <span className="telemetry-value telemetry-value--good">
            {isArabic ? 'مستقر · 0.3% فقدان' : 'Stable · 0.3% loss'}
          </span>
        </div>
        <div className="telemetry-item telemetry-item--model">
          <span className="telemetry-label">{isArabic ? 'النموذج' : 'Model'}</span>
          <select
            className="telemetry-select"
            defaultValue="medical"
            aria-label="Select translation model"
          >
            <option value="medical">
              {isArabic ? 'طبي عربي-إنجليزي v2.4' : 'Arabic-EN Medical v2.4'}
            </option>
            <option value="general">
              {isArabic ? 'عام عربي-إنجليزي v1.8' : 'Arabic-EN General v1.8'}
            </option>
            <option value="legal">
              {isArabic ? 'قانوني عربي-إنجليزي v2.1' : 'Arabic-EN Legal v2.1'}
            </option>
          </select>
        </div>
        <div className="telemetry-item telemetry-item--mode">
          <span className="telemetry-label">{isArabic ? 'النمط' : 'Mode'}</span>
          <select
            className="telemetry-select"
            defaultValue="vv"
            aria-label="Select translation mode"
          >
            <option value="vv">{isArabic ? 'صوت ↔ صوت' : 'Voice ↔ Voice'}</option>
            <option value="vt">{isArabic ? 'صوت → نص' : 'Voice → Text'}</option>
            <option value="tt">{isArabic ? 'نص ↔ نص' : 'Text ↔ Text'}</option>
          </select>
        </div>
        <div className="telemetry-item telemetry-item--langs">
          <span className="telemetry-label">{isArabic ? 'اللغات' : 'Languages'}</span>
          <span className="telemetry-value">AR ⇄ EN</span>
        </div>
      </div>

      {/* Conversation grid (hidden until mic is pressed) */}
      {showConversations && (
        <div className="conversation-grid fade-in">
          {/* Officer column */}
          <section className="conversation-column" aria-label="Officer lane">
            <header className="conversation-header">
              <div>
                <div className="conversation-role">
                  👮 {isArabic ? 'الضابط' : 'Officer'}
                </div>
          <div className="conversation-role-detail">
            {isArabic ? 'العربية' : 'Arabic'} (<span className="lang-code">AR</span>) ·{' '}
            {isArabic ? 'صوت المصدر' : 'Source audio'}
          </div>
              </div>
              <div className="conversation-pill conversation-pill--officer">
                {isArabic ? 'لغة التحدث' : 'Speaking language'}
              </div>
            </header>

            <div className="conversation-bubbles">
              {officerMessages.map((msg) => (
                <article key={msg.id} className="bubble bubble--officer">
                  <div className="bubble-meta">
                    <span className="bubble-time">{msg.time}</span>
                    <span className="bubble-label">
                      {isArabic ? 'النص الأصلي' : 'Original'} · AR
                    </span>
                  </div>
                  <p className="bubble-text bubble-text--primary" dir="rtl">
                    {msg.original}
                  </p>
                  <p className="bubble-text bubble-text--secondary">{msg.translation}</p>
                  <div className="bubble-confidence">
                    {isArabic ? 'درجة الثقة:' : 'Confidence:'}{' '}
                    {(msg.confidence * 100).toFixed(0)}%
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Inmate column */}
          <section className="conversation-column" aria-label="Inmate lane">
            <header className="conversation-header">
              <div>
                <div className="conversation-role">
                  👤 {isArabic ? 'النزيل' : 'Inmate'}
                </div>
          <div className="conversation-role-detail">
            {isArabic ? 'الإنجليزية' : 'English'} (<span className="lang-code">EN</span>) ·{' '}
            {isArabic ? 'صوت الإخراج' : 'Output audio'}
          </div>
              </div>
              <div className="conversation-pill conversation-pill--inmate">
                {isArabic ? 'اللغة المسموعة' : 'Heard language'}
              </div>
            </header>

            <div className="conversation-bubbles conversation-bubbles--right">
              {inmateMessages.map((msg) => (
                <article key={msg.id} className="bubble bubble--inmate">
                  <div className="bubble-meta bubble-meta--right">
                    <span className="bubble-label">
                      {isArabic ? 'النص الأصلي' : 'Original'} · EN
                    </span>
                    <span className="bubble-time">{msg.time}</span>
                  </div>
                  <p className="bubble-text bubble-text--primary">{msg.original}</p>
                  <p className="bubble-text bubble-text--secondary" dir="rtl">
                    {msg.translation}
                  </p>
                  <div className="bubble-confidence">
                    {isArabic ? 'درجة الثقة:' : 'Confidence:'}{' '}
                    {(msg.confidence * 100).toFixed(0)}%
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Mic bar */}
      <footer className="mic-bar" aria-label="Microphone control">
        <button
          type="button"
          className="mic-button"
          aria-label="Hold to speak (officer)"
          onClick={() => setShowConversations(true)}
        >
          <svg
            className="mic-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z" />
            <path d="M7 11a1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.08A7 7 0 0 0 19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0z" />
          </svg>
        </button>
        <div className="mic-text">
          <div className="mic-text-main">
            {isArabic ? 'اضغط للتحدث · حرّر للاستماع' : 'Hold to speak · Release to listen'}
          </div>
          {showConversations && (
            <div className="mic-text-status">
              <span className="mic-status-dot-small" />
              <span className="mic-text-status-label">
                {isArabic ? 'يستمع إلى الضابط بالعربية' : 'Listening for officer in Arabic'}
              </span>
              <span className="mic-text-status-dots">{'.'.repeat(dotStep + 1)}</span>
            </div>
          )}
        </div>
      </footer>

      {/* Session controls */}
      {showConversations && (
        <div className="session-controls fade-in">
          <div className="session-notes">
            <div className="session-notes-header">
              <span className="session-notes-title">
                {isArabic ? 'ملاحظات الجلسة / سجل الحوادث' : 'Session notes / incident log'}
              </span>
              <div className="session-quick-actions">
                <button className="session-chip" type="button">
                  {isArabic ? 'تصدير التفريغ' : 'Export transcript'}
                </button>
                <button className="session-chip" type="button">
                  {isArabic ? 'مسح الجلسة' : 'Clear session'}
                </button>
                <button className="session-btn session-btn--alert" type="button">
                  {isArabic ? 'إبلاغ عن حادث' : 'Flag incident'}
                </button>
              </div>
            </div>
            <textarea
              className="session-notes-textarea"
              rows={3}
              placeholder={
                isArabic ? 'سجّل الأعراض والسلوك وأي ملاحظات موضوعية…' : 'Record symptoms, behaviour, notes…'
              }
            />
            <div className="session-hint session-hint--center">
              {isArabic
                ? '* حافظ على الملاحظات مختصرة. سجّل الملاحظات الواقعية فقط.'
                : '* Keep notes focused. Only record factual observations.'}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LiveTranslatorScreen;


