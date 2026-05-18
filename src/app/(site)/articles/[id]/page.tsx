import { notFound } from "next/navigation";
import { Box, Button, Card, CardContent, Chip, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { getPost, getPostComments } from "@/lib/jsonPlaceholder";
import type { Params } from "@/types/page";

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1)
  }));
}

export const dynamicParams = false;

export default async function ArticleDetailsPage({ params }: Params<{ id: string }>) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isInteger(postId) || postId < 1) {
    notFound();
  }

  const [post, comments] = await Promise.all([getPost(postId), getPostComments(postId)]);

  if (!post.id) {
    notFound();
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Button href="/articles" sx={{ mb: 2 }}>
          Back to articles
        </Button>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`Post ${post.id}`} color="primary" variant="outlined" />
          <Chip label={`User ${post.userId}`} variant="outlined" />
        </Stack>
        <Typography variant="h1" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography color="text.secondary">{post.body}</Typography>
      </Box>

      <Card className="content-panel" variant="outlined">
        <CardContent>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Comments
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id} disableGutters alignItems="flex-start">
                <ListItemText
                  primary={comment.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {comment.email}
                      </Typography>
                      <br />
                      {comment.body}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
}
