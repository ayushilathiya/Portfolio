export interface HashnodePost {
  slug: string;
  title: string;
  publishedAt: string;
  body: string;
}

export type HashnodePostSummary = Pick<HashnodePost, 'slug' | 'title' | 'publishedAt'>;

const PUBLICATION_HOST = 'ayushilathiya.hashnode.dev';
const PUBLICATION_URL = `https://${PUBLICATION_HOST}`;
const FETCH_TIMEOUT_MS = 6000;

const GET_POSTS_SUMMARY_QUERY = `
  query GetPosts {
    publication(host: "${PUBLICATION_HOST}") {
      posts(first: 20) {
        edges {
          node {
            slug
            title
            publishedAt
          }
        }
      }
    }
  }
`;

const GET_POST_QUERY = `
  query GetPost($slug: String!) {
    publication(host: "${PUBLICATION_HOST}") {
      post(slug: $slug) {
        title
        publishedAt
        content {
          markdown
        }
      }
    }
  }
`;

/** Lightweight list for initial page load — no post bodies */
export async function getHashnodePostSummaries(): Promise<HashnodePostSummary[]> {
  try {
    return await fetchSummariesViaRss();
  } catch (error) {
    console.error('Hashnode RSS summary fetch failed:', error);
  }

  try {
    return await fetchSummariesViaGraphQL();
  } catch (error) {
    console.error('Hashnode GraphQL summary fetch failed:', error);
    return [];
  }
}

export async function getHashnodePosts(): Promise<HashnodePost[]> {
  try {
    return await fetchPostsViaRss();
  } catch (error) {
    console.error('Hashnode RSS fetch failed:', error);
  }

  try {
    return await fetchPostsViaGraphQL();
  } catch (error) {
    console.error('Hashnode GraphQL fetch failed:', error);
    return [];
  }
}

export async function getHashnodePost(slug: string): Promise<HashnodePost | null> {
  try {
    const post = await fetchPostViaRss(slug);
    if (post) return post;
  } catch (error) {
    console.error(`Hashnode RSS fetch failed for ${slug}:`, error);
  }

  try {
    return await fetchPostViaGraphQL(slug);
  } catch (error) {
    console.error(`Hashnode GraphQL fetch failed for ${slug}:`, error);
    return null;
  }
}

async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchSummariesViaRss(): Promise<HashnodePostSummary[]> {
  const response = await fetchWithTimeout(`${PUBLICATION_URL}/rss.xml`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`RSS feed returned ${response.status}`);
  }

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const posts: HashnodePostSummary[] = [];

  for (const item of items.slice(0, 20)) {
    const post = parseRssItemSummary(item);
    if (post) posts.push(post);
  }

  return posts;
}

async function fetchPostsViaRss(): Promise<HashnodePost[]> {
  const response = await fetchWithTimeout(`${PUBLICATION_URL}/rss.xml`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`RSS feed returned ${response.status}`);
  }

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  const posts: HashnodePost[] = [];

  for (const item of items.slice(0, 20)) {
    const post = parseRssItem(item);
    if (post) posts.push(post);
  }

  return posts;
}

async function fetchPostViaRss(slug: string): Promise<HashnodePost | null> {
  const posts = await fetchPostsViaRss();
  return posts.find((p) => p.slug === slug) ?? null;
}

async function fetchSummariesViaGraphQL(): Promise<HashnodePostSummary[]> {
  const data = await gqlRequest(GET_POSTS_SUMMARY_QUERY);
  const edges = data.data?.publication?.posts?.edges;

  if (!Array.isArray(edges)) {
    throw new Error('Invalid GraphQL response format');
  }

  return edges.map(({ node }: { node: Record<string, unknown> }) => ({
    slug: node.slug as string,
    title: node.title as string,
    publishedAt: (node.publishedAt as string) ?? '',
  }));
}

async function fetchPostsViaGraphQL(): Promise<HashnodePost[]> {
  const data = await gqlRequest(`
    query GetPosts {
      publication(host: "${PUBLICATION_HOST}") {
        posts(first: 20) {
          edges {
            node {
              slug
              title
              publishedAt
              content { markdown }
            }
          }
        }
      }
    }
  `);
  const edges = data.data?.publication?.posts?.edges;

  if (!Array.isArray(edges)) {
    throw new Error('Invalid GraphQL response format');
  }

  return edges.map(({ node }: { node: Record<string, unknown> }) => mapGraphQLNode(node));
}

async function fetchPostViaGraphQL(slug: string): Promise<HashnodePost | null> {
  const data = await gqlRequest(GET_POST_QUERY, { slug });
  const node = data.data?.publication?.post;

  if (!node) return null;

  return mapGraphQLNode(node as Record<string, unknown>, slug);
}

function mapGraphQLNode(node: Record<string, unknown>, slugOverride?: string): HashnodePost {
  const markdown = (node.content as { markdown?: string })?.markdown ?? '';

  return {
    slug: (slugOverride ?? node.slug) as string,
    title: node.title as string,
    publishedAt: (node.publishedAt as string) ?? '',
    body: stripImagesFromContent(markdown),
  };
}

async function gqlRequest(query: string, variables?: Record<string, string>) {
  const response = await fetchWithTimeout('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
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

  return data;
}

function parseRssItemSummary(item: string): HashnodePostSummary | null {
  const titleMatch =
    item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ??
    item.match(/<title>(.*?)<\/title>/);
  const linkMatch = item.match(/<link>(.*?)<\/link>/);
  const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

  if (!titleMatch || !linkMatch) return null;

  const url = linkMatch[1].trim();
  const slug = url.replace(/\/$/, '').split('/').pop() ?? '';
  if (!slug) return null;

  return {
    slug,
    title: titleMatch[1].trim(),
    publishedAt: pubDateMatch?.[1] ?? '',
  };
}

function parseRssItem(item: string): HashnodePost | null {
  const summary = parseRssItemSummary(item);
  if (!summary) return null;

  const contentMatch =
    item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ??
    item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);

  const rawBody = contentMatch?.[1] ?? '';

  return {
    ...summary,
    body: stripImagesFromContent(htmlToPlainText(rawBody)),
  };
}

export function stripImagesFromContent(content: string): string {
  return content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function htmlToPlainText(html: string): string {
  return html
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export function formatPostDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function summaryToPost(summary: HashnodePostSummary, body = ''): HashnodePost {
  return { ...summary, body };
}
