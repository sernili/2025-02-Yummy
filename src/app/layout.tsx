import type { Metadata } from "next";
import { Inter, Knewave, Caveat } from "next/font/google";
import "./globals.css";
import Banner from "@components/banner";
import Header from "@components/header";

// Fonts
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const caveat = Caveat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const knewave = Knewave({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

// Metadata
export const metadata: Metadata = {
  title: "Yummy",
  description: "Recipes and Meal Planner",
};

// RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${knewave.variable} ${caveat.variable}`}
    >
      <body
        className={
          "bg-secondary p-[min(1rem, 8%)] m-0 flex min-h-screen flex-col items-center justify-center overflow-scroll font-sans"
        }
      >
        <div className="w-full max-w-[80rem] p-4">
          <Header />
          <Banner />
          {children}
        </div>
      </body>
    </html>
  );
}
