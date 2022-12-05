import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../assets/todoImg.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Authenticate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasswod] = useState(true);
  const navigate = useNavigate();
  const URL = useLocation();

  useEffect(() => {
    if (localStorage.getItem("todoToken")) {
      navigate("/title");
    }
  }, []);

  const handleAuthenticate = async () => {
    try {
      if (URL.pathname.includes("signIn")) {
        let signinData = await axios.post("/login", { email, password });
        localStorage.setItem("todoToken", signinData.data.token);
      } else {
        let signupData = await axios.post("/signup", { name, email, password });
        localStorage.setItem("todoToken", signupData.data.token);
      }
      navigate("/title");
    } catch (error) {
      console.log("handleSignUp Error::", error.message);
    }
  };

  const seePassword = () => {
    setShowPasswod(true);
  };
  const hidePassword = () => {
    setShowPasswod(false);
  };

  return (
    <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
      <div className="flex flex-col items-center border-darkTheme border-[1px] p-[10px] gap-y-[20px]">
        <img src={img} className="h-[200px]" />
        <div
          className={`border-[1px] w-[250px] rounded-[10px] border-black p-[5px] font-Montserrat font-medium ${
            URL.pathname.includes("signIn") ? "hidden" : "block"
          }`}
        >
          <input
            className="outline-none w-[230px]"
            placeholder="Enter Your Name"
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="border-[1px] w-[250px] rounded-[10px] border-black p-[5px] font-Montserrat font-medium">
          <input
            className="outline-none w-[230px]"
            placeholder="Enter Your Email"
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center border-[1px] w-[250px] rounded-[10px] border-black p-[5px] font-Montserrat font-medium">
          <input
            className="outline-none w-[220px]"
            placeholder="Enter Your Password"
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AiFillEye
            className={`cursor-pointer ${showPassword ? "hidden" : "block"}`}
            size={"20px"}
            color="#000000"
            onClick={seePassword}
          />
          <AiFillEyeInvisible
            className={`cursor-pointer ${showPassword ? "block" : "hidden"}`}
            size={"20px"}
            color="#000000"
            onClick={hidePassword}
          />
        </div>
        <button
          className="bg-darkTheme text-white font-Montserrat font-medium px-[10px] py-[5px] rounded-[10px]"
          onClick={handleAuthenticate}
        >
          {URL.pathname.includes("signIn") ? "SIGN IN" : "SIGN UP"}
        </button>
      </div>
    </div>
  );
};

export default Authenticate;
