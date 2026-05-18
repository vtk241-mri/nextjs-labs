export async function jsonFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function sendJSON<T>(
  url: string,
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  body?: unknown,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const payload = (await res.json().catch(() => null)) as
    | (T & { error?: string })
    | { error?: string }
    | null;
  if (!res.ok) {
    throw new Error(payload?.error ?? `${method} ${url} → ${res.status}`);
  }
  return payload as T;
}
