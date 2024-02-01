import { db } from "./_lib/db";

export default async function Home() {
  const users = await db.query("SELECT * FROM profiles");

  return (
    <main>
      <h1>{users.rows[0].username}</h1>
    </main>
  );
}
