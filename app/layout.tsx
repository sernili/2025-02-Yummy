import type { Metadata } from "next";
import { Inter, Knewave, Caveat } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/global/header";
import Footer from "@/components/global/footer";
import { Recipe } from "@/store/recipes";
import { db } from "@/utils/firebase-server";
import ClientStoreInitializer from "@/components/utils/clientStoreInitializer";
import { RecipeTag } from "@/store/tags";

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

// Server - Recipe Initilization
async function getInitialRecipes(): Promise<Recipe[]> {
  try {
    const recipesSnapshot = await db.collection("recipes").get();
    const recipesData: Recipe[] = [];
    recipesSnapshot.forEach((doc) => {
      recipesData.push({ id: doc.id, ...doc.data() } as Recipe);
    });
    return recipesData;
  } catch (error) {
    console.error("Error fetching initial recipes from Firebase:", error);
    return [];
  }
}

// Server - Tag Initilization
async function getInitialTags(): Promise<RecipeTag[]> {
  try {
    const tagSnapshot = await db.collection("recipeTags").get(); // TODO: put strings for DB names in one file and use everywhere
    const tagData: RecipeTag[] = [];
    tagSnapshot.forEach((doc) => {
      tagData.push({ id: doc.id, ...doc.data() } as RecipeTag);
    });
    return tagData;
  } catch (error) {
    console.error("Error fetching initial recipes from Firebase:", error);
    return [];
  }
}

// RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialRecipes = await getInitialRecipes();
  const initialTags = await getInitialTags();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${knewave.variable} ${caveat.variable}`}
    >
      <body
        className={
          "bg-secondary m-0 flex min-h-screen flex-col items-center overflow-scroll font-sans"
        }
      >
        <div className="h-fit w-full max-w-[80rem] p-[min(1rem,_8%)]">
          <Header />
          <ClientStoreInitializer
            initialRecipes={initialRecipes}
            initialTags={initialTags}
          >
            {children}
          </ClientStoreInitializer>
        </div>
        <Footer />
      </body>
    </html>
  );
}
