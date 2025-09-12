import type { Metadata } from "next";
import { Geist, Geist_Mono, Baumans, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { generateMetadata as generateSEOMetadata, structuredData } from "@/lib/seo-colombia";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { EnhancedScrollTracker } from "@/components/analytics/scroll-tracker";
import { PageTracker, DeviceTracker } from "@/components/analytics/page-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baumans = Baumans({
  variable: "--font-baumans",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata('home');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.organization)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.softwareApplication)
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baumans.variable} ${roboto.variable} antialiased font-roboto`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
        <PageTracker />
        <DeviceTracker />
        <EnhancedScrollTracker />
      </body>
    </html>
  );
}
