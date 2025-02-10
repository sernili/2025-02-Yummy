import type { Metadata } from "next";
import { Roboto, Knewave, Caveat } from "next/font/google";
import "./globals.css";

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
      <head>
        <title>React App</title>
        <meta name="description" content="Web site created..." />
      </head>
      {/* <body
        className={`${ptSerif.className} ${montserrat.variable} ${poppins.variable}`}
      ></body> */}
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        {children}
      </body>
      s
    </html>
  );
}
