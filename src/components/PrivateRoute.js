import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../sections/Header";

const PrivateRoute = ({ element, auth, priv = true }) => {
  if (priv !== false) {
    if (auth.token !== null) {
      return (
        <>
          <Header />
          {element}
        </>
      );
    } else {
      return <Redirect to="/signin" />;
    }
  } else {
    return element;
  }
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoute);
