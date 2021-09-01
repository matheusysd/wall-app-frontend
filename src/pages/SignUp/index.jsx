import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  function validateForm() {
    return /\S+@\S+\.\S+/.test(email) && password.length > 5 && password === confirmPassword;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="container-sm">
      <h1>Please sign up</h1>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="inputName">Name</label>
            <input
              className="form-control"
              type="text"
              id="inputName"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="inputLastName">Last Name</label>
            <input
              className="form-control"
              type="text"
              id="inputLastName"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            className="form-control"
            type="text"
            id="inputEmail"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="inputPassword">Password</label>
            <input
              className="form-control"
              type="password"
              id="inputPassword"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="col">
            <label htmlFor="inputConfirmPassword">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              id="inputConfirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>
        <hr />
        <div className="container d-flex justify-content-around">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
            disabled={!validateForm()}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
