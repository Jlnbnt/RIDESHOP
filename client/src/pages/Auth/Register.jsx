import React, { useState } from "react";

import { useAuthContext } from "../../contexts/AuthProvider";

import { Link } from "react-router-dom";

import { GiSurferVan } from "react-icons/gi";

import toast from "react-hot-toast";

const Register = () => {
  const { handleRegister } = useAuthContext();

  const [name, setName] = useState("");

  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  const handleSubmit = async (e) => {
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    e.preventDefault();
    if (!v1) {
      toast.error(
        <span>
          Votre nom d'utilisateur doit contenir : <br />
          - Seulement des lettres <br />- Au minimum 4 caractères
        </span>
      );
      return;
    } else if (!v2) {
      toast.error(
        <span>
          Votre mot de passe doit contenir : <br />
          - Au minimum 8 caractères
          <br /> - Une majuscule et un carctère spécial{" "}
        </span>
      );
      return;
    } else if (!v3) {
      toast.error("Email invalide");
      return;
    }
    handleRegister(
      name,
      lastname,
      username.toLowerCase(),
      email.toLowerCase(),
      password,
      passwordConfirm
    );
  };

  return (
    <>
      <div
        className="dark:bg-main-dark-bg bg-white min-h-screen text-white bg-cover bg-center"
        style={{
          background:
            "url(https://res.cloudinary.com/dx5ip73lv/image/upload/c_scale,h_1000/v1655796834/ecommerce/AuthBg_g1ruq3.jpg)",
        }}
      >
        <div className="min-h-screen flex justify-center">
          <div className="max-w-screen-lg m-0 md:m-20 bg-slate-900/[0.5] shadow sm:rounded-lg flex flex-col justify-center flex-1 pb-8">
            <div className="mt-12 flex flex-col items-center mb-8">
              <GiSurferVan size={80} className="mb-4 text-white" />
              <h1 className="text-3xl font-extrabold">WebShop</h1>
            </div>

            <div className="flex flex-col justify-center items-center">
              <form
                className="flex flex-col justify-center items-center w-full max-w-screen-sm"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="flex flex-col w-full md:flex-row">
                  <div className="flex flex-col justify-center items-center w-full ">
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5 md:mb-5"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => setUserName(e.target.value)}
                      value={username}
                    />
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5 md:mb-5"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5 md:mb-5"
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastname}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5 md:mb-5"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none  mt-5 md:mb-5"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <input
                      autoComplete="off"
                      className="w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-white placeholder-white text-sm focus:outline-none   mt-5 md:mb-5"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={passwordConfirm}
                    />
                  </div>
                </div>
                <button className="w-[150px] p-2 rounded bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 transition-all duration-300 ease-in-out border text-lg focus:outline-none border-white placeholder-white mt-5">
                  S'inscrire
                </button>
              </form>
              <p className="text-xs mt-4">
                *En vous inscrivant, vous acceptez nos conditions d'utilisation.
              </p>
              <p className="pt-4">
                Déjà client ?
                <Link to="/login" className="ml-2 underline">
                  Connectez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
