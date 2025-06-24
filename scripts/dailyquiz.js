const fValue = document.querySelector(".val1");
const sValue = document.querySelector(".val2");
const submit = document.getElementById("submit-answer");
// generate random values for val1 and val2 from 0 to 12
fValue.textContent = Math.floor(Math.random() * 13);
sValue.textContent = Math.floor(Math.random() * 13);
// check the value of answer to see if its correct (after event click)
submit.addEventListener("click", () => {
  const answer = document.getElementById("user-answer").value;
  if (
    Number(answer) ==
    Number(fValue.textContent) * Number(sValue.textContent)
  ) {
    console.log("correct");
    console.log(answer);
    submit.disabled = true;
    submit.classList.add("disabled");
    submit.style.cursor = "not-allowed";
    submit.textContent = "Correct";
  }
});
