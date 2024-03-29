import { db } from "@/app/_lib/db";
import NewPost from "@/app/components/NewPost";
import UserFeed from "@/app/components/UserFeed";
import ViewProfile from "@/app/components/ViewProfile";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function UserPage({ params }) {
  const profileRes = await db.query("SELECT * FROM profiles WHERE id = $1", [
    params.id,
  ]);
  const profPage = profileRes?.rows[0];
  if (!profPage) {
    notFound();
  }
  const { userId } = auth();
  if (profPage.clerk_user_id !== userId) {
    redirect(`/visit/${params.id}`);
  }
  const postsRes = await db.query("SELECT * FROM posts WHERE user_id = $1", [
    params.id,
  ]);
  const posts = postsRes.rows;
  const profile = profileRes.rows[0];

  async function submitEdit(formData) {
    "use server";
    const username = formData.get("username");
    const biography = formData.get("biography");

    await db.query(
      `UPDATE profiles SET username = $1, biography = $2 WHERE id = $3`,
      [username, biography, profile.id]
    );
    revalidatePath("/dashboard");
    redirect(`/dashboard/user/${profile.id}`);
  }
  async function handleDelPost(post) {
    "use server";
    await db.query(`DELETE FROM posts WHERE id = $1`, [post.id]);
    revalidatePath("/dashboard");
    redirect(`/dashboard/user/${profile.id}`);
  }
  return (
    <div className="user-container">
      <ViewProfile profile={profile} submitEdit={submitEdit}></ViewProfile>
      <NewPost profId={profile.id}></NewPost>
      <UserFeed posts={posts} handleDelPost={handleDelPost}></UserFeed>
    </div>
  );
}
