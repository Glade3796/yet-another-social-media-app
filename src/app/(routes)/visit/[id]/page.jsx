import { db } from "@/app/_lib/db";

export default async function VisitProfilePage({ params }) {
  const profRes = await db.query("SELECT * FROM profiles WHERE id = $1", [
    params.id,
  ]);
  const profile = profRes?.rows[0];
  if (!profile) {
    notFound();
  }

  const postsRes = await db.query("SELECT * FROM posts WHERE user_id = $1", [
    params.id,
  ]);
  const posts = postsRes.rows;
  return (
    <main>
      <div>
        <h3>Username: {profile.username}</h3>
        <p>Bio: {profile.biography}</p>
      </div>
      <div>
        <h3>{profile.username}&apos;s posts:</h3>
        {posts.map((post) => (
          <p key={post.id}>{post.content}</p>
        ))}
      </div>
    </main>
  );
}
