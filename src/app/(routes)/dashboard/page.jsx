import { db } from "@/app/_lib/db";
import NewPost from "@/app/components/NewPost";
import PostsWithLikesSection from "@/app/components/PostsWithLikesSection";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Dashboard({ searchParams }) {
  const { userId } = auth();
  const currUserData = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );
  const currUser = currUserData.rows[0];

  const posts = await db.query(
    `SELECT posts.id, posts.content, posts.user_id, profiles.username AS username FROM posts JOIN profiles ON posts.user_id = profiles.id ORDER BY posts.id DESC`
  );

  const likes = await db.query(
    `SELECT *, profiles.username AS username FROM likes JOIN profiles ON likes.user_id = profiles.id ORDER BY likes.id`
  );
  if (searchParams.sort === "new") {
    posts.rows.sort((a, b) => a.id - b.id);
    // revalidatePath("/dashboard?sort=new");
    console.log("newest first");
    // TODO Fix sort function
  }
  const serverLikes = likes.rows;
  const serverPosts = posts.rows;
  const profId = currUser.id;

  async function handleLike(formData) {
    "use server";
    const post_id = formData.get("post_id");
    const user_id = formData.get("user_id");
    await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2)`, [
      post_id,
      user_id,
    ]);
    revalidatePath("/dashboard");
  }
  return (
    <div className="feed-container">
      <NewPost profId={profId} />
      <div>
        {/* <nav>
          <Link href="/dashboard?sort=new">newest first</Link>
          <Link href="/dashboard">default</Link>
        </nav> */}
        <Suspense fallback={<p>Loading feed...</p>}>
          <PostsWithLikesSection
            likes={serverLikes}
            posts={serverPosts}
            profId={profId}
            handleLike={handleLike}
          />
        </Suspense>
      </div>
    </div>
  );
}
