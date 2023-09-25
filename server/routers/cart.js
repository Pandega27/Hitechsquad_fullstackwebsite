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

router
  .route("/")
  .get(async (req, res) => {
    if (sessionController.hasSession(req)) {
      const user = req.session.user;
      let cart = req.session.cart || [];

      let products = [];
      for (let i = 0; i < cart.length; i++) {
        let product = await productController.getProductById(cart[i]);

        if (product) {
          products.push(product);
        }
      }

      res.render("cart", { user: user, cart: cart, products: products });
    } else {
      res.redirect("/user/signin");
    }
  })
  .post(async (req, res) => {
    const products = req.params;
    products.price;
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total + products[i];
    }

    total;
    res.render("buy", {
      total: total,
      cart: cart,
    });
  });

router.route("/:productId").get(async (req, res) => {
  const product = await productController.getProductById(req.params.productId);

  if (req.session) {
    if (!req.session.cart) {
      req.session.cart = [product];
    } else {
      req.session.cart.push(product);
    }
  }
  res.redirect("/homepage/");
});
router.route("/delete/:productId").get(async (req, res) => {
  // Get the productId from the URL parameter
  const productIdToRemove = req.params.productId;
  console.log("Removing product with ID:", productIdToRemove);
  console.log("Cart contents:", req.session.cart);

  // Check if the user has an active session
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    // Check if the user has a cart in their session
    if (!req.session.cart) {
      // If there's no cart, redirect to the cart page
      res.redirect("/cart");
      return;
    }

    // Find the index of the product with the matching productId in the cart
    const productIndex = req.session.cart.findIndex(
      (product) => product._id === productIdToRemove
    );
    console.log(productIndex===-1);
    // Check if the product is found in the cart
      // Remove the product from the cart array
    req.session.cart.splice(productIndex, 1);

      // Redirect back to the cart page after removal
    res.redirect("/cart");
    console.log("Updated cart contents:", req.session.cart);
    return;
  } else {
    // If there's no active session, redirect to the sign-in page
    res.redirect("/user/signin");
  }
  // After removing the product
  

});
module.exports = router;
