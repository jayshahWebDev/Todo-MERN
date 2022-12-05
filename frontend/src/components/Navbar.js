import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import img from "../assets/todoImg.jpg";

console.log("env::", process.env.REACT_APP_API_URL);

const Navbar = () => {
  let todoToken = localStorage.getItem("todoToken");

  const handleSignOut = () => {
    localStorage.removeItem("todoToken");
  };
  return (
    <div className="flex mx-[3%] justify-between h-[50px] items-center">
      <img src={img} className="h-[50px]" />
      <div className="flex gap-x-[10px] items-center">
        {todoToken ? (
          ""
        ) : (
          <NavLink
            to={"/signIn"}
            className="px-[10px] py-[5px] bg-darkTheme text-white rounded-[10px]"
          >
            SIGN IN
          </NavLink>
        )}
        {todoToken ? (
          ""
        ) : (
          <NavLink
            to={"/"}
            className="px-[10px] py-[5px] bg-darkTheme text-white rounded-[10px]"
          >
            SIGN UP
          </NavLink>
        )}
        {todoToken ? (
          <NavLink
            to={"/"}
            className="px-[10px] py-[5px] bg-darkTheme text-white rounded-[10px]"
            onClick={handleSignOut}
          >
            SIGN OUT
          </NavLink>
        ) : (
          ""
        )}
        {/* <div className="shadow-lg bg-darkTheme w-[30px] h-[30px] rounded-[50%] flex justify-center items-center">
          { <FaMoon color="#ffc0cb" /> }
          <FaSun color="#ffff00" />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
