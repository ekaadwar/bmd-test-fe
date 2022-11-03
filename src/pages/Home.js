import React from "react";
import { connect } from "react-redux";
import { authLogout } from "../redux/actions/auth";

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>Home</p>
        <button onClick={this.props.authLogout}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { authLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
