import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divyakc.portfolio"),
  title: {
    default: "Divya KC — Creative Director & Digital Marketing Specialist",
    template: "%s | Divya KC",
  },
  description:
    "Divya KC is a Creative Director & Digital Marketing Specialist creating human-centred brands that matter. Sydney, Australia / Kathmandu, Nepal.",
  keywords: [
    "Creative Director",
    "Digital Marketing",
    "Brand Strategy",
    "Divya KC",
    "Sydney",
    "Kathmandu",
    "Portfolio",
  ],
  authors: [{ name: "Divya KC" }],
  openGraph: {
    title: "Divya KC — Creative Director & Digital Marketing Specialist",
    description:
      "Where creativity meets strategy to build brands that matter.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya KC — Creative Director & Digital Marketing Specialist",
    description: "Where creativity meets strategy to build brands that matter.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar nav={getContent().nav} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
