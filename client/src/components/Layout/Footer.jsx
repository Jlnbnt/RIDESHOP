import React from "react";

import { useAuthContext } from "../../contexts/AuthProvider";

import { Link } from "react-router-dom";

import { GiSurferVan } from "react-icons/gi";

const Footer = () => {
  const { handleLogout } = useAuthContext();
  return (
    <div className="w-full h-full p-8 dark:bg-slate-900 bg-gray-100  text-slate-900 dark:text-white ">
      <Link
        to="/accueil"
        onClick={() =>
          window.scrollTo({
            top: "0",
            behavior: "smooth",
          })
        }
        className="items-center gap-3 flex text-2xl font-extrabold tracking-tight w-[150px] "
      >
        <GiSurferVan size={50} />
        <span>RIDESHOP</span>
      </Link>
      <div className="dark:bg-gray-100 bg-slate-900  w-full h-[0.25px] my-8"></div>
      <div className="flex flex-col sm:flex-row sm:justify-around sm:items-start">
        <div className="pb-8 md:pb-0 flex flex-col">
          <span className="text-2xl font-semibold">RIDESHOP</span>
          <Link to="/" className="py-2 hover:underline underline-offset-2">
            Accueil
          </Link>
        </div>
        <div className="pb-8 md:pb-0 flex flex-col">
          <span className="text-2xl font-semibold ">Magasin</span>
          <Link
            to="/products/all"
            className="py-2 hover:underline underline-offset-2"
          >
            Catalogue
          </Link>
          <Link
            to="/products/textile"
            className="py-2 hover:underline underline-offset-2"
          >
            Textile
          </Link>
          <Link
            to="/products/outdoor"
            className="py-2 hover:underline underline-offset-2"
          >
            Equipement Outdoor
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold ">Mon compte</span>
          <Link to="/cart" className="py-2 hover:underline underline-offset-2">
            Panier
          </Link>
          <Link
            to="/myorders"
            className="py-2 hover:underline underline-offset-2"
          >
            Commandes
          </Link>
          <span
            className="py-2 cursor-pointer hover:underline underline-offset-2"
            onClick={handleLogout}
          >
            Déconnexion
          </span>
        </div>
      </div>
      <p className="text-[9px] mt-8 md:mt-0">
        * Ce site web n'a aucune vocation commerciale
      </p>

      <p className="text-[9px]">
        ** Pour toute réclamation, merci d'adresser un courriel à{" "}
        <span className="underline cursor-pointer">
          <a href="mailto:mailhandlerportfolio@gmail.com">l'adresse suivante</a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
