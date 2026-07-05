import dynamic from 'next/dynamic';

/** Client-only shell — avoids hydration mismatch that leaves the UI visible but non-interactive */
const AppShell = dynamic(() => import('@/components/app-shell'), {
  ssr: false,
  loading: () => (
    <div className="page-backdrop">
      <div className="device-frame flex items-center justify-center">
        <p className="font-mono text-sm text-text-muted animate-pulse px-6">
          › [0.0000] booting portfolio.sys…
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  return <AppShell />;
}
