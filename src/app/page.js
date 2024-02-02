import { SignInButton } from "@clerk/nextjs";
import { db } from "./_lib/db";

export default async function Home() {
  return (
    <main>
      <div>
        <h1>Welcome</h1>
        <p>Welcome to Yet Another Social Media App...</p>
        <SignInButton />
      </div>
    </main>
  );
}
