import { LOGIN, REGISTER, RESET } from "constants/routes";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "views/Home";
import Login from "views/auth/Login";
import Register from "views/auth/Register";
import Reset from "views/auth/Reset";
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={RESET} component={Reset} />
          <Route component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
