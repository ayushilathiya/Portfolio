import AppShell from '@/components/app-shell';

/** No server-side Hashnode fetch — keeps first paint instant; /docs loads posts client-side */
export default function Home() {
  return <AppShell />;
}
