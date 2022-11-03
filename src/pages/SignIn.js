import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { InputAuth } from "../components/Input";

class SignIn extends React.Component {
  login = () => {
    this.props.history.push("/");
    console.log(this.props);
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
              <InputAuth type="email" label="Email" />
              <InputAuth type="password" label="Password" />
              <div className="flex justify-between items-center">
                <Link to="#">
                  <p className="text-blue-500 active:text-blue-700">
                    Forgot Password?
                  </p>
                </Link>
                <button
                  onClick={this.login}
                  className="flex items-center justify-center bg-blue-500 h-10 text-white rounded-md px-3 active:bg-blue-700"
                >
                  Log In
                </button>
              </div>
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

export default SignIn;
