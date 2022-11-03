import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { InputAuth } from "../components/Input";
import { connect } from "react-redux";
import { authSignUp } from "../redux/actions/auth";
import { ErrAlert } from "../components/Alert";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      noHp: "",
      email: "",
      password: "",
      repassword: "",
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
      name: this.state.name,
      noHp: this.state.noHp,
      email: this.state.email,
      password: this.state.password,
      repassword: this.state.repassword,
      navigate: this.props.history,
    };

    if (
      data.name &&
      data.noHp &&
      data.email &&
      data.password &&
      data.repassword
    ) {
      if (data.noHp < 0) {
        this.setState({ errAlert: "Maaf nomor HP yang Anda masukan salah" });
      } else {
        if (data.noHp.toString().length < 10) {
          this.setState({ errAlert: "Maaf nomor HP yang Anda masukan salah" });
        } else {
          if (data.password.length < 6) {
            this.setState({ errAlert: "Maaf, password minimal harus 6 digit" });
          } else {
            if (data.password !== data.repassword) {
              this.setState({
                errAlert: "Maaf, password yang telah Anda masukan tidak sama",
              });
            } else {
              this.setState({ errAlert: "" });
              this.props.authSignUp(data);
            }
          }
        }
      }
    } else {
      this.setState({ errAlert: "Mohon untuk mengisi semua kolom isian." });
    }
  };
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
                <InputAuth
                  label="Nama"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <InputAuth
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <InputAuth
                  label="Nomor HP"
                  value={this.state.noHp}
                  onChange={(e) => this.setState({ noHp: e.target.value })}
                />
                <InputAuth
                  label="Password"
                  type="password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <InputAuth
                  label="Ulangi Password"
                  type="password"
                  value={this.state.repassword}
                  onChange={(e) =>
                    this.setState({ repassword: e.target.value })
                  }
                />
                <button
                  className="w-full flex items-center justify-center bg-blue-500 h-10 text-white rounded-md px-3 active:bg-blue-700"
                  onClick={this.submit}
                >
                  Register
                </button>

                {this.state.errAlert && (
                  <ErrAlert
                    text={this.state.errAlert}
                    onClick={this.closeAlert}
                  />
                )}
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

const mapDispatchToProps = {
  authSignUp,
};

export default connect(null, mapDispatchToProps)(SignUp);
