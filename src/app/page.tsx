import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="min-h-screen" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={3}>
          <Box
            component="header"
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Home
            </Typography>
            <Button href="/articles" variant="outlined">
              Articles
            </Button>
          </Box>

          <Typography variant="h1">Home page</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
