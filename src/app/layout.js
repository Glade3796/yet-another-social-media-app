import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignOutButton, UserButton, auth } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { db } from "./_lib/db";
import CreateProfile from "./components/CreateProfile";
import Link from "next/link";

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
            <Link href="/dashboard">
              <h1>YASMA</h1>
            </Link>
            <UserButton afterSignOutUrl="/" />
            
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
