import React from "react";

console.log("env::", process.env.REACT_APP_API_URL);

const Navbar = () => {
  return (
    <div className="flex mx-[3%] justify-between h-[50px] items-center border-[1px]">
      <p>TODO</p>
      <div>
        {/* <button>{}</button> */}
        <button>LOGIN</button>
      </div>
    </div>
  );
};

export default Navbar;
