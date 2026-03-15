import { DealForm } from './components/DealForm';
import { useCreateDeal } from './hooks/useCreateDeal';
import styles from './App.module.css';

export default function App() {
  const { status, result, createDeal, reset } = useCreateDeal();

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgGlow} aria-hidden />
      <div className={styles.bgGrid} aria-hidden />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="var(--accent)" fillOpacity="0.15" />
              <path d="M10 18 L18 10 L26 18 L18 26 Z" stroke="var(--accent)" strokeWidth="2" fill="none" />
              <circle cx="18" cy="18" r="3" fill="var(--accent)" />
            </svg>
            <span className={styles.logoText}>Bitrix24</span>
          </div>
          <p className={styles.subtitle}>CRM Integration</p>
        </header>

        {/* Card */}
        <main className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Создать сделку</h1>
            <p className={styles.description}>
              Заполните форму — сделка автоматически появится в вашем CRM
            </p>
          </div>

          {status === 'success' && result ? (
            <SuccessState dealId={result.dealId!} message={result.message!} onReset={reset} />
          ) : (
            <>
              {status === 'error' && result && (
                <ErrorBanner message={result.error || result.errors?.join(', ') || 'Неизвестная ошибка'} />
              )}
              <DealForm onSubmit={createDeal} isLoading={status === 'loading'} />
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <span>REST API</span>
          <span className={styles.dot} />
          <span>TypeScript</span>
          <span className={styles.dot} />
          <span>React 18</span>
        </footer>
      </div>
    </div>
  );
}

function SuccessState({
  dealId,
  message,
  onReset,
}: {
  dealId: number;
  message: string;
  onReset: () => void;
}) {
  return (
    <div className={styles.successState}>
      <div className={styles.successIcon} aria-hidden>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="var(--success)" fillOpacity="0.15" />
          <path
            d="M9 16.5L13.5 21L23 11"
            stroke="var(--success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className={styles.successTitle}>Сделка создана!</h2>
      <p className={styles.successMsg}>{message}</p>
      <div className={styles.dealBadge}>
        <span className={styles.dealBadgeLabel}>ID сделки</span>
        <span className={styles.dealBadgeValue}>#{dealId}</span>
      </div>
      <button className={styles.resetBtn} onClick={onReset}>
        Создать ещё одну сделку
      </button>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className={styles.errorBanner} role="alert">
      <span className={styles.errorBannerIcon} aria-hidden>⚠</span>
      <span>{message}</span>
    </div>
  );
}
