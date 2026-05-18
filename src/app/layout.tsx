import type { Metadata } from "next";
import { LayoutProps } from "@/types/page";
import { AppThemeProvider } from "@/ui/theme/AppThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next App",
  description: "Next.js App Router"
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
