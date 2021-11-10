import {
  HOME,
  LOGIN,
  ONBOARDING,
  REGISTER,
  RESET,
  SETTINGS,
} from "constants/routes";
import React, { useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Dashboard from "views/Dashboard";
import Loading from "views/Loading";
import Login from "views/auth/Login";
import Nav from "components/Nav";
import Onboarding from "views/onboarding/Onboarding";
import { Redirect } from "react-router-dom";
import Register from "views/auth/Register";
import Reset from "views/auth/Reset";
import Settings from "views/Settings";
import Toast from "components/Toast";
import { UserContext } from "context";
import { db } from "firebase-config";
import styles from "./App.module.scss";
import { toast } from "react-hot-toast";
import useAuthentication from "hooks/useAuthentication";

function App() {
  const [user, loading, error] = useAuthentication(LOGIN);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const query = await db.collection("users").doc(user?.uid).get();
      const data = await query;
      const usr = data.data();

      // Set fake 500ms delay so you see the spinner
      setTimeout(() => {
        setData(usr);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("An error occured while fetching user data");
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
        <Nav />
        <Router>
          <Switch>
            {!loading ? (
              user ? (
                !data ? (
                  <Loading />
                ) : !data.seenOnboarding ? (
                  <>
                    <Redirect from={HOME} to={ONBOARDING} />
                    <Route exact path={ONBOARDING} component={Onboarding} />
                  </>
                ) : (
                  <>
                    <Route exact path={ONBOARDING} component={Onboarding} />
                    <Route exact path={SETTINGS} component={Settings} />
                    <Route exact path={HOME} component={Dashboard} />
                  </>
                )
              ) : (
                <>
                  <Route exact path={RESET} component={Reset} />
                  <Route exact path={REGISTER} component={Register} />
                  <Route path={LOGIN} component={Login} />
                </>
              )
            ) : (
              <Loading />
            )}
          </Switch>
        </Router>
      </UserContext.Provider>

      <Toast />
    </div>
  );
}

export default App;
