import { LOGIN, REGISTER, RESET } from "constants/routes";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "views/auth/Login";
import Register from "views/auth/Register";
import Reset from "views/auth/Reset"
import Routing from './views/Routing';
import Toast from "components/Toast";
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route exact path={REGISTER} component={Register} />
          <Route exact path={RESET} component={Reset} />

          <Routing />
        </Switch>
      </Router>

      <Toast/>
    </div>
  );
}

export default App;
