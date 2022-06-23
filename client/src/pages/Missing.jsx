import React from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }, []);

  return (
    <div className="my-24">
      <div className="flex flex-col items-center flex-wrap justify-center gap-4  ">
        <h2 className="text-3xl md:text-4xl dark:text-white">
          Cette page n'existe pas.
        </h2>
        <h3 className="text-2xl md:text-3xl dark:text-white">
          Vous allez être redirigé.
        </h3>
      </div>
    </div>
  );
};

export default Missing;
