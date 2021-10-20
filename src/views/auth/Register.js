import { LOGIN, REGISTER } from "constants/routes";
import React, { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "firebase-config";

import  Card from 'components/Card';
import Center from 'components/Center';
import { Link } from "react-router-dom";
import useAuthentication from "hooks/useAuthentication";

function Register() {
  useAuthentication(REGISTER);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <Center>
      <Card>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>

        <div>
          Already have an account? <Link to={LOGIN}>Login</Link> now.
        </div>
      </Card>
    </Center>
  );
}

export default Register;
