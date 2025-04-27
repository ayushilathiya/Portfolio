import { NextResponse } from "next/server";

export async function GET() {
  const username = "ayushilathiya";
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  return NextResponse.json({
    repos: data.public_repos,
    followers: data.followers,
    stars: data.public_gists, // You might want to calculate actual stars from repos
  });
}
