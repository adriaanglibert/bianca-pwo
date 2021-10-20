import "./Login.css";

import { LOGIN, REGISTER, RESET } from "constants/routes";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithGoogle } from "firebase-config";

import { Link } from "react-router-dom";
import useAuthentication from "hooks/useAuthentication";

function Login() {
  useAuthentication(LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to={RESET}>Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to={REGISTER}>Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
