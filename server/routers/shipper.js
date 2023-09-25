/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require("express");
const router = express.Router();
const { Shipper } = require("../models/customers");
const bcrypt = require("bcrypt");

const sessionController = require("../controllers/sessionController");
const orderedProductController = require("../controllers/orderedProductController");

const homepage = require("../routers/homepage");

router
  .route("/signin")
  .get(async (req, res) => {
    if (!(await homepage.renderHomepage(req, res))) {
      res.render("shipperSignin", { message: null });
    }
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const shipper = await Shipper.findOne({ username });

      if (!shipper) {
        return res.render("shipperSignin", {
          message: "Invalid username or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, shipper.password);

      if (!isPasswordValid) {
        return res.render("shipperSignin", {
          message: "Invalid username or password",
        });
      }

      sessionController.createSession(req, shipper);
      await homepage.renderHomepage(req, res);
    } catch (error) {
      console.error(error);
      res.render("shipperSignin", {
        message: "An error occurred. Please try again later.",
      });
    }
  });
router
  .route("/signup")
  .get(async (req, res) => {
    res.render("shipperSignup", { message: null });
  })
  .post(async (req, res) => {
    try {
      const { username, password, distributionHub } = req.body;
      const type = "shipper";

      const existingShipper = await Shipper.findOne({ username });
      if (existingShipper) {
        return res.render("shipperSignup", {
          message: "Shipper username is already taken",
          messageType: "error",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new vendor using the vendor schema
      const shipper = new Shipper({
        username,
        password: hashedPassword,
        distributionHub,
        type,
      });

      await shipper.save();

      const message = "Shipper sign up successful!";
      const messageType = "success";

      res.render("shipperSignup", { message, messageType });
    } catch (error) {
      console.error(error);
      const message = "Error signing up as a shipper.";
      const messageType = "error";
      res.render("shipperSignup", { message, messageType });
    }
  });

router.route("/dashboard").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const orderedProducts = await orderedProductController.getAllProducts();

    res.render("shipperDashboard", {
      user: user,
      cart: cart,
      orderedProducts: orderedProducts,
      activeProduct: undefined,
    });
  } else {
    res.redirect("/shipper/signin");
  }
});

router.route("/dashboard/view/:productId").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const productId = req.params.productId;
   
    const activeProduct = await orderedProductController.getProductById(
      productId
    );

    const orderedProducts = await orderedProductController.getAllProducts();

    res.render("shipperDashboard", {
      user: user,
      cart: cart,
      orderedProducts: orderedProducts,
      activeProduct: activeProduct,
    });
  } else {
    res.redirect("/shipper/signin");
  }
});

router.route("/dashboard/delivered/:productId").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const productId = req.params.productId;
   
    await orderedProductController.removeProductById(productId)

    const orderedProducts = await orderedProductController.getAllProducts();

    res.render("shipperDashboard", {
      user: user,
      cart: cart,
      orderedProducts: orderedProducts,
      activeProduct: undefined,
    });
  } else {
    res.redirect("/shipper/signin");
  }
});

router.route("/dashboard/cancel/:productId").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;

    let cart = req.session.cart || [];

    const productId = req.params.productId;
   
    await orderedProductController.removeProductById(productId)

    const orderedProducts = await orderedProductController.getAllProducts();

    res.render("shipperDashboard", {
      user: user,
      cart: cart,
      orderedProducts: orderedProducts,
      activeProduct: undefined,
    });
  } else {
    res.redirect("/shipper/signin");
  }
});
module.exports = router;
