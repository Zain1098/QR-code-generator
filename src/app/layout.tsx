import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "FORM // QR";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://formqr.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} — Precision Matrix & High-Density QR Specimen Generator`,
    template: `%s | ${appName}`,
  },
  description:
    "Engineering-grade QR code utility for press packaging, brand collateral, and digital systems. Certified optical legibility, ISO 18004 compliance, vector SVG export, and dynamic analytics.",
  keywords: [
    "QR code generator",
    "vector QR code SVG",
    "print ready QR code",
    "ISO 18004 QR code",
    "high density matrix generator",
    "vCard QR code",
    "WiFi QR generator",
    "dynamic QR codes",
    "commercial QR designer",
    "free vector QR code",
  ],
  authors: [{ name: "FORM // QR Atelier" }],
  creator: "FORM // QR",
  publisher: "FORM // QR Craft Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${appName} — Precision Matrix & High-Density QR Generator`,
    description:
      "Configure high-density matrix codes for print packaging, brand identities, and physical collateral with certified optical legibility.",
    url: siteUrl,
    siteName: appName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} — Precision Matrix & High-Density QR Generator`,
    description:
      "Engineering-grade QR code utility with certified optical legibility and vector SVG export.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebapp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FORM // QR Studio",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Vector SVG and high-resolution PNG/WebP exports",
      "ISO/IEC 18004 error recovery up to 30% (Level H)",
      "Real-time WCAG AAA contrast ratio calculation",
      "12 payload schemas including URL, vCard, Wi-Fi, WhatsApp, and Payment",
      "Substrate print calibration presets",
      "Zero registration loss guarantee"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the minimum recommended print size for a physical QR code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For standard optical smartphone cameras, the minimum scannable dimension is 20 × 20 mm (approx. 0.8 × 0.8 inches) for low-density payloads (such as short URLs). For higher density payloads like vCards, a minimum print size of 35 × 35 mm is recommended with Reed-Solomon Error Correction Level H."
        }
      },
      {
        "@type": "Question",
        "name": "Why is vector SVG export critical for physical print packaging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vector SVG encodes paths mathematically rather than as fixed pixel rasters. This guarantees crisp, un-blurred edges at any press resolution (from 300 DPI litho to large-format outdoor billboards) without pixelation or scanning degradation."
        }
      },
      {
        "@type": "Question",
        "name": "How does WCAG contrast verification ensure QR scannability?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Optical CMOS image sensors require substantial photometric contrast between the foreground matrix and the substrate background. A contrast ratio of at least 4.5:1 (WCAG AA) is required, while 7:1+ (WCAG AAA) guarantees instant recognition even under low ambient light."
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="font-sans antialiased bg-canvas-paper dark:bg-dark-canvas text-ink-primary dark:text-dark-ink-primary min-h-screen transition-colors duration-200">
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
