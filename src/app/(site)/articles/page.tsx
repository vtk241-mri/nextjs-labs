import { Grid, Stack, Typography } from "@mui/material";
import { getPosts } from "@/lib/jsonPlaceholder";
import { PostCard } from "@/ui/components/articles/PostCard";

export default async function ArticlesPage() {
  const posts = await getPosts();

  return (
    <Stack spacing={3}>
      <div className="section-heading">
        <Typography variant="h1">Articles</Typography>
      </div>
      <Grid container spacing={2}>
        {posts.slice(0, 12).map((post) => (
          <Grid key={post.id} size={{ xs: 12, md: 6 }}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
