import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import contentConfig from "@/config/content.json";

const { site } = contentConfig;

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.nickname} | ${site.title}`,
    template: `%s | ${site.nickname}`,
  },
  description: site.description,
  applicationName: `${site.nickname} Portfolio`,
  authors: [{ name: site.nickname, url: `https://github.com/${site.social.github}` }],
  creator: site.nickname,
  publisher: site.nickname,
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
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    siteName: `${site.nickname} Portfolio`,
    firstName: site.nickname,
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${site.social.twitter}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
