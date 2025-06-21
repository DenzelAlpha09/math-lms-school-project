const logInBtn = document.querySelector(".logInBtn");
const loginDialog = document.querySelector(".dark-bg");
const closeBtn = document.querySelector(".close");

logInBtn.addEventListener("click", () => {
  loginDialog.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  loginDialog.style.display = "none";
});
