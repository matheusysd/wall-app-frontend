/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAuth, setUserAuth] = useState({ authenticated: false, info: {} });
  const [isVisitor, setIsVisitor] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();

  function validateForm() {
    return /\S+@\S+\.\S+/.test(email) && password.length > 5;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setUserAuth({
          info: { ...response.data },
          authenticated: true,
        });
      }
    } catch (error) {
      //TODO error message
      console.log(error);
    }
  }

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) setIsLogged(true);
  }, []);

  useEffect(() => {
    if (userAuth.authenticated) {
      localStorage.setItem("user", JSON.stringify({ ...userAuth.info }));
      history.push("/wall", { ...userAuth }); //TODO create redirect funcion
    }
  }, [userAuth]);

  return isVisitor || isLogged ? (
    <Redirect to="/wall" />
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
