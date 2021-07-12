import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import PageOfRegistration from "./PageOfRegistration";
import PageOfLogin from "./PageOfLogin";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/registration" component={PageOfRegistration} />
        <Route path="/login" component={PageOfLogin} />
        <Route
          path="/home"
          render={() =>
            localStorage.getItem("token") ? (
              <HomePage />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </div>
  );
}

export default App;
