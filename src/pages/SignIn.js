import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

class SignIn extends React.Component {
  render() {
    return (
      <div className="h-screen w-full pt-16 ">
        <div className="container px-10 mx-auto h-full flex items-center justify-center">
          <div className="shadow-cssscan-43 w-full max-w-md p-4 space-y-10">
            <div className="flex justify-center">
              <img src={logo} alt={"Budi Mulia Dua School"} />
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-gray-700">Email</label>
                <input
                  className="w-full border border-gray-300 h-10 flex items-center px-2 focus:outline-none rounded-md"
                  type={"email"}
                />
              </div>
              <div>
                <label className="text-gray-700">Password</label>
                <input
                  className="w-full border border-gray-300 h-10 flex items-center px-2 focus:outline-none rounded-md"
                  type={"password"}
                />
              </div>
              <div className="flex justify-between items-center">
                <Link to="#">
                  <p className="text-blue-500 active:text-blue-700">
                    Forgot Password?
                  </p>
                </Link>
                <button className="flex items-center justify-center bg-blue-500 h-10 text-white rounded-md px-3 active:bg-blue-700">
                  Log In
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-700">Don't have an account?</p>
              <Link to="#">
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
