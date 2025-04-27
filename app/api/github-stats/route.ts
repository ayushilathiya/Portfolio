export const dynamic = "force-static";

import { NextResponse } from "next/server";

export async function GET() {
  const username = "ayushilathiya";

  const userResponse = await fetch(`https://api.github.com/users/${username}`);
  const userData = await userResponse.json();

  const reposResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const reposData = await reposResponse.json();

  const totalStars = reposData.reduce(
    (acc: number, repo: any) => acc + repo.stargazers_count,
    0
  );

  return NextResponse.json({
    repos: userData.public_repos,
    followers: userData.followers,
    stars: totalStars,
  });
}
