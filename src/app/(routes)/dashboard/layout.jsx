import { ClerkProvider, SignOutButton, UserButton, auth } from "@clerk/nextjs";

import { db } from "@/app/_lib/db";
import CreateProfile from "@/app/components/CreateProfile";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardLayout({ children }) {
  const { userId } = auth();
  const profileResult = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );

  return (
    <main> <Suspense fallback={<Loading/>}>
      <header>
        <h1>
          <Link href={`/dashboard`}>{profileResult?.rows[0]?.username}</Link>
        </h1>
        <nav>
          <Link href="/dashboard">dashboard</Link>
          <Link href={`/dashboard/user/${profileResult?.rows[0]?.id}`}>
            {profileResult?.rows[0]?.username} profile
          </Link>
        </nav>
        <SignOutButton />
      </header>
      {/* has account */}
      {profileResult.rowCount !== 0 && children}
      {/* no account */}
      {profileResult.rowCount === 0 && <CreateProfile />}
      </Suspense></main>
  );
}
