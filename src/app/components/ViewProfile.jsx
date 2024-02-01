"use client";
import { useState } from "react";

export default function ViewProfile({ profile, submitEdit }) {
  const [editProf, setEditProf] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [biography, setBiography] = useState(profile.biography);

  return (
    <main>
      {!editProf && (
        <div>
          <h1>username: {profile.username}</h1>
          <p>bio: {profile.biography}</p>
          <button onClick={() => setEditProf(!editProf)}>edit profile</button>
        </div>
      )}
      {editProf && (
        <div>
          <form action={submitEdit} onSubmit={() => setEditProf(!editProf)}>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
              name="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>
            <button>Submit</button>
          </form>

          <button onClick={() => setEditProf(!editProf)}>cancel</button>
        </div>
      )}
    </main>
  );
}
