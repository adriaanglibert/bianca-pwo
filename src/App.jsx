import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  HOME,
  LOGIN,
  ONBOARDING,
  REGISTER,
  RESET,
  SETTINGS,
} from "constants/routes";
import React, { useCallback, useEffect, useState } from "react";

import Dashboard from "views/Dashboard";
import Loading from "views/Loading";
import Login from "views/auth/Login";
import Onboarding from "views/onboarding/Onboarding";
import Register from "views/auth/Register";
import Reset from "views/auth/Reset";
import Settings from "views/settings/Settings";
import Toast from "components/Toast";
import { UserContext } from "context";
import { db } from "firebase-config";
import styles from "./App.module.scss";
import { toast } from "react-hot-toast";
import useAuthentication from "hooks/useAuthentication";

const defaultContext = {
  activities: {},
  auth: null,
  email: null,
  name: null,
  seenOnboarding: null,
  settings: {},
  uid: null,
};

function App() {
  const [user, loading, error] = useAuthentication(LOGIN);
  const [data, setData] = useState(defaultContext);

  const fetchData = useCallback(async () => {
    try {
      const query = await db.collection("users").doc(user?.uid).get();
      const data = await query;
      const res = data.data();

      // Set fake 500ms delay so you see the spinner
      setTimeout(() => {
        setData({ ...defaultContext, ...res });
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while fetching user data", {
        id: "global",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && !loading && !error) {
      fetchData();
    }
  }, [user, loading, error, fetchData]);

  return (
    <div className={styles.app}>
      <UserContext.Provider value={[data, setData]}>
        {loading || (user && !data?.uid) ? (
          <Loading />
        ) : (
          <BrowserRouter>
              {user ? (
                !data.seenOnboarding ? (
                  <Routes>
                    <Route exact path={ONBOARDING} element={<Onboarding/>} />
                    <Route path="*" element={<Navigate to={ONBOARDING} />} />
                  </Routes>
                ) : (
                  <Routes>
                    <Route exact path={ONBOARDING} element={<Onboarding/>} />
                    <Route exact path={SETTINGS} element={<Settings/>} />
                    <Route exact path={HOME} element={<Dashboard/>} />

                    <Route path="*" element={<Navigate to={HOME} />} />
                  </Routes>
                )
              ) : (
                <Routes>
                  <Route exact path={RESET} element={<Reset/>} />
                  <Route exact path={REGISTER} element={<Register/>} />
                  <Route exact path={LOGIN} element={<Login/>} />

                  <Route path="*" element={<Navigate to={LOGIN} />} />
                </Routes>
              )}
          </BrowserRouter>
        )}
      </UserContext.Provider>

      <Toast />
    </div>
  );
}

export default App;
