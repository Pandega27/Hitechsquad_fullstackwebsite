/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

const sessionController = require("../controllers/sessionController");

router.route("/:categoryName").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const categoryName = req.params.categoryName;
    const categories = require("../../categories.json");

    const user = req.session.user;
    let cart = req.session.cart || [];

    const products = await productControllers.getAllProductsByCategory(
      categoryName
    );

    res.render("productCategory", {
      categories: categories,
      displayBreadcrumb: true,
      categoryName: categories[categoryName],
      products: products,
      cart: cart,
      user: user,
    });
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
