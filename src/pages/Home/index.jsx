import React, { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([
    { title: "Title", body: "body", author: "author" },
  ]);
  return (
    <>
      {posts.map(({ title, body, author }) => (
        <div>
          <div>{title}</div>
          <div>{body}</div>
          <div>{author}</div>
        </div>
      ))}
    </>
  );
}
