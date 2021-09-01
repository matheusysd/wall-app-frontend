import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisitor, setIsVisitor] = useState(false);
  const history = useHistory();

  function validateForm() {
    return /\S+@\S+\.\S+/.test(email) && password.length > 5;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return isVisitor ? (
    <Redirect to="/home" />
  ) : (
    <div className="container-sm">
      <div className="formContent">
        <form>
          <h1>Please sign in</h1>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              className="form-control"
              type="email"
              id="inputEmail"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              className="form-control"
              type="password"
              id="inputPassword"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <hr />
          <div className="container d-flex justify-content-around">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!validateForm()}
            >
              Sign in
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => history.push("/signup")}
            >
              Sign up
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsVisitor(true)}
            >
              Visitor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
