import { db } from "@/app/_lib/db";
import Link from "next/link";

export default async function VisitProfilePage({ params }) {
  // const profileRes = await db.query("SELECT * FROM profiles WHERE id = $1", [
  //   params.id,
  // ]);
  // const profPage = profileRes?.rows[0];
  // if (!profPage) {
  //   notFound();
  // }
  const profilesRes = await db.query("SELECT * FROM profiles");
  const profiles = profilesRes.rows;

  return (
    <div className="visit-box">
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
