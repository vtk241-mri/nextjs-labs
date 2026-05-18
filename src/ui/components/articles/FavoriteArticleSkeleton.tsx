import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export function FavoriteArticleSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Skeleton variant="rounded" width={140} height={28} />
          <Skeleton variant="text" height={34} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
        </Stack>
      </CardContent>
    </Card>
  );
}
