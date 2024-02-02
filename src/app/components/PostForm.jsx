"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { SubmitBtn } from "./Buttons";
import * as Form from "@radix-ui/react-form";
import "./AddPostForm.css";
export default function PostForm({ addPost }) {
  const [content, setContent] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const status = useFormStatus();
  function handleSubmit(e) {
    // e.preventDefault();
    setContent("");
    setShowThanks(true);
    setTimeout(() => {
      setShowThanks(false);
    }, 1000);
  }
  return (
    <div>
      <h2>New Post</h2>
      {/* <form action={addPost} onSubmit={handleSubmit}>
        
          <textarea
            name="content"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <SubmitBtn />
          {showThanks && <p>Thanks for posting xoxo</p>}
        
      </form> */}
      <Form.Root className="FormRoot" action={addPost} onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="content">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Form.Label className="FormLabel">Post:</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please write a post
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="Textarea"
              required
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <SubmitBtn />
        </Form.Submit>
      </Form.Root>
      ;
    </div>
  );
}
{
  /* <Form.Root className="w-[260px]">
  <Form.Field className="grid mb-[10px]" name="content">
    <div className="flex items-baseline justify-between">
      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
        Post:
      </Form.Label>
      <Form.Message
        className="text-[13px] text-white opacity-[0.8]"
        match="valueMissing"
      >
        Please write a post
      </Form.Message>
    </div>
    <Form.Control asChild>
      <textarea
        className="box-border w-full bg-blackA2 shadow-blackA6 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6 resize-none"
        required
      />
    </Form.Control>
  </Form.Field>
  <Form.Submit asChild>
    <SubmitBtn />
  </Form.Submit>
</Form.Root>; */
}
