"use client";
import { useState } from "react";

export default function PostForm({ addPost }) {
  const [content, setContent] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  function handleSubmit() {
    setContent("");
    setShowThanks(true);
    setTimeout(() => {
      setShowThanks(false);
    }, 1000);
  }
  return (
    <div>
      <h2>New Post</h2>
      <form action={addPost} onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button>Submit</button>
        {showThanks && <p>Thanks for posting xoxo</p>}
      </form>
    </div>
  );
}
