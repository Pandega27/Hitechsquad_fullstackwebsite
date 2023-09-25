// <!-- /* RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
// ID: S3963166, S3824107, S4011912, S3969997, S3927476 
// Acknowledgement: */ -->

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://TranVy:vyvy0301@webdev.9bwcpvl.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.error(err));