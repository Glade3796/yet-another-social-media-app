import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignOutButton,
  UserButton,
  auth,
  currentUser,
} from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { db } from "./_lib/db";
import CreateProfile from "./components/CreateProfile";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yet Another Social Media APP",
  description: "...",
};

export default async function RootLayout({ children }) {
  const { userId } = auth();
  const currUserData = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );
  const currUser = currUserData.rows[0];
  console.log(currentUser);
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
            <nav>
              <Link href="/">Home</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href={`/dashboard/user/${currUser.id}`}>Profile</Link>
              <Link href="/visit">Visit</Link>
            </nav>
            <UserButton afterSignOutUrl="/" />
          </header>
          <Suspense fallback={<h3>...loading :)</h3>}>{children}</Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
