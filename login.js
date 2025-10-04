const loginFormContainer = document.querySelector(".login-form-container");
const loginForm = document.querySelector(".login-form");
const resetForm = document.querySelector(".reset-form");
const signupForm = document.querySelector(".signup-form");

const showForm = (formToShow) => {
  [loginForm, resetForm, signupForm].forEach((form) =>
    form.classList.remove("active")
  );
  formToShow.classList.add("active");
};

document.querySelector("#login-btn").onclick = () => {
  loginFormContainer.classList.add("active");
  showForm(loginForm);
};

document.querySelector("#close-login-btn").onclick = () => {
  loginFormContainer.classList.remove("active");
};

// Switch links
document.querySelector("#show-reset").onclick = (e) => {
  e.preventDefault();
  showForm(resetForm);
};

document.querySelector("#show-signup").onclick = (e) => {
  e.preventDefault();
  showForm(signupForm);
};

document.querySelector("#back-to-login-1").onclick = (e) => {
  e.preventDefault();
  showForm(loginForm);
};

document.querySelector("#back-to-login-2").onclick = (e) => {
  e.preventDefault();
  showForm(loginForm);
};
