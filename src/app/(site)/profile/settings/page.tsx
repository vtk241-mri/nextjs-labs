import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function ProfileSettingsPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Profile settings</Typography>
      <Card className="content-panel" variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" fullWidth />
            <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
