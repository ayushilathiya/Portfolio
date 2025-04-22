import { NextResponse } from "next/server";

// Add these exports to make the API route work with static exports
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HASHNODE_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          {
            publication(host: "ayushilathiya.hashnode.dev") {
              posts(first: 10) {
                edges {
                  node {
                    title
                    subtitle
                    slug
                    publishedAt
                    views
                    coverImage {
                      url
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
    console.log("API Response:", data); // For debugging

    if (!data.data?.publication?.posts?.edges) {
      throw new Error("Invalid response format");
    }

    const posts = data.data.publication.posts.edges.map(({ node }: any) => {
      return {
        title: node.title,
        subtitle: node.subtitle,
        slug: node.slug,
        dateAdded: node.publishedAt,
        views: node.views,
        coverImage: node.coverImage?.url || "",
      };
    });

    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
