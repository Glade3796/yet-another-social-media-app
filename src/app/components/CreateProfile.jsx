import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../_lib/db";
import { UpdateBtn } from "./Buttons";

export default function CreateProfile() {
  const { userId } = auth();

  async function addProfile(formData) {
    "use server";
    const username = formData.get("username");
    const biography = formData.get("biography");

    await db.query(
      `INSERT INTO profiles (clerk_user_id, username, biography) VALUES ($1, $2, $3)`,
      [userId, username, biography]
    );
    revalidatePath("/");
    redirect("/dashboard");
  }

  return (
    <div>
      <h2>Create Profile</h2>
      <form action={addProfile}>
        <input name="username" placeholder="Username" />
        <textarea name="biography" placeholder="Bio"></textarea>
        <UpdateBtn />
      </form>
    </div>
  );
}
