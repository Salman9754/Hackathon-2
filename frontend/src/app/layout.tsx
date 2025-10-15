import { RootProvider } from "./provider";
import type { Metadata } from "next";
import "../index.css";
import { PropsWithChildren } from "react";



export const metadata: Metadata = {
  title: "Hackathon",
  description: "Hackathon Project",
};

export default function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`antialiased`}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
