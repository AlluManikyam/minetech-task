import React, { Component } from "react";
import "./App.css";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import DashboardPage from "./containers/DashboardPage";
import CountriesPage from "./containers/CountriesPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/countries" component={CountriesPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;