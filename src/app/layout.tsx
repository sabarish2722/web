
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/landing/Footer"; 
import Header from "@/components/landing/Header"; 

export const metadata: Metadata = {
  title: "macs11 - Your City, Simplified",
  description:
    "India's hyperlocal platform for daily essentials, fitness, shopping, and tech services.",
};

const GA_MEASUREMENT_ID = "G-BY186VXK57";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        {GA_MEASUREMENT_ID && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        <Header />
        <main className="flex-grow">{children}</main>
        <WhatsAppButton phoneNumber="8919702207" />
        <Toaster />
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
