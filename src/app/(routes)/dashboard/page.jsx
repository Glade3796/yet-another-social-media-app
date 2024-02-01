import { db } from "@/app/_lib/db";

export default async function Dashboard() {
  const posts = await db.query(`SELECT * FROM posts`);
  console.log("posts", posts);

  return <div>Dashboard</div>;
}
