import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function CreateArticlePage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Create article</Typography>
      <Card className="content-panel" variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Title" fullWidth />
            <TextField label="Short description" fullWidth multiline minRows={4} />
            <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
