import type { Metadata } from "next";
import { Roboto, Knewave, Caveat } from "next/font/google";
import "./globals.css";
import Banner from "@components/banner";
import Header from "@components/header";

// Fonts
const roboto = Roboto({
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
      className={`${roboto.variable} ${knewave.variable} ${caveat.variable}`}
    >
      <body
        className={
          "bg-secondary min-h-screen overflow-hidden p-4 font-sans antialiased"
        }
      >
        <Header />
        <Banner />
        {children}
      </body>
    </html>
  );
}
