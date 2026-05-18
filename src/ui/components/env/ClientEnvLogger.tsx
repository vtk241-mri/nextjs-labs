"use client";

import { useEffect } from "react";

export function ClientEnvLogger() {
  useEffect(() => {
    console.log("Browser env NEXT_PUBLIC_CLIENT_MESSAGE:", process.env.NEXT_PUBLIC_CLIENT_MESSAGE);
  }, []);

  return null;
}
