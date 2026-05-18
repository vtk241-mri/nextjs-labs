import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Card, CardContent, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { ClientEnvLogger } from "@/ui/components/env/ClientEnvLogger";

export default function HomePage() {
  console.log("Server env APP_ENV:", process.env.APP_ENV);
  console.log("Server env SERVER_MESSAGE:", process.env.SERVER_MESSAGE);
  console.log("Server env NEXT_PUBLIC_CLIENT_MESSAGE:", process.env.NEXT_PUBLIC_CLIENT_MESSAGE);

  const envValues = [
    {
      label: "APP_ENV",
      value: process.env.APP_ENV
    },
    {
      label: "SERVER_MESSAGE",
      value: process.env.SERVER_MESSAGE
    },
    {
      label: "NEXT_PUBLIC_CLIENT_MESSAGE",
      value: process.env.NEXT_PUBLIC_CLIENT_MESSAGE
    }
  ];

  return (
    <Box className="page-shell text-ink">
      <ClientEnvLogger />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={6}>
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

          <Paper className="content-panel hero-panel" variant="outlined" sx={{ p: { xs: 3, md: 6 } }}>
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={3}>
                  <span className="hero-kicker">App Router practice</span>
                  <Typography className="hero-title" component="h1">
                    Build, read, save.
                  </Typography>
                  <Typography color="text.secondary" sx={{ maxWidth: 620, fontSize: "1.08rem" }}>
                    A responsive article workspace with nested layouts, active navigation,
                    remote data fetching and statically generated article pages.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button href="/articles" variant="contained" endIcon={<ArrowForwardIcon />}>
                      Open articles
                    </Button>
                    <Button href="/profile/settings" variant="outlined">
                      Profile
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <div className="visual-board">
                  <span />
                </div>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            {["Nested layouts", "Remote posts", "Static pages"].map((item) => (
              <Grid key={item} size={{ xs: 12, md: 4 }}>
                <Paper className="content-panel" variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h3">{item}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper className="content-panel" variant="outlined" sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={2}>
              <Typography variant="h2">Environment variables</Typography>
              <Grid container spacing={2}>
                {envValues.map((item) => (
                  <Grid key={item.label} size={{ xs: 12, md: 4 }}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="overline" color="primary" sx={{ fontWeight: 800 }}>
                          {item.label}
                        </Typography>
                        <Typography sx={{ mt: 1, wordBreak: "break-word" }}>
                          {item.value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
