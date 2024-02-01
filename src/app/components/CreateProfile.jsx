import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../_lib/db";

export default function CreateProfile() {
  const { userId } = auth();

  async function addProfile(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    await db.query(`INSERT INTO profiles (clerk_user_id, username, bio) VALUES (${userId}, ${username}, ${bio})`)
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h2>Create Profile</h2>
      <form action={addProfile}>
        <input name="username" placeholder="Username" />
        <textarea name="bio" placeholder="Bio"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
