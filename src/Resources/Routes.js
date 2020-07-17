import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import Show from "../components/inventory/categories/Show";
import Inventory from "../components/inventory/Home";
import { default as Login, default as NewEmployee } from "../components/Login";
import Logout from "../components/Logout";
import Signup from "../components/Signup";

function Routes({ isLoggedIn }) {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgotPassword" component={ForgotPassword} />

      {!isLoggedIn ? <Redirect to="/login" /> : ""}

      <Route path="/logout" component={Logout} />

      <Route path="/" exact component={Home} />
      <Route path="/employees/all" exact component={EmployeeList} />
      <Route path="/employees/new" exact component={NewEmployee} />

      <Route path="/inventory" exact>
        <Inventory />
      </Route>

      <Route exact path="/categories/:id" component={Show} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Routes);
