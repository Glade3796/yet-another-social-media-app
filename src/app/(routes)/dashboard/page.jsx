import { db } from "@/app/_lib/db";
import NewPost from "@/app/components/NewPost";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function Dashboard({ searchParams }) {
  const { userId } = auth();
  const currUserData = await db.query(
    `SELECT * FROM profiles WHERE clerk_user_id = $1`,
    [userId]
  );
  const currUser = currUserData.rows[0];

  const posts = await db.query(
    `SELECT *, profiles.username AS username FROM posts JOIN profiles ON posts.user_id = profiles.id ORDER BY posts.id DESC`
  );

  const likes = await db.query(
    `SELECT *, profiles.username AS username FROM likes JOIN profiles ON likes.user_id = profiles.id ORDER BY likes.id DESC`
  );
  if (searchParams.sort === "new") {
    posts.rows.sort((a, b) => a.id - b.id);
    // revalidatePath("/dashboard?sort=new");
    console.log("newest first");
    // TODO Fix sort function
  }

  const profId = currUser.id;
  return (
    <div>
      <NewPost profId={profId} />
      <div>
        {/* <nav>
          <Link href="/dashboard?sort=new">newest first</Link>
          <Link href="/dashboard">default</Link>
        </nav> */}
        <div>
          {posts.rows.map((post) => (
            <div key={post.id}>
              <h3>{post.username}</h3>
              <p>{post.content}</p>
              <div>
                {likes.rows
                  .filter((like) => like.post_id === post.id)
                  .map((like) => (
                    <p key={like.id}> {like.username}</p>
                  ))}
                {likes.rows.filter((like) => like.post_id === post.id).length >
                0 ? (
                  <p>liked this</p>
                ) : null}
                {/* TODO LIKE button finish like functionality (like button) */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
