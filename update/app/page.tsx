import AppShell from '@/components/app-shell';
import { getHashnodePosts } from '@/lib/hashnode';

export default async function Home() {
  const docsPosts = await getHashnodePosts();
  return <AppShell docsPosts={docsPosts} />;
}
