import {
  HOME,
  LOGIN,
  ONBOARDING,
  REGISTER,
  RESET,
  SETTINGS,
} from "constants/routes";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Dashboard from "views/Dashboard";
import Loading from "views/Loading";
import Login from "views/auth/Login";
import Onboarding from "views/onboarding/Onboarding";
import { Redirect } from "react-router-dom";
import Register from "views/auth/Register";
import Reset from "views/auth/Reset";
import Settings from "views/settings/Settings";
import Toast from "components/Toast";
import { UserContext } from "context";
import { db } from "firebase-config";
import styles from "./App.module.scss";
import { toast } from "react-hot-toast";
import useAuthentication from "hooks/useAuthentication";

const flatten = (target, children) => {
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === Fragment) {
        flatten(target, child.props.children);
      } else {
        target.push(child);
      }
    }
  });
};

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
      toast.error("An error occured while fetching user data");
    }
  }, [user]);

  const FragmentSupportingSwitch = ({ children }) => {
    const flattenedChildren = [];
    flatten(flattenedChildren, children);
    return React.createElement.apply(
      React,
      [Switch, null].concat(flattenedChildren)
    );
  };

  useEffect(() => {
    if (user && !loading && !error) {
      fetchData();
    }
  }, [user, loading, error, fetchData]);

  return (
    <div className={styles.app}>
      <UserContext.Provider value={[data, setData]}>
        <Router>
          <FragmentSupportingSwitch>
            {!loading ? (
              user ? (
                !data.uid ? (
                  <Loading />
                ) : !data.seenOnboarding ? (
                  <>
                    <Route exact path={ONBOARDING} component={Onboarding} />
                    <Redirect to={ONBOARDING} />
                  </>
                ) : (
                  <>
                    <Route exact path={ONBOARDING} component={Onboarding} />
                    <Route exact path={SETTINGS} component={Settings} />
                    <Route exact path={HOME} component={Dashboard} />

                    <Redirect to={HOME} />
                  </>
                )
              ) : (
                <>
                  <Route exact path={RESET} component={Reset} />
                  <Route exact path={REGISTER} component={Register} />
                  <Route exact path={LOGIN} component={Login} />

                  <Redirect to={LOGIN} />
                </>
              )
            ) : (
              <Loading />
            )}
          </FragmentSupportingSwitch>
        </Router>
      </UserContext.Provider>

      <Toast />
    </div>
  );
}

export default App;
