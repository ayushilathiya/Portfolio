import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const QUERY = `
  {
    publication(host: "ayushilathiya.hashnode.dev") {
      posts(first: 20) {
        edges {
          node {
            title
            subtitle
            slug
            publishedAt
            views
            coverImage { url }
            tags { name }
            content { markdown }
            brief
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.HASHNODE_TOKEN) {
      headers.Authorization = `Bearer ${process.env.HASHNODE_TOKEN}`;
    }

    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 3600 },
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Hashnode GQL errors:', data.errors);
      throw new Error(data.errors[0]?.message ?? 'GraphQL error');
    }

    const edges = data.data?.publication?.posts?.edges;
    if (!edges) {
      throw new Error('Invalid response format');
    }

    const posts = edges.map(({ node }: { node: Record<string, unknown> }) => {
      const markdown = (node.content as { markdown?: string })?.markdown ?? '';
      const tags = ((node.tags as { name: string }[]) ?? []).map((t) => t.name);

      const coverImage = (node.coverImage as { url?: string })?.url ?? '';

      return {
        title: node.title,
        subtitle: node.subtitle || node.brief || '',
        slug: node.slug,
        dateAdded: node.publishedAt,
        views: node.views ?? 0,
        coverImage,
        tags,
        body: stripImagesFromMarkdown(markdown),
      };
    });

    return NextResponse.json(posts, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

function stripImagesFromMarkdown(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
