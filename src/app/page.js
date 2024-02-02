import { db } from "./_lib/db";


export default async function Home() {
  const users = await db.query("SELECT * FROM profiles");

  return (
    <main>
      <div>
      <h1>{users.rows[0]?.username}</h1>
      <p>Welcome to Yet Another Social Media App...</p></div>
    </main>
  );
}
