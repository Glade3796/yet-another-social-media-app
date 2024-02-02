import { db } from "@/app/_lib/db";
import Link from "next/link";

export default async function VisitProfilePage() {
  const profilesRes = await db.query("SELECT * FROM profiles");
  const profiles = profilesRes.rows;
  return (
    <div>
      <h1>Visit Profiles:</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id + profile.username}>
            <Link href={`/visit/${profile.id}`}>{profile.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
