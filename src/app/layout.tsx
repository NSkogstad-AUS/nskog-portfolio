import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { ViewTransitions } from 'next-view-transitions'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeInitializer } from "./components/ThemeInitialiser";

const siteUrl = process.env.URL ? new URL(process.env.URL) : new URL("http://localhost:3000");
const thumbnail = "/assets/sc-thumbnail.png";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Nicolai's Corner",
  description: "Personal site",
  openGraph: {
    title: "Nicolai's Corner",
    description: "Personal site",
    images: [
      {
        url: thumbnail,
        width: 1200,
        height: 630,
        alt: "Nicolai's Corner portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolai's Corner",
    description: "Personal site",
    images: [thumbnail],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
        <html lang="en">
      <body>
        <ThemeInitializer />
        <header>
          <Navbar/>
        </header>
        <main>{children}</main>
      </body>
    </html>
    </ViewTransitions>
  );
}
