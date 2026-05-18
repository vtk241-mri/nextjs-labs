import type { LayoutProps } from "@/types/page";
import { ArticlesLayoutShell } from "@/ui/components/navigation/AppNavigation";

export default function ArticlesLayout({ children }: LayoutProps) {
  return <ArticlesLayoutShell>{children}</ArticlesLayoutShell>;
}
