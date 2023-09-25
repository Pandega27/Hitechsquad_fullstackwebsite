/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    name: String,
    minLength: 8,
    maxLength: 100,
  },
  price: {
    type: Number,
    minLength: 0,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    minLength: 0,
    maxLength: 1000,
  },
  vendor: String,
  category: {
    type: String,
    minLength: 0,
  },
});
module.exports = mongoose.model("Product", productSchema);
