"use client";
import { useFormStatus } from "react-dom";
import "./AddPostForm.css";

export function SubmitBtn() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className="Button SubmitBtn"
      style={{ marginTop: 10 }}
    >
      {!status.pending ? "Post" : "posting..."}
    </button>
  );
}

export function LikeBtn() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className="Button LikeBtn"
      style={{ marginTop: 10 }}
    >
      {!status.pending ? "Like" : "liking..."}
    </button>
  );
}

export function UpdateBtn() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className="Button UpdateBtn"
      style={{ marginTop: 10 }}
    >
      {!status.pending ? "Update" : "updating..."}
    </button>
  );
}
