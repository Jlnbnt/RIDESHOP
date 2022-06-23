const Product = require("../models/Product");
const ObjectID = require("mongoose").Types.ObjectId;

const addProduct = async (req, res) => {
  const { title, desc, img, categories, price, brand, size, color, inStock } =
    req.body;

  if (
    !title ||
    !desc ||
    !img ||
    !categories ||
    !price ||
    !brand ||
    !size ||
    !color
  )
    return res.status(400).json({ message: "Informations are missing" });

  const duplicate = await Product.findOne({ title: title }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const result = await Product.create({
      title: title,
      desc: desc,
      img: img,
      price: price,
      brand: brand,
      categories: categories,
      size: size,
      color: color,
      inStock: inStock,
    });
    res
      .status(201)
      .json({ success: `${title} have been added to the database` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },

      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(req.body.qty);
    if (!product) return res.status(400).send("ID unknown : " + req.params.id);
    return res
      .status(200)
      .json({ message: `Product ${req.params.id} has been updated` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const deleteProduct = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await Product.findOneAndDelete({ _id: req.params.id });
    if (!result) return res.status(400).send("Product not found");
    return res
      .status(200)
      .json({ message: `Product ${req.params.id} has been deleted` });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getProduct = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    const result = await Product.findOne({ _id: req.params.id });
    if (!result) return res.status(400).send("No product found");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      if (qCategory === "all") {
        products = await Product.find();
      } else {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      }
    } else {
      products = await Product.find();
    }
    if (!products.length) return res.status(200).json({ products: [] });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
