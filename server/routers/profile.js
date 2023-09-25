/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const sessionController = require('../controllers/sessionController');
const categories = require("../../categories.json");

// Define the /profile route
router.get("/profile", async (req, res) => {
  try {
    // Fetch products from the product controller (assuming you have a product controller)
    const products = await productController.getAllProducts(req, res);

    // Check if a user session exists
    if (sessionController.hasSession(req)) {
      const user = req.session.user;
      let cart = req.session.cart || 0;
      
      // Render the profile page with user data and product data
      res.render("profile", { // Assuming "profile" is the view/template for the profile page
        categories: categories,
        displayBreadcrumb: false,
        products: products,
        user: user,
        cart: cart,
      });
    } else {
      // If there's no user session, redirect to the signin page
      res.redirect("/user/signin");
    }
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;