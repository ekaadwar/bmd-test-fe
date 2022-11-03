import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { InputAuth } from "../components/Input";

class SignUp extends React.Component {
  render() {
    return (
      <div className="bg-auth scrollbar-hidden h-screen w-full overflow-scroll">
        <div className="container px-10 mx-auto h-full flex items-center justify-center">
          <div className="flex justify-center pt-80 pb-20 w-full">
            <div className="shadow-cssscan-43 bg-transparent-white-40 w-full max-w-md p-4 space-y-10">
              <div className="flex justify-center">
                <img src={logo} alt={"Budi Mulia Dua School"} />
              </div>

              <div className="space-y-5">
                <InputAuth label="Nama" />
                <InputAuth label="Email" type="email" />
                <InputAuth label="Nomor HP" />
                <InputAuth label="Password" type="password" />
                <InputAuth label="Ulangi Password" type="password" />
                <button className="w-full flex items-center justify-center bg-blue-500 h-10 text-white rounded-md px-3 active:bg-blue-700">
                  Register
                </button>
              </div>

              <div className="text-center">
                <p className="text-gray-700">Already have an account??</p>
                <Link to="/signin">
                  <p className="text-blue-500 active:text-blue-700">Login</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
