// /* RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
// ID: S3963166, S3824107, S4011912, S3969997, S3927476 
// Acknowledgement: */

const express = require("express");
const router = express.Router();
const { Vendor } = require("../models/customers");
const bcrypt = require("bcrypt");
const sessionController = require("../controllers/sessionController");
const homepage = require("../routers/homepage");
const productController = require("../controllers/productControllers");
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: 1024 * 1024 * 2 })
const categories = require("../../categories.json");
router.route("/signin").get(async (req, res) => {
    if (!(await homepage.renderHomepage(req, res))) {
      res.render("vendorSignin", { message: null });
    }}).post(async (req, res) => {
    try {
      const { username, password } = req.body;
      const vendor = await Vendor.findOne({ username });
      if (!vendor) {
        return res.render("vendorSignin", {
          message: "Invalid username or password",
        });
      }
      const isPasswordValid = await bcrypt.compare(password, vendor.password);
      if (!isPasswordValid) {
        return res.render("vendorSignin", {
          message: "Invalid username or password",
        });
      }
      sessionController.createSession(req, vendor);
      await homepage.renderHomepage(req, res);
    } catch (error) {
      console.error(error);
      res.render("vendorSignin", {
        message: "An error occurred. Please try again later.",
      });
    }
});
router.route("/signup").get(async (req, res) => {
    res.render("vendorSignup", { message: null });
  }).post(async (req, res) => {
    try {
      const { username, password, businessName, businessAddress } = req.body;
      const type = "vendor";
      let existingVendor = await Vendor.findOne({ username });
      if (existingVendor) {
        return res.render("vendorSignup", {
          message: "Vendor username is already taken",
          messageType: "error",
        });}
      existingVendor = await Vendor.findOne({ businessAddress });
      if (existingVendor) {
        return res.render("vendorSignup", {
          message: "Vendor business address is already taken",
          messageType: "error",
        });}
      existingVendor = await Vendor.findOne({ businessName });
      if (existingVendor) {
        return res.render("vendorSignup", {
          message: "Vendor business name is already taken",
          messageType: "error",
        });}
      const hashedPassword = await bcrypt.hash(password, 10);
      const vendor = new Vendor({
        username,
        password: hashedPassword,
        businessName,
        businessAddress,
        type,
      });
      await vendor.save();
      const message = "Vendor sign up successful!";
      const messageType = "success";
      res.render("vendorSignup", { message, messageType });
    } catch (error) {
      console.error(error);
      const message = "Error signing up as a vendor.";
      const messageType = "error";
      res.render("vendorSignup", { message, messageType });
    }});
router.route("/addProduct").get(async (req, res) => {
    if (sessionController.hasSession(req)) {
      const user = req.session.user;
      let cart = req.session.cart || [];
      res.render("addProduct", {
        isSubmitted: false,
        categories: categories,
        user: user,
        cart,
      });
    } else {
      res.redirect("/vendor/signin/");
    }}).post(upload.single("image"), productController.addProduct);
// Assuming you have already imported the necessary modules and controllers

router.route('/deleteProduct/:productId')
  .get((req, res) => {
    // Render a confirmation page or perform any other needed actions
    // before deleting the product (e.g., asking for confirmation).
    // You can also handle the deletion directly in the POST request.
    res.render('deleteProductConfirmation', {
      productId: req.params.productId,
    });
  })
  .post(productController.deleteProduct);

module.exports = router;