import React from "react";
import PropTypes from "prop-types";

export default function NewPost({
  setTitle,
  setBody,
  handleSubmit,
  setIsCreating,
  title,
  body,
}) {
  return (
    <div className="container p-2 border">
      <form>
        <div className="d-flex">
          <h3 className="p-2 w-100">Create a post</h3>
          <button
            type="button"
            className="btn-close justify-content-end"
            onClick={() => setIsCreating(false)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control"
            value={title}
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <button
          className="btn btn-success"
          type="submit"
          onClick={handleSubmit}
          disabled={!title || !body}
        >
          Create
        </button>
      </form>
    </div>
  );
}

NewPost.propTypes = {
  setTitle: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setIsCreating: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
};
