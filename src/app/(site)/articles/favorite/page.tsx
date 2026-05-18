import { Suspense } from "react";
import { Stack, Typography } from "@mui/material";
import { FavoriteArticle } from "@/ui/components/articles/FavoriteArticle";
import { FavoriteArticleSkeleton } from "@/ui/components/articles/FavoriteArticleSkeleton";

const favoriteIds = [3, 7, 10];

export default function FavoriteArticlesPage() {
  return (
    <Stack spacing={3}>
      <div className="section-heading">
        <Typography variant="h1">Favorite articles</Typography>
        <Typography color="text.secondary">Each card loads independently</Typography>
      </div>
      {favoriteIds.map((id) => (
        <Suspense key={id} fallback={<FavoriteArticleSkeleton />}>
          <FavoriteArticle id={id} />
        </Suspense>
      ))}
    </Stack>
  );
}
