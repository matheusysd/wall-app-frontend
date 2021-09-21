import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({
  username,
  authenticated,
  setIsCreating,
  setIsFiltering,
}) {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <h4 className="text-white">{username}</h4>
      {authenticated ? (
        <div>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={() => setIsFiltering((prevState) => !prevState)}
          >
            <i className="bi bi-search" />
          </button>
          <button
            className="btn btn-success"
            onClick={() => setIsCreating((prevState) => !prevState)}
          >
            New Post
          </button>
          <button className="btn btn-danger m-2" onClick={() => logout()}>
            Logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-success m-2"
          onClick={() => history.push("/")}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  setIsFiltering: PropTypes.func.isRequired,
};
