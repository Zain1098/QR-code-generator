import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "QRForge";

export const metadata: Metadata = {
  title: {
    default: `${appName} - Create Powerful QR Codes in Seconds`,
    template: `%s | ${appName}`,
  },
  description:
    "Create, customize, and manage QR codes with advanced styling, dynamic links, and analytics. Free QR code generator for URLs, WiFi, vCards, events, and more.",
  keywords: [
    "QR code generator",
    "free QR code generator",
    "dynamic QR code",
    "QR code creator",
    "QR code with logo",
    "WiFi QR code",
    "vCard QR code",
    "custom QR code",
  ],
  openGraph: {
    title: `${appName} - Create Powerful QR Codes in Seconds`,
    description:
      "Create, customize, and manage QR codes with advanced styling, dynamic links, and analytics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} - Create Powerful QR Codes in Seconds`,
    description:
      "Create, customize, and manage QR codes with advanced styling, dynamic links, and analytics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
