export interface HashnodePost {
  slug: string;
  title: string;
}

const PUBLICATION_HOST = 'ayushilathiya.hashnode.dev';
const PUBLICATION_URL = `https://${PUBLICATION_HOST}`;

const GET_POSTS_QUERY = `
  query GetPosts {
    publication(host: "${PUBLICATION_HOST}") {
      posts(first: 20) {
        edges {
          node {
            slug
            title
            brief
          }
        }
      }
    }
  }
`;

export async function getHashnodePosts(): Promise<HashnodePost[]> {
  try {
    const posts = await fetchViaGraphQL();
    if (posts.length > 0) return posts;
  } catch (error) {
    console.error('Hashnode GraphQL fetch failed:', error);
  }

  try {
    return await fetchViaRss();
  } catch (error) {
    console.error('Hashnode RSS fallback failed:', error);
    return [];
  }
}

async function fetchViaGraphQL(): Promise<HashnodePost[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: GET_POSTS_QUERY }),
    next: { revalidate: 3600 },
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('json')) {
    throw new Error('GraphQL endpoint returned non-JSON response');
  }

  const data = await response.json();

  if (data.errors?.length) {
    throw new Error(data.errors[0]?.message ?? 'GraphQL error');
  }

  const edges = data.data?.publication?.posts?.edges;
  if (!Array.isArray(edges)) {
    throw new Error('Invalid GraphQL response format');
  }

  return edges.map(({ node }: { node: { slug: string; title: string } }) => ({
    slug: node.slug,
    title: node.title,
  }));
}

async function fetchViaRss(): Promise<HashnodePost[]> {
  const response = await fetch(`${PUBLICATION_URL}/rss.xml`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`RSS feed returned ${response.status}`);
  }

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const posts: HashnodePost[] = [];

  for (const item of items.slice(0, 20)) {
    const titleMatch =
      item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ??
      item.match(/<title>(.*?)<\/title>/);
    const linkMatch = item.match(/<link>(.*?)<\/link>/);

    if (!titleMatch || !linkMatch) continue;

    const url = linkMatch[1].trim();
    const slug = url.replace(/\/$/, '').split('/').pop() ?? '';
    if (!slug) continue;

    posts.push({ title: titleMatch[1].trim(), slug });
  }

  return posts;
}

export function postUrl(slug: string): string {
  return `${PUBLICATION_URL}/${slug}`;
}
