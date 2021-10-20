import "./Home.css";

import React, { useCallback, useEffect, useState } from "react";
import { db, logout } from "firebase-config";

import { LOGIN } from "constants/routes";
import useAuthentication from 'hooks/useAuthentication';

function Home() {
  const [user, loading, error] = useAuthentication(LOGIN);
  const [name, setName] = useState("");

  const fetchUserName = useCallback(async () => {
    try {
      const query = await db
        .collection("users")
        .doc(user?.uid)
        .get();
      const data = await query;
      const usr = data.data();
      setName(usr.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }, [user]);

  useEffect(() => {
    if (user && !loading && !error) {
      fetchUserName();
    }
  }, [user, loading, error, fetchUserName]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <div>{user?.uid}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
