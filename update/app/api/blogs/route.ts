import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  try {
    if (!process.env.HASHNODE_TOKEN) {
      return NextResponse.json([], {
        headers: { 'Cache-Control': 'public, s-maxage=300' },
      });
    }

    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HASHNODE_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          {
            publication(host: "ayushilathiya.hashnode.dev") {
              posts(first: 20) {
                edges {
                  node {
                    title
                    subtitle
                    slug
                    publishedAt
                    tags {
                      name
                    }
                    content {
                      markdown
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();

    if (!data.data?.publication?.posts?.edges) {
      throw new Error('Invalid response format');
    }

    const posts = data.data.publication.posts.edges.map(({ node }: { node: Record<string, unknown> }) => {
      const markdown = (node.content as { markdown?: string })?.markdown ?? '';
      const tags = ((node.tags as { name: string }[]) ?? []).map((t) => t.name);

      return {
        title: node.title,
        subtitle: node.subtitle,
        slug: node.slug,
        dateAdded: node.publishedAt,
        tags,
        body: stripImagesFromMarkdown(markdown),
      };
    });

    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

function stripImagesFromMarkdown(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
