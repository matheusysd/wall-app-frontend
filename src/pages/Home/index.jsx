import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

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
