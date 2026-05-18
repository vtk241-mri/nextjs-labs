import { Typography } from "@mui/material";

import { PostsManager } from "@/ui/components/posts/PostsManager";

export const dynamic = "force-dynamic";

export default function PostsPage() {
  return (
    <>
      <div className="section-heading">
        <Typography variant="h1">Posts</Typography>
      </div>
      <PostsManager />
    </>
  );
}
