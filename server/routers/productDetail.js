/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require("express");
const router = express.Router();
const categories = require("../../categories.json");

const productController = require("../controllers/productControllers");
const sessionController = require("../controllers/sessionController");

router.route("/:productId").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const productId = req.params.productId;
    const product = await productController.getProductById(productId);

    let cart = req.session.cart || [];
    const user = req.session.user;

    res.render("productDetail", {
      product: product,
      categories: categories,
      user: user,
      cart: cart,
    });
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
