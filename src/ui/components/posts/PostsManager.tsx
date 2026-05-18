"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import type { Post } from "@/db/schema";

type DraftPost = { userId: string; title: string; body: string };

const emptyDraft: DraftPost = { userId: "1", title: "", body: "" };

export function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftPost>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", { cache: "no-store" });
      if (!res.ok) throw new Error(`GET /api/posts → ${res.status}`);
      setPosts((await res.json()) as Post[]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(draft.userId),
          title: draft.title,
          body: draft.body,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? `POST → ${res.status}`);
      setDraft(emptyDraft);
      setPosts((prev) => [json as Post, ...prev]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(`Delete post #${id}?`)) return;
    setError(null);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error ?? `DELETE → ${res.status}`);
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/posts/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editing.title, body: editing.body }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? `PATCH → ${res.status}`);
      const updated = json as Post;
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditing(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h2" sx={{ mb: 2 }}>
            New post
          </Typography>
          <Box component="form" onSubmit={handleCreate} sx={{ display: "grid", gap: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="User ID"
                type="number"
                value={draft.userId}
                onChange={(e) => setDraft({ ...draft, userId: e.target.value })}
                inputProps={{ min: 1 }}
                required
                sx={{ maxWidth: { sm: 160 } }}
              />
              <TextField
                label="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                required
                fullWidth
              />
            </Stack>
            <TextField
              label="Body"
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              required
              multiline
              minRows={3}
            />
            <Box>
              <Button type="submit" variant="contained" disabled={submitting}>
                {submitting ? "Saving..." : "Create post"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">All posts ({posts.length})</Typography>
        <Button onClick={() => void load()} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </Stack>

      <Stack spacing={2}>
        {posts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                #{post.id} · user {post.userId}
              </Typography>
              <Typography variant="h3" sx={{ mt: 0.5 }}>
                {post.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {post.body}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton aria-label="edit" onClick={() => setEditing(post)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => void handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
        {!loading && posts.length === 0 && (
          <Typography color="text.secondary">No posts yet — create one above.</Typography>
        )}
      </Stack>

      <Dialog open={editing !== null} onClose={() => setEditing(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit post #{editing?.id}</DialogTitle>
        <Box component="form" onSubmit={handleUpdate}>
          <DialogContent sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Title"
              value={editing?.title ?? ""}
              onChange={(e) =>
                setEditing((prev) => (prev ? { ...prev, title: e.target.value } : prev))
              }
              required
              fullWidth
            />
            <TextField
              label="Body"
              value={editing?.body ?? ""}
              onChange={(e) =>
                setEditing((prev) => (prev ? { ...prev, body: e.target.value } : prev))
              }
              required
              multiline
              minRows={4}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Stack>
  );
}
