import React from "react";

export default function NewPost({
  setTitle,
  setBody,
  handleSubmit,
  title,
  body,
}) {
  return (
    <div className="container p-5 border">
      <form>
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
        >
          Create
        </button>
      </form>
    </div>
  );
}
