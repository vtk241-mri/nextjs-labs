"use client";

import ArticleIcon from "@mui/icons-material/Article";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockIcon from "@mui/icons-material/Lock";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavItem = {
  title: string;
  href: string;
  icon: SvgIconComponent;
};

const mainItems: NavItem[] = [
  { title: "Articles", href: "/articles", icon: ArticleIcon },
  { title: "Settings", href: "/profile/settings", icon: SettingsIcon },
  { title: "Security", href: "/profile/security", icon: LockIcon }
];

const articleItems: NavItem[] = [
  { title: "Favorite", href: "/articles/favorite", icon: FavoriteIcon },
  { title: "Create", href: "/articles/create", icon: PlaylistAddIcon }
];

function NavList({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <List disablePadding sx={{ display: "grid", gap: 0.75 }}>
      {items.map((item) => {
        const selected = item.href === "/articles" ? pathname === item.href : pathname === item.href;
        const Icon = item.icon;

        return (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={selected}
            sx={{ borderRadius: 1, minHeight: 44 }}
          >
            <ListItemIcon sx={{ minWidth: 38 }}>
              <Icon color={selected ? "primary" : "inherit"} fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: selected ? 700 : 500 }} />
          </ListItemButton>
        );
      })}
    </List>
  );
}

export function SiteLayoutShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid #ded7cd",
          bgcolor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <Box sx={{ maxWidth: 1180, mx: "auto", px: 3, py: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={Link} href="/" color="inherit" sx={{ fontWeight: 800 }}>
            Home
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1180,
          mx: "auto",
          px: 3,
          py: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px minmax(0, 1fr)" },
          gap: 3
        }}
      >
        <Paper component="aside" variant="outlined" sx={{ p: 2, alignSelf: "start" }}>
          <Typography variant="overline" color="text.secondary" sx={{ px: 1 }}>
            Menu
          </Typography>
          <NavList items={mainItems} />
        </Paper>
        <Box component="main">{children}</Box>
      </Box>
    </Box>
  );
}

export function ArticlesLayoutShell({ children }: { children: ReactNode }) {
  return (
    <Stack spacing={3}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h2">Articles</Typography>
          </Box>
          <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", sm: "block" } }} />
          <Box sx={{ minWidth: { sm: 260 } }}>
            <NavList items={articleItems} />
          </Box>
        </Stack>
      </Paper>
      {children}
    </Stack>
  );
}
