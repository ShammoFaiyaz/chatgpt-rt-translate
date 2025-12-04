function LiveTranslatorScreen() {
  // Static example conversation only – no real logic.
  const officerMessages = [
    {
      id: 1,
      original: 'السلام عليكم، ما اسمك الكامل؟',
      translation: 'Peace be upon you. What is your full name?',
      time: '14:02',
    },
    {
      id: 2,
      original: 'هل تشعر بأي ألم أو مشكلة صحية الآن؟',
      translation: 'Are you feeling any pain or medical issues right now?',
      time: '14:03',
    },
  ];

  const inmateMessages = [
    {
      id: 1,
      original: 'My name is John Michael Rivera.',
      translation: 'اسمي جون مايكل ريفيرا.',
      time: '14:02',
    },
    {
      id: 2,
      original: 'I have chest pain and difficulty breathing.',
      translation: 'أشعر بألم في الصدر وصعوبة في التنفس.',
      time: '14:03',
    },
  ];

  return (
    <section className="card" aria-label="Live translator dashboard">
      {/* Header */}
      <header className="live-header">
        <div>
          <h2 className="heading">Active conversation</h2>
          <p className="live-subheading">
            Officer speaks in Arabic. Inmate hears English. Responses are translated both ways in
            real time.
          </p>
        </div>
        <div className="live-session-meta">
          <div className="live-session-tag">Session #A-104</div>
          <div className="live-session-tag live-session-tag--soft">
            Mode: Prison intake · Medical check
          </div>
        </div>
      </header>

      {/* Conversation grid */}
      <div className="conversation-grid">
        {/* Officer column */}
        <section className="conversation-column" aria-label="Officer lane">
          <header className="conversation-header">
            <div>
              <div className="conversation-role">👮 Officer</div>
              <div className="conversation-role-detail">Arabic (AR) · Source audio</div>
            </div>
            <div className="conversation-pill conversation-pill--officer">Speaking language</div>
          </header>

          <div className="conversation-bubbles">
            {officerMessages.map((msg) => (
              <article key={msg.id} className="bubble bubble--officer">
                <div className="bubble-meta">
                  <span className="bubble-time">{msg.time}</span>
                  <span className="bubble-label">Original · AR</span>
                </div>
                <p className="bubble-text bubble-text--primary" dir="rtl">
                  {msg.original}
                </p>
                <p className="bubble-text bubble-text--secondary">{msg.translation}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Inmate column */}
        <section className="conversation-column" aria-label="Inmate lane">
          <header className="conversation-header conversation-header--right">
            <div>
              <div className="conversation-role">👤 Inmate</div>
              <div className="conversation-role-detail">English (EN) · Output audio</div>
            </div>
            <div className="conversation-pill conversation-pill--inmate">Heard language</div>
          </header>

          <div className="conversation-bubbles conversation-bubbles--right">
            {inmateMessages.map((msg) => (
              <article key={msg.id} className="bubble bubble--inmate">
                <div className="bubble-meta bubble-meta--right">
                  <span className="bubble-label">Original · EN</span>
                  <span className="bubble-time">{msg.time}</span>
                </div>
                <p className="bubble-text bubble-text--primary">{msg.original}</p>
                <p className="bubble-text bubble-text--secondary" dir="rtl">
                  {msg.translation}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Mic bar */}
      <footer className="mic-bar" aria-label="Microphone control">
        <div className="mic-status">
          <div className="mic-status-dot" />
          <span className="mic-status-text">Listening for officer in Arabic…</span>
        </div>

        <button type="button" className="mic-button" aria-label="Hold to speak (officer)">
          🎙
        </button>

        <div className="mic-help">
          <div className="mic-help-main">Hold to speak · Release to listen</div>
          <div className="mic-help-sub">
            Voice captured locally · Translated securely to English for the inmate.
          </div>
        </div>
      </footer>
    </section>
  );
}

export default LiveTranslatorScreen;


