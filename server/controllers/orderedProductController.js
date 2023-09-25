/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const OrderedProduct = require("../models/orderedProduct");

async function addProduct(req, res, products) {
  for (let i = 0; i < products.length; i++) {
    const { name, price, description, vendor, category, image } = products[0];

    try {
      const product = new OrderedProduct({
        name,
        price,
        description,
        vendor,
        category,
        image,
      });

      product.save();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function getAllProducts() {
  try {
    return await OrderedProduct.find();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getProductById(objectId) {
  try {
    return await OrderedProduct.findOne({ _id: objectId });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function removeProductById(objectId) {
  try {
    const removedProduct = await OrderedProduct.findByIdAndRemove(objectId);

    if (removedProduct) {
      console.log('Product removed successfully:', removedProduct);
    } else {
      console.log('Product not found.');
    }
  } catch (error) {
    console.log('Error removing product:', error);
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  removeProductById
};
