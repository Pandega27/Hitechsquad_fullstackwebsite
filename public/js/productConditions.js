/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const productCreatorForm = document.getElementById("product-creator");
const formName = document.getElementById("name");
const formPrice = document.getElementById("price");
const formCategory = document.getElementById("category");
const formDescription = document.getElementById("description");

productCreatorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setError = (element, message) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".error-message");

  errorDisplay.innerText = message;

  formGroup.classList.add("error");
  formGroup.classList.remove("success");
};

const setSuccess = (element) => {
  const formGroup = element.parentElement;
  const errorDisplay = formGroup.querySelector(".error-message");

  errorDisplay.innerText = "";

  formGroup.classList.remove("error");
  formGroup.classList.add("success");
};

const validateInputs = () => {
  console.log("Hello");
  let errors = 0;
  const formNameValue = formName.value.trim();
  const formPriceValue = formPrice.value.trim();
  if (formNameValue === "") {
    setError(formName, "Required!");
    errors += 1;
  } else if (formNameValue.length < 10 || formNameValue.length > 50) {
    setError(formName, "Product name must be 10 to 50 characters!");
    errors += 1;
  } else {
    setSuccess(formName);
  }
  if (formPriceValue == 0) {
    setError(formPrice, "Required!");
    errors += 1;
  } else if (formPriceValue < 0) {
    setError(formPrice, "Product price must be a positive value!");
    errors += 1;
  } else {
    setSuccess(formPrice);
  }
  if (formDescription.value.length > 500) {
    setError(formDescription, "Max length is 500!");
    errors += 1;
  } else {
    setSuccess(formDescription);
  }
  if (errors == 0) {
    productCreatorForm.submit();
  }
};
