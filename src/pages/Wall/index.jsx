import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/api";
import { useHistory } from "react-router-dom";
import { createPost } from "../../services/api";
import Header from "./Header";
import NewPost from "./NewPost";
import Loading from "../../components/Loading";

export default function Wall() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filter, setFilter] = useState("");
  const [isLoading, setLoading] = useState(false);

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
    const { name, lastName, userId } = userInfo;
    const response = await createPost(
      { title, body, author: `${name} ${lastName}`, authorId: userId },
      userInfo.token
    );

    if (response.status === 200) {
      setTitle("");
      setBody("");
      setIsCreating(false);
      await fetchData();
    } else {
      setError("Session expired, sign in and try again!");
      setIsCreating(false);
    }
  }

  async function fetchData() {
    const { data, status } = await getPosts();
    if (status === 400) return setError(data.message);
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    setSession();
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    setFilteredPosts(() =>
      posts.filter(
        ({ body, title }) =>
          body.toLowerCase().includes(filter.toLowerCase()) ||
          title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Header
        username={userInfo.name || "Visitor"}
        authenticated={isAuthenticated}
        setIsCreating={setIsCreating}
        setIsFiltering={setIsFiltering}
        isFiltering={isFiltering}
      />
      {isFiltering && (
        <div className="container p-2 border">
          <div className="input-group">
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Search posts"
              value={filter}
              onChange={({ target: { value } }) => setFilter(value)}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="alert-md alert-danger" role="alert">
          {error}
        </div>
      )}
      {isCreating && (
        <div>
          <NewPost
            setTitle={setTitle}
            setBody={setBody}
            handleSubmit={handleSubmit}
            title={title}
            body={body}
            setIsCreating={setIsCreating}
          />
        </div>
      )}
      <div className="container">
        <div className="card-columns">
          <div className="row">
            {filteredPosts.map(({ title, body, author, id }) => (
              <div className="card text-center w-50" key={`post-${id}`}>
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{body}</p>
                  <span className="blockquote-footer">
                    <small className="text-muted">{author}</small>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
