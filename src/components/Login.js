import React, { useEffect, useState } from "react";
import SideImage from "../assets/sideImage.png";
import LogoImage from "../assets/logo.svg";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLogin", login);
  }, [login]);

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }    
    localStorage.setItem('email', email);
    navigate('/home')
  };
  return (
    <div className="w-screen h-screen md:flex-row flex flex-col-reverse justify-between">
      <div className="w-full h-screen flex flex-col justify-center">
        <div className="w-full md:pt-0 pt-20 flex items-center justify-center px-10">
          <img
            className="object-position:[0px 0px]"
            src={LogoImage}
            alt="Logo"
          />
        </div>
        <form className="px-10 md:px-20 pt-5 pb-20 md:pb-0 items-center flex-col flex md:h-auto">
          <input
            type="email"
            placeholder="Email"
            className="pl-2 w-full h-[60px] outline-none border border-blue-500 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="pl-2 w-full h-[60px] outline-none border border-blue-500 rounded-xl mt-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/home"}>
            <button
              type="submit"
              className="bg-[#1918FF] text-white flex justify-center px-10 py-4 mt-10 rounded-full"
              onClick={addUser}
            >
              Submit
            </button>
          </Link>
        </form>
      </div>
      <div className="w-full">
        <img className="h-screen w-screen" src={SideImage} alt="bannerImage" />
      </div>
    </div>
  );
};

export default Login;
