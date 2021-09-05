import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/api";
import { useHistory } from "react-router-dom";
import { createPost } from "../../services/api";
import Header from "./Header";
import NewPost from "./NewPost";

export default function Wall() {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const history = useHistory();
  const { state } = history.location;

  function setSession() {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (state) {
      setUserInfo(state.info);
      return setIsAuthenticated(state.authenticated);
    }

    if (!state && storedUser) {
      setUserInfo({ ...storedUser });
      return setIsAuthenticated(true);
    }

    setUserInfo({});
    return setIsAuthenticated(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createPost(
      { title, body, author: `${userInfo.name} ${userInfo.lastName}` },
      userInfo.token
    );

    if (response.status === 200) {
      setTitle("");
      setBody("");
      setIsCreating(false);
      await fetchData();
    }
  }

  async function fetchData() {
    const { data } = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    setSession();
    fetchData();
  }, []);

  return (
    <>
      <Header
        username={userInfo.name || "Anonymous"}
        authenticated={isAuthenticated}
        setIsCreating={setIsCreating}
      />
      {isCreating && (
        <NewPost
          setTitle={setTitle}
          setBody={setBody}
          handleSubmit={handleSubmit}
          title={title}
          body={body}
        />
      )}
      <div className="container">
        <div className="card-columns">
          <div className="row">
            {posts.map(({ title, body, author, id }) => (
              <div className="card text-center w-50" key={`post-${id}`}>
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{body}</p>
                  <footer className="blockquote-footer">
                    <small className="text-muted">{author}</small>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
