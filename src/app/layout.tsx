import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sahyagreens.example.com"),
  applicationName: "Sahya Greens",
  title: "Sahya Greens by Megha Builders & Developers | Wayanad Luxury Estate",
  description:
    "A private Wayanad estate of luxury villa plots, signature villas, farm living, wellness, resort access and slow nature-led living.",
  keywords: [
    "Sahya Greens",
    "Wayanad villa plots",
    "luxury villas Wayanad",
    "farm living Kerala",
    "Megha Builders and Developers"
  ],
  authors: [{ name: "Megha Builders & Developers" }],
  creator: "Megha Builders & Developers",
  publisher: "Megha Builders & Developers",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  category: "Luxury Real Estate",
  openGraph: {
    title: "Sahya Greens | A Place Where Nature Becomes Home",
    description:
      "Luxury villa plots and signature villas in Wayanad shaped around privacy, wellness, resort living and farm-to-table calm.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 1067,
        alt: "Misty green hillside estate"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahya Greens | Luxury Villa Estate in Wayanad",
    description:
      "A quiet estate experience in Wayanad with villas, farm living, wellness amenities and resort privileges."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#173b2f",
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
