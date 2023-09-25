/* RMIT University Vietnam
Course: COSC2430 Web Programming
Semester: 2023B
Assessment: Assignment 2
Author: Abhinaya Bimata Pandega , Santoso David , Tran Pham Quoc Vy , Rybak Polina , Grigory Kovtun 
ID: S3963166, S3824107, S4011912, S3969997, S3927476 
Acknowledgement: */

const signupForm = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

signupForm.addEventListener("submit", (ev) => {
  if (!validateInputs()) {
    ev.preventDefault();
  }
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
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;
  if (username === "") {
    setError(usernameInput, "Username name is required!");
    isValid = false;
  } else if (username.length < 8 || username.length > 15) {
    setError(usernameInput, "Username must be a length from 8 to 15!");
    isValid = false;
  } else if (!username.match(/^[a-zA-Z0-9]+$/)) {
    setError(usernameInput, "Username cannot contain special characters.");
    isValid = false;
  } else {
    setSuccess(usernameInput);
  }

  if (password == "") {
    setError(passwordInput, "Password is required!");
    isValid = false;
  } else if (password.length < 8 || password.length > 20) {
    setError(passwordInput, "Password length must be 8 to 20 characters!");
    isValid = false;
  } else if (
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
    )
  ) {
    setError(
      passwordInput,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character!"
    );
    isValid = false;
  } else {
    setSuccess(passwordInput);
  }

  return isValid;
};
