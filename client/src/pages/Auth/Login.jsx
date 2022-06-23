import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";

import { Link } from "react-router-dom";

import { GiSurferVan } from "react-icons/gi";

const Login = () => {
  const { handleLogin } = useAuthContext();
  const [username, setUsername] = useState("Janebkr");
  const [password, setPassword] = useState("Jane75000!");

  return (
    <>
      <div
        className="dark:bg-main-dark-bg bg-white min-h-screen text-white   bg-cover bg-center"
        style={{
          background:
            "url(https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1000/v1655796834/ecommerce/AuthBg_g1ruq3.jpg)",
        }}
      >
        <div className="min-h-screen flex justify-center">
          <div className="max-w-screen-lg m-0 md:m-20  bg-slate-900/[0.5] shadow sm:rounded-lg flex flex-col justify-center flex-1 pb-8">
            <div className="mt-12 flex flex-col items-center mb-8">
              <GiSurferVan size={80} className="mb-4 " />
              <h1 className="text-3xl font-extrabold ">RIDESHOP</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-sm font-semibold text-gray-300">
                Explorez RIDESHOP avec notre compte démo :
              </p>
              <form
                className="flex flex-col w-full h-full justify-center items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(username.toLowerCase(), password);
                }}
              >
                <input
                  autoComplete="off"
                  className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  autoComplete="off"
                  className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-[150px] p-2 rounded bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 transition-all duration-300 ease-in-out border text-lg focus:outline-none border-white placeholder-white mt-5"
                >
                  Connexion
                </button>
              </form>
              <p className="pt-4">
                Pas encore client ?
                <Link to="/register" className="ml-2 underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
