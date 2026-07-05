import { NextResponse } from 'next/server';
import { getHashnodePosts } from '@/lib/hashnode';

export const revalidate = 3600;

export async function GET() {
  try {
    const posts = await getHashnodePosts();
    return NextResponse.json(posts, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
