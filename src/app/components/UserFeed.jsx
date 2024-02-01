"use client";

import { useState } from "react";

export default function UserFeed({ posts, handleDelPost }) {
  const [delConfirm, setDelConfirm] = useState(false);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>{" "}
          <button onClick={() => setDelConfirm(!delConfirm)}>
            {!delConfirm ? "x" : "cancel"}
          </button>
          {delConfirm && (
            <button onClick={() => handleDelPost(post)}>delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
