import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Dock } from "@/components/dock";
import { Footer } from "@/components/sections/footer";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vevaar | वेवार ",
  description: "Half-dev , half-vibe. Writes clean code on a clean desk.Living proof you can debug and chill.",
  openGraph: {
    images: "/og-image.png",
  },
};

// Export viewport separately
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
         <Analytics />
        <SpeedInsights />
        <div className="fixed bottom-10 left-0 right-0 flex justify-center">
          <Dock />
        </div>
      </body>
      <footer>
        <Footer/>
      </footer>
    </html>
  );
}