import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { getPost } from "@/lib/jsonPlaceholder";

export async function FavoriteArticle({ id }: { id: number }) {
  const post = await getPost(id);

  return (
    <Card className="article-card" variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`Favorite ${post.id}`} size="small" color="secondary" variant="outlined" />
          <Chip label={`User ${post.userId}`} size="small" />
        </Stack>
        <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography color="text.secondary">{post.body}</Typography>
      </CardContent>
    </Card>
  );
}
