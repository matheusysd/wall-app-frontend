import React from "react";

export default function NotFound() {
  return (
    <div className="container">
      <span className="display-1 d-block">404</span>
      <div className="mb-4 lead">
        The page you are looking for was not found.
      </div>
      <a href="http://localhost:3000/home" className="btn btn-link">
        Back to Home
      </a>
    </div>
  );
}
