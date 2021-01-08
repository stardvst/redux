import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSubmitPost = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postAdded({ id: nanoid(), title, content }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form action="" onSubmit={onSubmitPost}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postTitle">Content:</label>
        <textarea
          name="postTitle"
          id="postTitle"
          cols="30"
          rows="10"
          value={content}
          onChange={onContentChanged}
        ></textarea>
        <button type="submit">Save Post</button>
      </form>
    </section>
  );
};
