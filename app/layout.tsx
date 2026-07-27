import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import 'katex/dist/katex.min.css';
import GlobalObserver from "../components/ui/GlobalObserver";
import Glossary from "../components/ui/Glossary";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap"
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://praneetgogoi.vercel.app'),
  title: "Neural Debris Removal",
  description: "Forensic recovery of a poisoned sky.",
  openGraph: {
    title: "Neural Debris Removal",
    description: "Forensic recovery of a poisoned sky.",
    url: "https://praneetgogoi.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 800,
        alt: "Detection field visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Debris Removal",
    description: "Forensic recovery of a poisoned sky.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${ibmPlexMono.variable}`}>
      <body>
        <GlobalObserver />
        {children}
        <Glossary />
      </body>
    </html>
  );
}
