import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAxiosReq from "../../hooks/useAxiosReq";

import axios from "axios";

import { CircularProgress } from "@mui/material";

import toast from "react-hot-toast";

const NewProduct = () => {
  const axiosReq = useAxiosReq();
  const navigate = useNavigate();

  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const CLOUDINARY_ID = process.env.REACT_APP_CLOUDINARY_ID;

  const [uploadingImg, setUploadingImg] = useState(false);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState([]);

  const test = [];

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const sendProduct = async (product) => {
    try {
      const response = await axiosReq.post("/products", {
        ...inputs,
        img: product,
      });
      setUploadingImg(false);
      navigate("/admin/productlist");
      toast.success("Produit ajouté avec succès");
    } catch (error) {
      if (error.response.status === 409) {
        navigate("/admin/productlist");
        toast.error("Ce produit existe déjà");
      }
      toast.error(`Une erreur est survenue`);
      navigate("/admin/productlist");
      console.log(error);
    }
  };

  async function uploadImage(file) {
    const fileMap = Object.values(file);
    let promise = fileMap.map(
      (fl) =>
        new Promise(async (resolve, reject) => {
          const fileName = inputs.title + " - " + (fileMap.indexOf(fl) + 1);
          const data = new FormData();
          data.append("file", fl);
          data.append("upload_preset", UPLOAD_PRESET);
          data.append("public_id", fileName);
          try {
            const res = await axios.post(
              `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload`,
              data
            );
            const img = res.data.secure_url;
            test.push(img);
            resolve(img);
          } catch (error) {
            reject(error);
          }
        })
    );

    Promise.all(promise)
      .then(() => sendProduct(test))
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFileChange = async (e) => {
    e.preventDefault();
    setFile(e.target.files);
    if (!file) return;
    setUploadingImg(true);
    await uploadImage(file);
  };

  return (
    <div className="min-h-screen flex justify-center text-slate-900 dark:text-white ">
      <div className="dark:bg-slate-800 bg-gray-100 shadow sm:rounded-lg flex flex-col justify-center flex-1 pb-8 w-full ">
        {!uploadingImg ? (
          <>
            <div className="mt-12 flex flex-col items-center mb-8">
              <h1 className="text-3xl font-extrabold">Ajouter un produit</h1>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-screen-sm">
                <form className="flex flex-col justify-center items-center w-full  ">
                  <input
                    multiple
                    className="hover:bg-slate-400 text-center cursor-pointer w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900 mt-5"
                    id="inputFile"
                    type="file"
                    name="img"
                    autoComplete="off"
                    placeholder="IMG"
                    onChange={(e) => setFile(e.target.files)}
                  />
                  <div className="flex w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center w-1/2">
                      <input
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900 mt-5"
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                      />

                      <input
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900 mt-5 md:mb-5"
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        onChange={handleChange}
                      />
                      <input
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900  mt-5 md:mb-5"
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/2">
                      <input
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900 mt-5"
                        type="text"
                        placeholder="Categories"
                        name="categories"
                        onChange={handleCat}
                      />
                      <input
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900  mt-5 md:mb-5"
                        type="text"
                        placeholder="Sizes"
                        name="size"
                        onChange={handleCat}
                      />
                      <input
                        name="color"
                        autoComplete="off"
                        className="hover:bg-slate-400 w-3/4 max-w-300 p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900  mt-5 md:mb-5"
                        type="text"
                        placeholder="Color"
                        onChange={handleCat}
                      />
                    </div>
                  </div>
                  <textarea
                    autoComplete="off"
                    className="resize-none hover:bg-slate-400 h-48 w-full p-4 rounded-lg bg-transparent border border-slate-900 dark:border-white  placeholder-slate-900 dark:placeholder:text-white text-sm focus:outline-none focus:border-slate-900 focus:placeholder-slate-900 mt-5"
                    type="text"
                    name="desc"
                    placeholder="Description"
                    onChange={handleChange}
                  />
                </form>
              </div>
              <button
                disabled={!file.length || Object.keys(inputs).length < 7}
                onClick={handleFileChange}
                className="disabled:opacity-40 w-[150px] p-2 rounded bg-gray-400 hover:bg-slate-600 focus:bg-gray-500 transition-all duration-300 ease-in-out border text-lg focus:outline-none border-white placeholder-slate-900 dark:placeholder:text-white mt-5"
              >
                Ajouter
              </button>
            </div>
          </>
        ) : (
          <CircularProgress className="self-center" />
        )}
      </div>
    </div>
  );
};

export default NewProduct;
