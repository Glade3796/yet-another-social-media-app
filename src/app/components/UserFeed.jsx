"use client";

import { useState } from "react";

export default function UserFeed({ posts, handleDelPost }) {
  const [delConfirm, setDelConfirm] = useState(false);
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post-box">
          <p>{post.content}</p>{" "}
          <button
            onClick={() => setDelConfirm(!delConfirm)}
            className="Button delBtn"
          >
            {!delConfirm ? "x" : "cancel"}
          </button>
          {delConfirm && (
            <button
              className="Button delBtn"
              onClick={() => handleDelPost(post)}
            >
              delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
