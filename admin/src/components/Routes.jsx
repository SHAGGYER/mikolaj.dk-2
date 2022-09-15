import React from "react";
import { Route, Switch } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import BrowseVisitors from "../pages/Visitors/BrowseVisitors";
import BrowseMail from "../pages/Mail/BrowseMail";
import BrowseHobbies from "../pages/Hobbies/BrowseHobbies";
import PageBuilder from "../pages/PageBuilder/PageBuilder";
import BrowseCourses from "../pages/Courses/BrowseCourses";

function Routes(props) {
  return (
    <Switch>
      <RestrictedRoute component={Dashboard} path="/dashboard" />
      <RestrictedRoute path="/settings" component={Settings} />
      <RestrictedRoute path="/visitors" component={BrowseVisitors} />
      <RestrictedRoute path="/mail" component={BrowseMail} />
      <RestrictedRoute path="/hobbies" component={BrowseHobbies} />
      <RestrictedRoute path="/page-builder" component={PageBuilder} />
      <RestrictedRoute path="/courses" component={BrowseCourses} />
      <Route path="/signin">
        <Login />
      </Route>
    </Switch>
  );
}

export default Routes;
