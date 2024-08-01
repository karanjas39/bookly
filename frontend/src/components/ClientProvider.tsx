// /src/components/ClientProviders.tsx
"use client";

import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProvidersProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};

export default ClientProvider;
