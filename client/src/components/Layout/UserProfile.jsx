import React, { useEffect, useRef } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

import useAxiosReq from "../../hooks/useAxiosReq";

import { useAuthContext } from "../../contexts/AuthProvider";
import { useComponentsContext } from "../../contexts/ComponentsProvider";
import { useStateContext } from "../../contexts/ContextProvider";

import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import { Radio } from "@mui/material";

import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import toast from "react-hot-toast";

const UserProfile = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const {
    isClicked,
    clickedMenu,
    setIsClicked,
    initialLayoutState,
    setMode,
    currentMode,
  } = useStateContext();
  const { Button } = useComponentsContext();
  const { handleLogout, userId, userInfo, setUserInfo } = useAuthContext();
  const axiosReq = useAxiosReq();
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const CLOUDINARY_ID = process.env.REACT_APP_CLOUDINARY_ID;

  const sendFile = async (file) => {
    const url = file.secure_url;
    try {
      const response = await axiosReq.put(`/users/${userId}`, {
        img: url,
      });
      setIsClicked(initialLayoutState);
      toast.success("Photo de profil modifiée avec succès");
    } catch (error) {
      if (error.response.status === 409) {
        navigate("/admin/productlist");
      }
      toast.error("Ce produit existe déjà");
      console.log(error);
    }
  };

  const uploadProfilePict = async (file) => {
    const myPict = file[0];
    const fileName = new Date().getTime() + myPict.name;
    const data = new FormData();

    data.append("file", myPict);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("public_id", fileName);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload`,
        data
      );
      const myUrl = res.data;
      sendFile(myUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (!e.target.files) return;
    await uploadProfilePict(e.target.files);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axiosReq.get(`/users/${userId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setUserInfo({
          name: response.data.name,
          lastname: response.data.lastname,
          username: response.data.username,
          email: response.data.email,
          img: response.data.img,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    clickedMenu(ref);
    // eslint-disable-next-line
  }, [isClicked]);
  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 z-50">
      <div
        ref={ref}
        className="w-250 md:w-400 float-right h-screen  duration-1000 ease-in-out dark:text-white text-slate-900 transition-all dark:bg-[#484B52] bg-white p-8 overflow-scroll"
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-white text-slate-900">
            Profil
          </p>
          <Button
            icon={<MdOutlineCancel />}
            color={"rgb(148 163 184)"}
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center mt-6 border-color border-b-1 pb-6 ">
          <div className="relative rounded-full h-12 w-12 md:w-24 md:h-24 flex items-center justify-center">
            <img
              className="rounded-full object-cover object-center w-full h-full"
              src={userInfo.img}
              alt="user-profile"
            />
            <div className="absolute flex w-full h-full self-center items-center justify-center bg-gray-500 bg-opacity-40 opacity-0 hover:opacity-100 rounded-full">
              <label
                className="cursor-pointer absolute bottom-2"
                htmlFor="profilepic"
              >
                <InsertPhotoIcon />
              </label>
              <input
                id="profilepic"
                type="file"
                className="invisible"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-xl dark:text-white text-slate-900 capitalize">
              {userInfo.username}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400 capitalize">
              {userInfo.name} {userInfo.lastname}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {userInfo.email}
            </p>
          </div>
        </div>
        <div>
          <Link
            onClick={() => setIsClicked(initialLayoutState)}
            to="/myorders"
            className="flex items-center gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: "rgb(148 163 184)" }}
              className="rounded-full h-8 w-8 p-2  flex items-center justify-center text-xl"
            >
              <PlaylistAddCheckCircleIcon className="text-3xl" />
            </button>
            <div>
              <p className="font-semibold dark:text-white text-slate-900 ">
                Mes commandes
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Voir mes commandes précédentes
              </p>
            </div>
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setIsClicked(initialLayoutState)}
            to="/cart"
            className="flex items-center gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: "rgb(148 163 184)" }}
              className="rounded-full h-8 w-8 p-2  flex items-center justify-center text-xl"
            >
              <ShoppingCartIcon className="text-3xl" />
            </button>
            <div>
              <p className="font-semibold dark:text-white text-slate-900 ">
                Mon Panier
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                Voir mon panier
              </p>
            </div>
          </Link>
        </div>
        <div className="dark:bg-gray-100 bg-slate-900  w-full h-[0.25px] my-6"></div>
        <div className="flex ">
          <div className="mt-4 mr-5 flex items-center">
            <Radio
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
              sx={{
                color: "rgb(148 163 184)",
                "&.Mui-checked": {
                  color: "rgb(148 163 184)",
                },
              }}
            />
            <MdOutlineLightMode className="text-2xl text-gray-700 dark:text-white" />
          </div>
          <div className="mt-4  flex items-center">
            <Radio
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
              sx={{
                color: "rgb(148 163 184)",
                "&.Mui-checked": {
                  color: "rgb(148 163 184)",
                },
              }}
            />
            <MdOutlineDarkMode
              className="text-2xl text-gray-700 dark:text-white"
              style={{ color: "rgb(148 163 184)" }}
            />
          </div>
        </div>
        <div className="mt-8 w-full flex items-center justify-center">
          <button
            className="my-6 w-full p-3 rounded-lg font-semibold text-xl max-w-[200px] text-slate-900 hover:scale-110  bg-gray-200 hover:bg-gray-400 transition-all duration-300 ease-in-out"
            onClick={handleLogout}
          >
            {" "}
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
