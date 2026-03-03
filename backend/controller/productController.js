import productModel from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';

// =======================
// ADD PRODUCT
// =======================
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const image = req.file;
    let imageUrl = "";

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    } else {
      imageUrl = "https://via.placeholder.com/150";
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      image: imageUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log("ADD PRODUCT ERROR 👉", error);
    res.json({
      success: false,
      message: "Could not add product",
    });
  }
};

// =======================
// LIST PRODUCT (✅ FIXED)
// =======================
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({
      success: true,
      products: products,   // 🔥 frontend expects this
    });
  } catch (error) {
    console.log("LIST PRODUCT ERROR 👉", error);
    res.json({
      success: false,
      message: "Could not fetch products",
    });
  }
};

// =======================
// REMOVE PRODUCT
// =======================
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    console.log("REMOVE PRODUCT ERROR 👉", error);
    res.json({
      success: false,
      message: "Could not remove product",
    });
  }
};

// =======================
// SINGLE PRODUCT
// =======================
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("SINGLE PRODUCT ERROR 👉", error);
    res.json({
      success: false,
      message: "Could not fetch product",
    });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
