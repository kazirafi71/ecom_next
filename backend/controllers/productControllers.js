const ProductModel = require("../model/ProductModel");
const cloudinary = require("../middleware/cloudinary");

module.exports.getAllProducts__controller = async (req, res) => {
  try {
    const allProducts = await ProductModel.find({});

    return res.status(200).json({ allProducts: allProducts });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.productDetails__controller = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = await ProductModel.findOne({ _id: productId });

    return res.status(200).json(productDetails);
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.addProduct__controller = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res
        .status(400)
        .json({ error: "Please provide provide required info" });
    }

    const imageInfo = await cloudinary.uploader.upload(
      req.file.path,

      {
        folder: "ecom_next",
        quality: 60,
      }
    );

    const newProd = new ProductModel({
      name,
      description,
      price,
      quantity,
      image: imageInfo?.secure_url,
      asset_id: imageInfo?.asset_id,
      createdAt: req.user._id,
    });

    const saveInfo = await newProd.save();

    return res.status(201).json({ success: "New product added", saveInfo });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong", error });
  }
};
