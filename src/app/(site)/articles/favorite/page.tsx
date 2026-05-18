import { Suspense } from "react";
import { Stack, Typography } from "@mui/material";
import { FavoriteArticle } from "@/ui/components/articles/FavoriteArticle";
import { FavoriteArticleSkeleton } from "@/ui/components/articles/FavoriteArticleSkeleton";

const favoriteIds = [3, 7, 10];

export default function FavoriteArticlesPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Favorite articles</Typography>
      {favoriteIds.map((id) => (
        <Suspense key={id} fallback={<FavoriteArticleSkeleton />}>
          <FavoriteArticle id={id} />
        </Suspense>
      ))}
    </Stack>
  );
}
