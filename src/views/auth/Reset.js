import { REGISTER, RESET } from "constants/routes";
import { React, useState } from "react";

import Card from "components/Card";
import Center from "components/Center";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase-config";
import useAuthentication from 'hooks/useAuthentication';

function Reset() {
  useAuthentication(RESET);
  const [email, setEmail] = useState("");

  return (
    <Center>
      <Card>
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
      </Card>
    </Center>
  );
}

export default Reset;
