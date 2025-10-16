"use client";
import { Loader } from "@/components/blocks/loader";
import { ThemeProvider } from "@/providers/theme-provider";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader />}>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </SessionProvider>
    </Suspense>
  );
}
