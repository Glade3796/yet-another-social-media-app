import { revalidatePath } from "next/cache";
import { db } from "../_lib/db";
import { redirect } from "next/navigation";


import PostForm from "./PostForm";
export default function NewPost({ profId }) {
  async function addPost(formData) {
    "use server";
    const content = formData.get("content");

    await db.query(`INSERT INTO posts (user_id, content) VALUES ($1, $2)`, [
      profId,
      content,
    ]);
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }
  return <PostForm addPost={addPost} />;
}
