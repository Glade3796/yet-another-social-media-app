import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { db } from "./_lib/db";
import CreateProfile from "./components/CreateProfile";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yet Another Social Media APP",
  description: "...",
};

export default async function RootLayout({ children }) {
  // const { userId } = auth();
  // const profileResult = await db.query(`SELECT * FROM profiles WHERE id = $1`, [
  //   userId,
  // ]);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <header>
            <h1>{metadata.title}</h1>
            <UserButton afterSignOutUrl="/" />
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
