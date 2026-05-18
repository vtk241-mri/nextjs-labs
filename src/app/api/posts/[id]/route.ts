import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";
import type { Params } from "@/types/page";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_request: Request, { params }: Params<{ id: string }>) {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (id === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const [row] = await db.select().from(posts).where(eq(posts.id, id));
  if (!row) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(row);
}

export async function PATCH(request: Request, { params }: Params<{ id: string }>) {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (id === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { title, body, userId } = (payload ?? {}) as {
    title?: unknown;
    body?: unknown;
    userId?: unknown;
  };

  const patch: { title?: string; body?: string; userId?: number } = {};
  if (typeof title === "string" && title.trim()) patch.title = title.trim();
  if (typeof body === "string" && body.trim()) patch.body = body.trim();
  if (typeof userId === "number") patch.userId = userId;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json(
      { error: "Provide at least one of: title, body, userId" },
      { status: 400 },
    );
  }

  const [updated] = await db
    .update(posts)
    .set(patch)
    .where(eq(posts.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params<{ id: string }>) {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (id === null) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const [deleted] = await db.delete(posts).where(eq(posts.id, id)).returning();
  if (!deleted) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted });
}
