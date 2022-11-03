import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { InputAuth } from "../components/Input";
import { ErrAlert } from "../components/Alert";
import { connect } from "react-redux";
import { authSignin } from "../redux/actions/auth";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errAlert: "",
    };
  }

  closeAlert = () => {
    this.setState({ errAlert: "" });
  };

  changeValue = (event, setState) => {
    this.setState(setState);
  };

  submit = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      navigate: this.props.history,
    };

    if (data.email && data.password) {
      this.setState({ errAlert: "" });
      this.props.authSignin(data);
    } else {
      this.setState({ errAlert: "Mohon untuk mengisi semua kolom isian." });
    }
  };
  render() {
    return (
      <div className="bg-auth h-screen w-full pt-16 ">
        <div className="container px-10 mx-auto h-full flex items-center justify-center">
          <div className="shadow-cssscan-43 bg-transparent-white-40 w-full max-w-md p-4 space-y-10">
            <div className="flex justify-center">
              <img src={logo} alt={"Budi Mulia Dua School"} />
            </div>

            <div className="space-y-5">
              <InputAuth
                type="email"
                label="Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <InputAuth
                type="password"
                label="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <div className="flex justify-between items-center">
                <Link to="#">
                  <p className="text-blue-500 active:text-blue-700">
                    Forgot Password?
                  </p>
                </Link>
                <button
                  onClick={this.submit}
                  className="flex items-center justify-center bg-blue-500 h-10 text-white rounded-md px-3 active:bg-blue-700"
                >
                  Log In
                </button>
              </div>
              {this.state.errAlert && (
                <ErrAlert
                  text={this.state.errAlert}
                  onClick={this.closeAlert}
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-gray-700">Don't have an account?</p>
              <Link to="/signup">
                <p className="text-blue-500 active:text-blue-700">Register</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  authSignin,
};

export default connect(null, mapDispatchToProps)(SignIn);
