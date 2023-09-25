/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const Product = require("../models/product");
const path = require("path");
const fs = require("fs");

async function getAllProducts(req, res) {
  try {
    return await Product.find();
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function getProductById(objectId) {
  try {
    return await Product.findOne({ _id: objectId });
  } catch (error) {
    console.log(error);
    return
  }
}
async function getAllProductsByCategory(categoryName) {
  try {
    return await Product.find({
      category: categoryName,
    });
  } catch (error) {
    console.log(error);
    return;
  }
}
const searchProducts = async (name, price) => {
  try {
    const regexPattern = new RegExp(`\\b${name}\\b`, "i");
    return await Product.find({ name: { $regex: regexPattern } });
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
async function addProduct(req, res) {
  const { name, price, description, vendor, category } = req.body;

  if (!req.file) {
    const defaultImagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "assets",
      "imgs",
      "product-image.png"
    );

    const file = {
      buffer: fs.readFileSync(defaultImagePath),
      originalname: "product-image.png",
      mimetype: "image/png",
    };
    req.file = file;
  }

  try {
    const product = new Product({
      name: name,
      price: price,
      description: description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      vendor: vendor,
      category: category,
    });

    product.save();
    res.redirect("/homepage/");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function deleteProduct(req, res) {
  // Extract the product ID from the request parameters
  const productId = req.params.productId;

  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      // If the product with the given ID doesn't exist, return an error
      return res.status(404).json({ error: 'Product not found' });
    }

    // Redirect or respond as needed after successful deletion
    res.redirect('/homepage/'); // Redirect to a products listing page or another appropriate URL
  } catch (error) {
    // Handle any errors that occur during deletion
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
  getAllProducts,
  getAllProductsByCategory,
  getProductById,
  addProduct,
  searchProducts,
  deleteProduct
};
