import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { logoHorizontal } from "../assets";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const home = () => {
    history.push("/");
  };
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-cssscan-27 h-16 bg-white">
      <div className="flex flex-row justify-between items-center h-full container px-10 mx-auto">
        <div onClick={home} className="cursor-pointer">
          <img src={logoHorizontal} alt="Budi Mulia Dua School" />
        </div>
        <Hamburger
          toggled={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          color="#0B86C9"
          size={20}
        />
      </div>
    </div>
  );
};

export default Header;
