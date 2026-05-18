import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" });
config({ path: ".env", override: false });

import { comments, posts } from "./schema";
import type { NewComment, NewPost } from "./schema";

type JsonPost = { userId: number; id: number; title: string; body: string };
type JsonComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in .env.local");
  }

  console.log("→ Connecting to database...");
  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema: { posts, comments } });

  const ping = (await sql`select now() as now, current_database() as db`) as Array<{
    now: string;
    db: string;
  }>;
  console.log(`✅ Connected to "${ping[0].db}" at ${ping[0].now}`);

  console.log("→ Fetching seed data from JSONPlaceholder...");
  const [postsRes, commentsRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/comments"),
  ]);

  if (!postsRes.ok || !commentsRes.ok) {
    throw new Error("Failed to fetch seed data from JSONPlaceholder");
  }

  const postsData: JsonPost[] = await postsRes.json();
  const commentsData: JsonComment[] = await commentsRes.json();

  console.log("→ Clearing existing rows...");
  await db.delete(comments);
  await db.delete(posts);

  console.log(`→ Inserting ${postsData.length} posts...`);
  const postRows: NewPost[] = postsData.map((p) => ({
    id: p.id,
    userId: p.userId,
    title: p.title,
    body: p.body,
  }));
  await db.insert(posts).values(postRows);

  console.log(`→ Inserting ${commentsData.length} comments...`);
  const commentRows: NewComment[] = commentsData.map((c) => ({
    id: c.id,
    postId: c.postId,
    name: c.name,
    email: c.email,
    body: c.body,
  }));
  const chunkSize = 200;
  for (let i = 0; i < commentRows.length; i += chunkSize) {
    await db.insert(comments).values(commentRows.slice(i, i + chunkSize));
  }

  console.log(
    `✅ Seed complete: ${postRows.length} posts, ${commentRows.length} comments`,
  );
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
