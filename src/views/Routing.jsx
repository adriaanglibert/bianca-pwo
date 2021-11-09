import { HOME, LOGIN, ONBOARDING } from "constants/routes";
import React, { useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { db, logout } from "firebase-config";

import Dashboard from './Dashboard';
import Loading from "views/Loading";
import Onboarding from 'views/onboarding/Onboarding';
import { Redirect } from 'react-router-dom';
import { UserContext } from "context";
import { toast } from 'react-hot-toast';
import useAuthentication from 'hooks/useAuthentication';

function Routing() {
  const [user, loading, error] = useAuthentication(LOGIN);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const query = await db
        .collection("users")
        .doc(user?.uid)
        .get();
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
    <UserContext.Provider value={data}>
      {
        data ?
        <Router>
          <Switch>
              {
                !data.seenOnboarding ?
                <>
                  <Redirect from={HOME} to={ONBOARDING} />
                  <Route exact path={ONBOARDING} component={Onboarding} />
                </> :
                <>
                  <Route exact path={ONBOARDING} component={Onboarding} />
                  <Route component={Dashboard} />
                </>
              }
          </Switch>
        </Router> :
        <Loading/>
      }
    </UserContext.Provider>
  );
}

export default Routing;
