import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";

import { db } from "@/app/_lib/db";
import CreateProfile from "@/app/components/CreateProfile";

export default async function DashboardLayout({ children }) {
  const { userId } = auth();
  const profileResult = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );

  return (
    <main>
      <header>
        <h1>{profileResult.rows[0].username}</h1>
      </header>
      {/* has account */}
      {profileResult.rowCount !== 0 && children}
      {/* no account */}
      {profileResult.rowCount === 0 && <CreateProfile />}
    </main>
  );
}
