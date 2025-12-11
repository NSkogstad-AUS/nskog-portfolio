import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { ViewTransitions } from 'next-view-transitions'
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeInitializer } from "./components/ThemeInitialiser";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal site",
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
