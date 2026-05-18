import { NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";

export async function GET() {
  const rows = await db.select().from(posts).orderBy(desc(posts.id)).limit(100);
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { userId, title, body } = (payload ?? {}) as {
    userId?: unknown;
    title?: unknown;
    body?: unknown;
  };

  if (
    typeof userId !== "number" ||
    typeof title !== "string" ||
    typeof body !== "string" ||
    !title.trim() ||
    !body.trim()
  ) {
    return NextResponse.json(
      { error: "userId (number), title (string), body (string) are required" },
      { status: 400 },
    );
  }

  const [{ nextId }] = await db
    .select({ nextId: sql<number>`coalesce(max(${posts.id}), 0) + 1` })
    .from(posts);

  const [created] = await db
    .insert(posts)
    .values({ id: nextId, userId, title: title.trim(), body: body.trim() })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
