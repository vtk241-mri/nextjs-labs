import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export type Params<T extends Record<string, string>> = {
  params: Promise<T>;
};
