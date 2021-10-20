import "./Reset.css";

import { REGISTER, RESET } from "constants/routes";
import { React, useState } from "react";

import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase-config";
import useAuthentication from 'hooks/useAuthentication';

function Reset() {
  useAuthentication(RESET);
  const [email, setEmail] = useState("");

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>

        <div>
          Don't have an account? <Link to={REGISTER}>Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Reset;
