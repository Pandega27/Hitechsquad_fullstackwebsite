/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");
const priceRange = document.getElementById("price-range");
searchForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const query = searchBox.value;
  const searchPageUrl = `/searchBar?query=${encodeURIComponent(query)}`;
  window.location.href = searchPageUrl;
});
