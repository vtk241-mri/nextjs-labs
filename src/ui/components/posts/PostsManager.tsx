"use client";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Skeleton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import type { Post } from "@/db/schema";
import { jsonFetcher, sendJSON } from "@/lib/swr";

import { PostCardEditable } from "./PostCardEditable";

const POSTS_KEY = "/api/posts";

type DraftPost = { userId: string; title: string; body: string };
const emptyDraft: DraftPost = { userId: "1", title: "", body: "" };

export function PostsManager() {
  const { data: posts, error, isLoading, isValidating } = useSWR<Post[]>(
    POSTS_KEY,
    jsonFetcher,
    { revalidateOnFocus: false },
  );
  const { mutate } = useSWRConfig();

  const [draft, setDraft] = useState<DraftPost>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Post | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function createPost(event: React.FormEvent) {
    event.preventDefault();
    setActionError(null);
    setSubmitting(true);
    try {
      const created = await sendJSON<Post>(POSTS_KEY, "POST", {
        userId: Number(draft.userId),
        title: draft.title,
        body: draft.body,
      });
      await mutate<Post[]>(
        POSTS_KEY,
        (prev) => (prev ? [created, ...prev] : [created]),
        { revalidate: false },
      );
      setDraft(emptyDraft);
      setToast(`Post #${created.id} created`);
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function updatePost(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setActionError(null);
    setSubmitting(true);
    try {
      const updated = await sendJSON<Post>(`${POSTS_KEY}/${editing.id}`, "PATCH", {
        title: editing.title,
        body: editing.body,
      });
      await mutate<Post[]>(
        POSTS_KEY,
        (prev) => prev?.map((p) => (p.id === updated.id ? updated : p)),
        { revalidate: false },
      );
      setEditing(null);
      setToast(`Post #${updated.id} updated`);
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setActionError(null);
    setSubmitting(true);
    try {
      await sendJSON<{ deleted: Post }>(`${POSTS_KEY}/${id}`, "DELETE");
      await mutate<Post[]>(
        POSTS_KEY,
        (prev) => prev?.filter((p) => p.id !== id),
        { revalidate: false },
      );
      setPendingDelete(null);
      setToast(`Post #${id} deleted`);
    } catch (e) {
      setActionError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <Card className="content-panel" variant="outlined">
        <CardContent sx={{ pt: 3 }}>
          <Typography variant="h2" sx={{ mb: 0.5 }}>
            New post
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Sent as <code>POST /api/posts</code>.
          </Typography>
          <Box component="form" onSubmit={createPost} sx={{ display: "grid", gap: 2 }}>
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
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Create post"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {actionError && (
        <Alert severity="error" onClose={() => setActionError(null)}>
          {actionError}
        </Alert>
      )}

      <div className="section-heading">
        <Typography variant="h2">
          All posts {posts ? `(${posts.length})` : ""}
        </Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={() => void mutate(POSTS_KEY)}
          disabled={isValidating}
        >
          {isValidating ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <Alert severity="error">Failed to load posts: {(error as Error).message}</Alert>
      )}

      {isLoading && (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" height={36} />
                <Skeleton variant="rectangular" height={80} sx={{ mt: 1 }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {posts && (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, md: 6 }}>
              <PostCardEditable
                post={post}
                onEdit={setEditing}
                onDelete={setPendingDelete}
              />
            </Grid>
          ))}
          {posts.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography color="text.secondary">
                No posts yet — create one above.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <Dialog
        open={editing !== null}
        onClose={() => setEditing(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit post #{editing?.id}</DialogTitle>
        <Box component="form" onSubmit={updatePost}>
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
              {submitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={pendingDelete !== null} onClose={() => setPendingDelete(null)}>
        <DialogTitle>Delete post #{pendingDelete?.id}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will remove the post and its comments. The action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => void confirmDelete()}
            disabled={submitting}
          >
            {submitting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast !== null}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setToast(null)} variant="filled">
          {toast}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
