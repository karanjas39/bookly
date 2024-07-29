"use client";

import { type ReactNode } from "react";
import { ThemeProvider as Provider } from "next-themes";

function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </Provider>
  );
}

export default ThemeProvider;
