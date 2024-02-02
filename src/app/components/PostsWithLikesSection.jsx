"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { LikeBtn } from "./Buttons";

export default function PostsWithLikesSection({
  posts,
  likes,
  profId,
  handleLike,
}) {
  const formStatus = useFormStatus();
  // console.log(
  //   "userid vs profid",
  //   likes.filter((x) => x.user_id === profId)
  // );
  const userLikes = likes.filter((x) => x.user_id === profId);

  console.log(userLikes);

  return (
    <div className="post-container">
      {posts?.map((post) => (
        <div key={post.id} className="post-box">
          <h3>{post.username}</h3>
          <p>{post.content}</p>
          <div className="like-box">
            {likes
              .filter((like) => like.post_id === post.id)
              ?.map((like) => (
                <p key={like.id}> {like.username}</p>
              ))}
            {likes.filter((like) => like.post_id === post.id).length > 0 ? (
              <p>
                <b>liked this!</b>
              </p>
            ) : null}

            {profId !== post.user_id &&
              profId !==
                userLikes.filter((like) => like.post_id === post.id)[0]
                  ?.user_id && (
                <form action={handleLike}>
                  <input
                    type="text"
                    name="post_id"
                    value={post.id}
                    readOnly
                    hidden
                  ></input>
                  <input
                    type="text"
                    name="user_id"
                    value={profId}
                    readOnly
                    hidden
                  ></input>
                  <LikeBtn />
                </form>
              )}
            {/* TODO LIKE button finish like functionality (like button) */}
          </div>
        </div>
      ))}
    </div>
  );
}
