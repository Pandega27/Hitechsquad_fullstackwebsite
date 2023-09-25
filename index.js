// <!-- /* RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
// ID: S3963166, S3824107, S4011912, S3969997, S3927476 
// Acknowledgement: */ -->

const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const productCategoryRouter = require("./server/routers/productCategory");
const homepageRouter = require("./server/routers/homepage").router;
const searchRouter = require("./server/routers/searchBar");
const productDetailRouter = require("./server/routers/productDetail");
const aboutRouter = require("./server/routers/about");
const userRouter = require("./server/routers/user");
const vendorRouter = require("./server/routers/vendor");
const shipperRouter = require("./server/routers/shipper");
const cartRouter = require("./server/routers/cart");
const paymentpageRouter = require("./server/routers/paymentpage");
const thankyouRouter = require("./server/routers/thankyou");
const profileRoute = require('./server/routers/profile');

require("./mongoose");

const PORT = 3000;
const app = express();

app.use('views', path.join(__dirname + 'views'))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/user/signin"); 
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "Hello",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/user", userRouter);
app.use("/vendor", vendorRouter);
app.use("/shipper", shipperRouter);

app.use("/homepage", homepageRouter);
app.use("/about", aboutRouter);
app.use("/category", productCategoryRouter);
app.use("/searchBar", searchRouter);
app.use("/product", productDetailRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentpageRouter);
app.use("/thankyou", thankyouRouter);
app.use('/', profileRoute);
app.get("/logout", (req, res) => {
  if (req.session) {
    if(req.session.user){
      delete req.session.user;
    }
  }
  res.redirect("/user/signin");
});
app.use((req, res, next) => {
  res.status(404).send("<h1>Sorry, this page does not exist.</h1>");
});

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
