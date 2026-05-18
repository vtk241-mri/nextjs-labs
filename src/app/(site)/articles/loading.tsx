import { Grid, Skeleton, Stack } from "@mui/material";

export default function ArticlesLoading() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="text" width="35%" height={58} />
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid key={item} size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={230} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
