import { NextResponse } from 'next/server';
import { getHashnodePost } from '@/lib/hashnode';

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getHashnodePost(params.slug);
    if (!post) {
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }
    return NextResponse.json(post, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
    });
  } catch (error) {
    console.error('Blog post fetch error:', error);
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 });
  }
}
