import React from "react";
import { useHistory } from "react-router-dom";

export default function Header({ username, authenticated, setIsCreating }) {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <h4>{username}</h4>

      <div>
        {authenticated ? (
          <div>
            <button
              className="btn btn-success"
              onClick={() => setIsCreating(true)}
            >
              New Post
            </button>
            <button className="btn btn-danger" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-success" onClick={() => history.push("/")}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
