const navLinks = document.getElementById("nav-links");
const navHamburger = document.getElementById("nav-hamburger");

navHamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const code = localStorage.getItem("code");
const token = localStorage.getItem("token");
if (!code || !token) {
  document.getElementById("nav-edit").style.display = "none";
}
if (!code) {
  document.getElementById("nav-results").style.display = "none";
  document.getElementById("nav-share").style.display = "none";
} else {
  document
    .getElementById("nav-results")
    .querySelector("a").href = `/result?code=${code}`;
}
