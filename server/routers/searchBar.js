/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const sessionController = require("../controllers/sessionController");

const categories = require("../../categories.json");

router.route("/").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const query = req.query.query;
    const price = req.query.price;

    const products = await productController.searchProducts(query, price);

    res.render("homepage", {
      categories: categories,
      displayBreadcrumb: false,
      products: products,
      user: user,
      cart: cart
    });
  } else {
    res.redirect("/user/signin");
  }
});
module.exports = router;
