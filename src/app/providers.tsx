"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'nextjs-toploader/app';
import { ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import dynamic from "next/dynamic";
import { ImageKitProvider } from "imagekitio-next";
import { authorizeImageKit } from "@/components/settings/actions";

const SessionProvider = dynamic(() => import("next-auth/react").then((mod) => mod.SessionProvider), { ssr: false });

export interface ProvidersProps {
  themeProps?: ThemeProviderProps;
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={router.push}>
          <ImageKitProvider publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY} urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT} authenticator={authorizeImageKit}>
            {children}
          </ImageKitProvider>
        </NextUIProvider>
        <Toaster />
      </QueryClientProvider>
    </SessionProvider>
  );
}
