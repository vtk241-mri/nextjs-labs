import ArticleIcon from "@mui/icons-material/Article";
import { Button, Card, CardActions, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { Post } from "@/types/jsonPlaceholder";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip icon={<ArticleIcon />} label={`Post ${post.id}`} size="small" />
          <Chip label={`User ${post.userId}`} size="small" variant="outlined" />
        </Stack>
        <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography color="text.secondary">{post.body}</Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button href={`/articles/${post.id}`}>Details</Button>
      </CardActions>
    </Card>
  );
}
