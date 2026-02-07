import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import ReduxProvider from "@/redux/Provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GIMGreen Dashboard",
  description: "GIMGreen Admin Dashboard System",
  openGraph: {
    title: "GIMGreen Dashboard",
    description: "Modern Admin Dashboard for GIMGreen",
    url: "https://gimgreen-dashboard.vercel.app",
    siteName: "GIMGreen",
    images: [
      {
        url: "https://gimgreen-dashboard.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GIMGreen Dashboard",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ReduxProvider>
          <Toaster position="top-center" richColors />
          <Providers>
            <NextTopLoader color="#5750F1" showSpinner={false} />
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
                <Header />
                <main className="mx-auto w-full max-w-screen-3xl overflow-hidden p-4 md:p-6">
                  {children}
                </main>
              </div>
            </div>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
