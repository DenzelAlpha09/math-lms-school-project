const logInBtn = document.querySelector(".logInBtn");
const loginDialog = document.querySelector(".dark-bg");
const closeBtn = document.querySelector(".close");
const logInButton = document.querySelector(".logIn-btn");

logInBtn.addEventListener("click", () => {
  loginDialog.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  loginDialog.style.display = "none";
});

logInButton.addEventListener("click", (e) => {
  e.preventDefault();
  const indexNumber = document.querySelector(".index-number").value;
  const password = document.querySelector(".password").value;
  if (indexNumber == "12345678" && password == "12345678") {
    location.assign("./pages/dashboard.html");
  }
});
