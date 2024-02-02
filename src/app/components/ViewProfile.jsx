"use client";
import { useState } from "react";
import { SubmitBtn, UpdateBtn } from "./Buttons";

export default function ViewProfile({ profile, submitEdit }) {
  const [editProf, setEditProf] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [biography, setBiography] = useState(profile.biography);

  return (
    <div className="user-box width-80">
      {!editProf && (
        <div className="user-box">
          <h1 className="user-name">{profile.username}</h1>
          <p className="bio-box"> {profile.biography}</p>
          <button onClick={() => setEditProf(!editProf)} className="Button">
            edit profile
          </button>
        </div>
      )}
      {editProf && (
        <div>
          <form
            action={submitEdit}
            onSubmit={() => setEditProf(!editProf)}
            className="user-box edit"
          >
            <input
              type="text"
              className="user-name edit"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <textarea
              className="bio-box"
              name="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            ></textarea>
            <UpdateBtn />
          </form>

          <button
            onClick={() => setEditProf(!editProf)}
            className="Button cancelBtn"
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}
