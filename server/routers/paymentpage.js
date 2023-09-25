/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const express = require("express");
const router = express.Router();

const orderedProductController = require("../controllers/orderedProductController");
const sessionController = require("../controllers/sessionController");

router.route("/").get(async (req, res) => {
  if (sessionController.hasSession(req)) {
    const user = req.session.user;
    let cart = req.session.cart || [];

    await orderedProductController.addProduct(req, res, cart);

    delete req.session.cart;
    res.redirect("/thankyou/");
  } else {
    res.redirect("/user/signin");
  }
});

module.exports = router;
