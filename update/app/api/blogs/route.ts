import { NextResponse } from 'next/server';
import { getHashnodePostSummaries } from '@/lib/hashnode';

export const revalidate = 3600;

export async function GET() {
  try {
    const summaries = await getHashnodePostSummaries();
    return NextResponse.json(summaries, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
    });
  } catch (error) {
    console.error('Blog summary fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
