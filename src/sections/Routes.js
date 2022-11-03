import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthRoute from "../components/AuthRoute";
// import GeneralRoute from "../components/GeneralRoute";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Siswa from "../pages/Siswa";

const Routes = () => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => <PrivateRoute element={<Home {...props} />} />}
      />
      <Route
        path="/signin"
        render={(props) => <AuthRoute element={<SignIn {...props} />} />}
      />
      <Route
        path="/signup"
        render={(props) => <AuthRoute element={<SignUp {...props} />} />}
      />
      <Route
        path="/siswa"
        render={(props) => <AuthRoute element={<Siswa {...props} />} />}
      />
    </Switch>
  );
};

export default Routes;
