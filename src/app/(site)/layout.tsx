import type { LayoutProps } from "@/types/page";
import { SiteLayoutShell } from "@/ui/components/navigation/AppNavigation";

export default function SiteLayout({ children }: LayoutProps) {
  return <SiteLayoutShell>{children}</SiteLayoutShell>;
}
