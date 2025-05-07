const menu = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");
const searchForm = document.querySelector(".search-box-container");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

document.querySelector("#search-bar").onclick = () => {
  searchForm.classList.toggle("active");
};
document.querySelector("#close-icon").onclick = () => {
  searchForm.classList.toggle("active");
};
