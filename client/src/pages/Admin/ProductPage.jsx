import React, { useState, useEffect } from "react";

import { useComponentsContext } from "../../contexts/ComponentsProvider";

import useAxiosReq from "../../hooks/useAxiosReq";

import { useNavigate } from "react-router-dom";

import { FormControlLabel, TextField, Checkbox } from "@mui/material";

const NewProduct = () => {
  const { modProduct } = useComponentsContext();
  const axiosReq = useAxiosReq();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [textField, setTextField] = useState(modProduct?.desc);
  const [title, setTitle] = useState(modProduct?.title);
  const [price, setPrice] = useState(modProduct?.price);
  const [color, setColor] = useState(modProduct?.color);
  const [size, setSize] = useState(modProduct?.size);

  useEffect(() => {
    if (!modProduct) {
      navigate("/admin/productlist");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.value <= 0) return;
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCat = (e) => {
    if (e.target.value <= 0) return;
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const handleFileChange = async () => {
    if (Object.keys(inputs).length <= 0) return;
    else {
      try {
        const response = await axiosReq.put(
          `/products/${modProduct._id}`,
          inputs
        );
        navigate(`/product/${modProduct._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <button
        className="bg-gray-200 p-1 text-slate-900 rounded mt-4 ml-8  "
        onClick={() => {
          navigate(-1);
        }}
      >
        Retour
      </button>
      {modProduct && (
        <div className="w-full flex-1 flex flex-col flex-wrap max-h-full  md:p-8 p-4  ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap ">
              {modProduct.img.map((prodImg) => (
                <img
                  src={prodImg}
                  alt="product"
                  className="h-20 w-20 object-contain"
                />
              ))}
            </div>
            <TextField
              name="title"
              className="max-w-[500px]"
              value={title}
              onFocus={(event) => {
                event.target.select();
              }}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(71 85 105)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(148 163 184)",
                },
                "& .MuiOutlinedInput-input": {
                  color: "rgb(148 163 184)",
                },
              }}
              onChange={(e) => {
                handleChange(e);
                setTitle(e.target.value);
              }}
            />

            <TextField
              name="desc"
              multiline={true}
              value={textField}
              onFocus={(event) => {
                event.target.select();
              }}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(71 85 105)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgb(148 163 184)",
                },
                "& .MuiOutlinedInput-input": {
                  color: "rgb(148 163 184)",
                },
              }}
              onChange={(e) => {
                handleChange(e);
                setTextField(e.target.value);
              }}
            />

            <div className="flex items-center gap-2">
              <TextField
                type="number"
                value={price}
                name="price"
                className="max-w-[100px]"
                onFocus={(event) => {
                  event.target.select();
                }}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(71 85 105)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(148 163 184)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgb(148 163 184)",
                  },
                }}
                onChange={(e) => {
                  handleChange(e);
                  setPrice(e.target.value);
                }}
              />
              <p className="flex items-center text-xl text-slate-400">€</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 ">
              <TextField
                multiline={true}
                value={color}
                name="color"
                onFocus={(event) => {
                  event.target.select();
                }}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(71 85 105)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(148 163 184)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgb(148 163 184)",
                    textTransform: "capitalize",
                  },
                }}
                onChange={(e) => {
                  handleCat(e);
                  setColor(e.target.value);
                }}
              />

              <TextField
                multiline={true}
                name="size"
                value={size}
                onFocus={(event) => {
                  event.target.select();
                }}
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(71 85 105)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(148 163 184)",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgb(148 163 184)",
                    textTransform: "capitalize",
                  },
                }}
                onChange={(e) => {
                  handleCat(e);
                  setSize(e.target.value);
                }}
              />
            </div>
            <FormControlLabel
              style={{ color: "rgb(148 163 184)" }}
              control={
                <Checkbox
                  defaultChecked={modProduct.inStock ? true : false}
                  value={modProduct.inStock ? true : false}
                  onChange={(e) => {
                    setInputs({ inStock: e.target.checked });
                  }}
                  sx={{
                    color: "rgb(148 163 184)",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
              }
              label="En Stock"
            />
          </div>
          <button
            className="bg-gray-200 p-2 px-4 text-xl rounded self-center text-slate-900 hover:bg-slate-400"
            onClick={handleFileChange}
          >
            Valider
          </button>
        </div>
      )}
    </>
  );
};

export default NewProduct;
