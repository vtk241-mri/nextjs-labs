import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

export default function ProfileSecurityPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Security</Typography>
      <Card className="content-panel" variant="outlined">
        <CardContent>
          <Stack spacing={2}>
            <TextField label="Current password" type="password" fullWidth />
            <TextField label="New password" type="password" fullWidth />
            <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
              Update
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
