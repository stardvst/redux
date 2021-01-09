import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUpdated } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onUpdatePost = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2></h2>
      <form action="" onSubmit={onUpdatePost}>
        <label htmlFor="">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">ontent:</label>
        <textarea
          name="postContent"
          id="postContent"
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
