import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { logoHorizontal } from "../assets";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "../components/Container";
import { Link } from "react-router-dom";
import { authLogout } from "../redux/actions/auth";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const home = () => {
    history.push("/");
  };

  const logout = () => {
    setIsOpen(false);
    props.authLogout();
    history.push("/");
  };

  const resLogout = () => {
    logout();
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-cssscan-27 h-16 bg-white">
      <div className="flex flex-row justify-between items-center h-full container px-10 mx-auto">
        <div onClick={home} className="cursor-pointer">
          <img src={logoHorizontal} alt="Budi Mulia Dua School" />
        </div>

        {props.auth.token && (
          <Hamburger
            toggled={isOpen}
            toggle={() => setIsOpen(!isOpen)}
            color="#0B86C9"
            size={20}
          />
        )}
      </div>

      {isOpen && (
        <div id="toggleMenu" className=" block bg-white pb-20">
          <Container
            content={
              <div className="container mx-auto px-4 lg:px-10 flex flex-col my-5 space-y-5 items-end pr-3 text-gray-700">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link to="#" onClick={() => setIsOpen(false)}>
                  Data Siswa
                </Link>
                <button onClick={resLogout}>Keluar</button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { authLogout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
