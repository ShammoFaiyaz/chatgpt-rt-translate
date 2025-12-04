import { useEffect, useState } from 'react';
import type { TranslatorStatus } from './LayoutShell';

interface LoadingScreenProps {
  status: TranslatorStatus;
  onStart: () => void;
  uiLang: 'en' | 'ar';
}

export function LoadingScreen({ status, onStart, uiLang }: LoadingScreenProps) {
  const [dotStep, setDotStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);

  const isReady = status === 'ready';
  const isError = status === 'error';
  const isArabic = uiLang === 'ar';

  const heading =
    status === 'ready'
      ? isArabic
        ? 'منصة إنوفا للترجمة جاهزة'
        : 'Inova Translator Ready'
      : status === 'error'
      ? isArabic
        ? 'تعذر الاتصال بشكل آمن'
        : 'Unable to connect securely'
      : isArabic
      ? 'جارٍ تجهيز المترجم الآمن'
        : 'Preparing Secure Translator';

  const subheading =
    status === 'loading'
      ? isArabic
        ? 'نقوم بضبط قنوات الصوت واللغة الخاصة بك.'
        : 'We’re setting up your audio and language channels.'
      : status === 'ready'
      ? isArabic
        ? 'يمكنك البدء في التحدث عند الضغط على الزر.'
        : 'You can start speaking when you press the button.'
      : isArabic
      ? 'يرجى التحقق من الشبكة أو التواصل مع الدعم الفني.'
      : 'Please check the network or contact technical support.';

  // Animate loading dots for heading when translator is preparing
  useEffect(() => {
    if (status !== 'loading') {
      setDotStep(0);
      return;
    }
    const id = window.setInterval(() => {
      setDotStep((prev) => (prev + 1) % 3);
    }, 500);
    return () => window.clearInterval(id);
  }, [status]);

  // Sequentially complete checklist items while loading
  useEffect(() => {
    const totalSteps = 5;
    if (status === 'ready') {
      setCompletedSteps(totalSteps);
      return;
    }
    if (status !== 'loading') {
      setCompletedSteps(0);
      return;
    }

    setCompletedSteps(0);
    const id = window.setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= totalSteps) {
          window.clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, 400); // faster ticks so animation reaches all 5 checkmarks before ready state

    return () => window.clearInterval(id);
  }, [status]);

  const step1Complete = status === 'ready' || (status === 'loading' && completedSteps >= 1);
  const step2Complete = status === 'ready' || (status === 'loading' && completedSteps >= 2);
  const step3Complete = status === 'ready' || (status === 'loading' && completedSteps >= 3);
  const step4Complete = status === 'ready' || (status === 'loading' && completedSteps >= 4);
  const step5Complete = status === 'ready' || (status === 'loading' && completedSteps >= 5);

  const orbClassName =
    status === 'ready'
      ? 'orb orb--ready'
      : status === 'loading'
      ? 'orb orb--loading'
      : 'orb orb--error';

  return (
    <section className="card" aria-label="Translator status">
      <div key={status} className="status-fade">
        <div className="orb-wrapper">
          <div className={orbClassName}>
            <div className="orb-inner" />
            <div className="orb-ring" />
          </div>
          <h2 className="heading">
            {status === 'loading' ? (
              <>
                <span className="heading-preparing">Preparing</span> Secure Translator
                <span className="heading-dots">{'.'.repeat(dotStep + 1)}</span>
              </>
            ) : status === 'ready' && isArabic ? (
              <>
                منصة إنوفا للترجمة <span className="heading-ready">جاهزة</span>
              </>
            ) : status === 'ready' ? (
              <>
                Inova Translator <span className="heading-ready">Ready</span>
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="subheading">{subheading}</p>
        </div>

        <div className="status-main-row">
          <div className="checklist">
          <div className="check-row">
            <div className={`check-icon ${step1Complete ? 'check-icon--success' : 'check-icon--pending'}`}>
              {step1Complete ? '✔' : '●'}
            </div>
            <div>
              <div className="check-text-title">
                {isArabic ? 'اتصال آمن' : 'Secure connection'}
              </div>
              <div className="check-text-help">
                {isArabic
                  ? 'قناة TLS مشفّرة بين الجهاز وخدمة المترجم.'
                  : 'TLS encrypted channel between device and translator service.'}
              </div>
            </div>
          </div>

          <div className="check-row">
            <div
              className={`check-icon ${
                isError
                  ? 'check-icon--error'
                  : step2Complete
                  ? 'check-icon--success'
                  : 'check-icon--pending'
              }`}
            >
              {isError ? '✖' : step2Complete ? '✔' : '●'}
            </div>
            <div>
              <div className="check-text-title">
                {isArabic ? 'فحص الميكروفون' : 'Checking microphone'}
              </div>
              <div className="check-text-help">
                {isArabic
                  ? 'التحقق من مستويات الإدخال والصلاحيات لكلتا اللغتين.'
                  : 'Input levels and permissions for both languages.'}
              </div>
            </div>
          </div>

          <div className="check-row">
            <div className={`check-icon ${step3Complete ? 'check-icon--success' : 'check-icon--pending'}`}>
              {step3Complete ? '✔' : '●'}
            </div>
            <div>
              <div className="check-text-title">
                {isArabic ? 'تهيئة محرّك اللغة' : 'Initializing language engine'}
              </div>
              <div className="check-text-help">
                {isArabic
                  ? 'خط أنابيب ترجمة فورية بين العربية والإنجليزية.'
                  : 'Arabic–English real-time translation pipeline.'}
              </div>
            </div>
          </div>

            <div className="check-row">
              <div className={`check-icon ${step4Complete ? 'check-icon--success' : 'check-icon--pending'}`}>
                {step4Complete ? '✔' : '●'}
              </div>
              <div>
                <div className="check-text-title">
                  {isArabic ? 'حماية الجلسة' : 'Session safeguards'}
                </div>
                <div className="check-text-help">
                  {isArabic
                    ? 'صلاحيات مبنية على الدور وسجلات تدقيق وإشعارات للحوادث.'
                    : 'Role-based access, audit logging, and incident flags for this session.'}
                </div>
              </div>
            </div>

            <div className="check-row">
              <div className={`check-icon ${step5Complete ? 'check-icon--success' : 'check-icon--pending'}`}>
                {step5Complete ? '✔' : '●'}
              </div>
              <div>
                <div className="check-text-title">
                  {isArabic ? 'تفريغ الجلسة' : 'Session transcript'}
                </div>
                <div className="check-text-help">
                  {isArabic
                    ? 'تفعيل حفظ نص آمن لمراجعة الضابط بعد الزيارة.'
                    : 'Secure transcript capture enabled for officer review after the visit.'}
                </div>
              </div>
            </div>
          </div>

          <div className="assignment-row" aria-label="Assign officer, inmate, device, and languages">
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="officer-select">
                {isArabic ? 'الضابط:' : 'Officer:'}
              </label>
              <select id="officer-select" className="assignment-select">
                <option>{isArabic ? 'الملازم فيصل الحربي' : 'Lt. Faisal Al-Harbi'}</option>
                <option>{isArabic ? 'الرقيب لينا السعود' : 'Sgt. Lina Al-Saud'}</option>
                <option>{isArabic ? 'النقيب عمر المنصور' : 'Cpt. Omar Al-Mansour'}</option>
              </select>
            </div>
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="officer-lang-select">
                {isArabic ? 'لغة الضابط:' : 'Officer language:'}
              </label>
              <select id="officer-lang-select" className="assignment-select">
                <option>
                  {isArabic ? 'العربية (AR) · المصدر' : 'Arabic (AR) · Source'}
                </option>
                <option>{isArabic ? 'الإنجليزية (EN)' : 'English (EN)'}</option>
                <option>{isArabic ? 'الأردية (UR)' : 'Urdu (UR)'}</option>
              </select>
            </div>
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="inmate-select">
                {isArabic ? 'النزيل:' : 'Inmate:'}
              </label>
              <select id="inmate-select" className="assignment-select">
                <option>
                  {isArabic ? 'النزيل #45821 · قبول طبي' : 'Inmate #45821 · Medical intake'}
                </option>
                <option>
                  {isArabic ? 'النزيل #47209 · فحص روتيني' : 'Inmate #47209 · Routine check'}
                </option>
                <option>
                  {isArabic
                    ? 'النزيل #49311 · تقييم للصحة النفسية'
                    : 'Inmate #49311 · Mental health review'}
                </option>
              </select>
            </div>
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="inmate-lang-select">
                {isArabic ? 'لغة النزيل:' : 'Inmate language:'}
              </label>
              <select id="inmate-lang-select" className="assignment-select">
                <option>
                  {isArabic ? 'الإنجليزية (EN) · الهدف' : 'English (EN) · Target'}
                </option>
                <option>{isArabic ? 'العربية (AR)' : 'Arabic (AR)'}</option>
                <option>{isArabic ? 'الإسبانية (ES)' : 'Spanish (ES)'}</option>
              </select>
            </div>
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="purpose-select">
                {isArabic ? 'الغرض:' : 'Purpose:'}
              </label>
              <select id="purpose-select" className="assignment-select">
                <option>{isArabic ? 'فحص طبي' : 'Medical checkup'}</option>
                <option>{isArabic ? 'جلسة قانونية / مقابلة' : 'Legal / interview'}</option>
                <option>
                  {isArabic ? 'تنسيق مكالمة عائلية' : 'Family call facilitation'}
                </option>
                <option>{isArabic ? 'تقييم نفسي' : 'Psychological evaluation'}</option>
              </select>
            </div>
            <div className="assignment-field">
              <label className="assignment-label" htmlFor="device-select">
                {isArabic ? 'الجهاز:' : 'Device:'}
              </label>
              <select id="device-select" className="assignment-select">
                {/* Device names stay literal; do not translate */}
                <option>Intake kiosk · Station 3</option>
                <option>Medical bay tablet · Room 1</option>
                <option>Portable handset · Cart 2</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={
            'ready-button-wrapper ' +
            (isReady ? 'ready-button-wrapper--visible' : 'ready-button-wrapper--hidden')
          }
        >
          <button
            type="button"
            className="btn-primary btn-primary--lg"
            onClick={onStart}
            disabled={!isReady}
            aria-hidden={!isReady}
          >
            {isArabic ? 'بدء جلسة الترجمة' : 'Start Translation Session'}
          </button>
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
      </div>
    </section>
  );
}

export default LoadingScreen;


