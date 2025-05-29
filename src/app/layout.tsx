import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';
import { Header } from "@/components/header";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <Script src="https://cdn.botpress.cloud/webchat/v2.4/inject.js" />
        <Script src="https://files.bpcontent.cloud/2025/05/16/23/20250516233139-426WK0YA.js" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <NextTopLoader color="#ff7f00" />
          <main className="text-foreground bg-background h-screen flex flex-col p-16">
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
