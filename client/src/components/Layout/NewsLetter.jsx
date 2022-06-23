import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineArrowRight } from "react-icons/ai";

import toast from "react-hot-toast";
const NewsLetter = () => {
  const navigate = useNavigate();
  const [newsInput, setNewsInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    toast.success(
      `${newsInput} est désormais abonné(e) à la newletter de RIDESHOP !`
    );
    setNewsInput("");
  };

  return (
    <div className="bg-cyan-50 h-full w-full text-slate-900 flex flex-col justify-center items-center py-8 font-semibold my-8">
      <h2 className="text-3xl md:text-4xl">Recevez notre newsletter</h2>
      <p className="font-medium text-center pt-2">
        Restez informé des dernieres promos et actus de vos produits favoris
      </p>
      <div className="h-full p-8 flex flex-col justify-center items-center">
        <form
          className="flex rounded items-center justify-center px-3 dark:text-gray-200 bg-white dark:bg-slate-900 shadow-xl"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="email"
            autoComplete="off"
            placeholder="Votre email.."
            className="py-4 px-2 w-60 bg-transparent dark:placeholder-white placeholder-slate-900 outline-none md:w-80"
            value={newsInput}
            onChange={(e) => setNewsInput(e.target.value)}
          />
          <AiOutlineArrowRight className="dark:text-gray-200 mr-3" size={20} />
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
