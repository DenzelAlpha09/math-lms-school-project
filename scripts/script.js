const logInBtn = document.querySelector(".logInBtn");
const loginDialog = document.querySelector(".dark-bg");
const closeBtn = document.querySelector(".close");

logInBtn.addEventListener("click", () => {
  loginDialog.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  loginDialog.style.display = "none";
});

// const logInBtn = $(".logInBtn");
// const loginDialog = $(".dark-bg");
// const closeBtn = $(".close");

// logInBtn.on("click", function () {
//   loginDialog.css("display", "flex");
// });

// closeBtn.on("click", function () {
//   loginDialog.css("display", "none");
// });
