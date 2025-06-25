const fValue = document.querySelector(".val1");
const sValue = document.querySelector(".val2");
const submit = document.getElementById("submit-answer");
const userAnswer = document.getElementById("user-answer");
const container = document.querySelector(".container");

container.style.display = "none";
let countdownInterval = null;
let countdownEndTime = null;

// function declaration for random number generation
function generateRandomValues() {
  fValue.textContent = Math.floor(Math.random() * 13);
  sValue.textContent = Math.floor(Math.random() * 13);
}

// function for coutdown timer
function startCountdown(endTime) {
  countdownEndTime = endTime;

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownEndTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      submit.disabled = false;
      submit.classList.remove("disabled");
      submit.style.cursor = "pointer";
      submit.textContent = "Submit";
      generateRandomValues(); // refresh question
    } else {
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      submit.textContent = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

submit.addEventListener("click", () => {
  const answer = Number(userAnswer.value);
  const correctAnswer = Number(fValue.textContent) * Number(sValue.textContent);

  if (answer === correctAnswer) {
    const endTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    submit.disabled = true;
    submit.classList.add("disabled");
    submit.style.cursor = "not-allowed";
    startCountdown(endTime);
  }
});

// Initial question generation
generateRandomValues();

// report dialog close and open
const closeBtn = document.querySelector(".close-btn");
const reportBtn = document.querySelector(".report-btn");
const reportWindow = document.querySelector(".report-issue");
const openReport = document.querySelector(".open-report");

closeBtn.addEventListener("click", () => {
  reportWindow.style.display = "none";
});

reportBtn.addEventListener("click", () => {
  reportWindow.style.display = "none";
});

openReport.addEventListener("click", () => {
  reportWindow.style.display = "flex";
});

// timetable generation code here
const generateBtn = document.querySelector(".table-btn");
const tableContainer = document.querySelector(".generate-table");

generateBtn.addEventListener("click", () => {
  // Get the current input value inside the event listener
  const number = Number(document.getElementById("multiplicationValue").value);

  // Validate input
  if (number >= 1 && number <= 12) {
    // Clear previous table
    tableContainer.innerHTML = "";

    // Generate multiplication table
    for (let i = 1; i <= 10; i++) {
      const result = number * i;
      const instance = document.createElement("div");
      instance.className = "instance";
      instance.innerHTML = `
        <span class="instanceValue bold">${number}</span> x <span>${i}</span> = 
        <span class="instanceAnswer yellow-bg">${result}</span>
      `;
      tableContainer.appendChild(instance);
    }
  } else {
    // Show feedback for invalid input
    alert("Please enter a number between 1 and 12");
  }
});
