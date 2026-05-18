"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import type { Post } from "@/db/schema";

type Props = {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
};

export function PostCardEditable({ post, onEdit, onDelete }: Props) {
  return (
    <Card
      className="article-card"
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`Post ${post.id}`} size="small" color="primary" variant="outlined" />
          <Chip label={`User ${post.userId}`} size="small" variant="outlined" />
        </Stack>
        <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: "flex-end" }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(post)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(post)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
