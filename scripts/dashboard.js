document.addEventListener("DOMContentLoaded", () => {
  // Sidebar navigation
  const links = document.querySelectorAll(".sidebar .link");
  const contentSections = document.querySelectorAll(".content-section");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Remove active state from all links
      links.forEach((l) => l.classList.remove("link-active"));
      link.classList.add("link-active");

      // Hide all content sections
      contentSections.forEach((section) => (section.style.display = "none"));

      // Show the selected section
      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
      } else {
        console.error(`Target section with ID ${targetId} not found`);
      }
    });
  });

  // Initial view: show Learn section only
  contentSections.forEach((section) => (section.style.display = "none"));
  document.getElementById("learn").style.display = "block";

  // Daily Quiz Logic
  const fValue = document.querySelector(".val1");
  const sValue = document.querySelector(".val2");
  const submit = document.getElementById("submit-answer");
  const userAnswer = document.getElementById("user-answer");
  const feedback = document.getElementById("daily-quiz-feedback");

  function generateRandomValues() {
    if (fValue && sValue) {
      fValue.textContent = Math.floor(Math.random() * 13);
      sValue.textContent = Math.floor(Math.random() * 13);
    }
  }

  if (submit && userAnswer && feedback) {
    submit.addEventListener("click", () => {
      const answer = Number(userAnswer.value);
      const correct = Number(fValue.textContent) * Number(sValue.textContent);

      if (answer === correct) {
        feedback.textContent = "Correct! Here's a new one.";
        feedback.style.color = "green";
        generateRandomValues();
      } else {
        feedback.textContent = "Incorrect. Try again!";
        feedback.style.color = "crimson";
      }

      userAnswer.value = "";
    });

    generateRandomValues();
  }

  // Multiplication Table
  const generateBtn = document.querySelector(".table-btn");
  const quizBtn = document.querySelector(".quiz-btn");
  const tableContainer = document.querySelector(".generate-table");
  const input = document.getElementById("multiplicationValue");
  const errorMessage = document.getElementById("error-message");
  const digitEntry = document.querySelector(".digit-entry");

  let selectedNumber = null;

  if (generateBtn && quizBtn && tableContainer && input && errorMessage) {
    generateBtn.addEventListener("click", () => {
      const number = Number(input.value);
      if (number >= 1 && number <= 12) {
        errorMessage.textContent = "";
        tableContainer.innerHTML = "";
        selectedNumber = number;

        for (let i = 1; i <= 10; i++) {
          const result = number * i;
          const row = document.createElement("div");
          row.className = "instance";
          row.innerHTML = `<span class="bold">${number}</span> x <span>${i}</span> = <span class="yellow-bg">${result}</span>`;
          tableContainer.appendChild(row);
        }

        quizBtn.style.display = "block";
        input.value = "";
      } else {
        errorMessage.textContent = "Enter a number between 1 and 12";
      }
    });
  }

  // Quiz Section
  const quizSection = document.querySelector(".quiz-section");
  const quizNum = document.querySelector(".quiz-num");
  const quizMultiplier = document.querySelector(".quiz-multiplier");
  const quizAnswer = document.getElementById("quiz-answer");
  const submitQuiz = document.getElementById("submit-quiz");
  const quizFeedback = document.getElementById("learn-quiz-feedback");
  const quizScore = document.getElementById("quiz-score");
  const nextQuestion = document.getElementById("next-question");
  const restartQuiz = document.getElementById("restart-quiz");

  let currentQuestion = 0;
  let score = 0;
  const totalQuestions = 5;
  let usedMultipliers = []; // Track used multipliers
  let answerSubmitted = false; // Track if an answer was submitted

  function generateQuestion() {
    // Ensure unique multipliers
    let multiplier;
    do {
      multiplier = Math.floor(Math.random() * 10) + 1;
    } while (
      usedMultipliers.includes(multiplier) &&
      usedMultipliers.length < 10
    );

    if (usedMultipliers.length >= 10) {
      usedMultipliers = [];
    }

    usedMultipliers.push(multiplier);
    quizNum.textContent = selectedNumber;
    quizMultiplier.textContent = multiplier;
    quizAnswer.value = "";
    quizFeedback.textContent = "";
    answerSubmitted = false;
  }

  if (quizBtn && quizSection && digitEntry) {
    quizBtn.addEventListener("click", () => {
      digitEntry.style.display = "none"; // Hide multiplication table
      quizSection.style.display = "flex"; // Show quiz section instead
      currentQuestion = 0;
      score = 0;
      usedMultipliers = []; // Reset used multipliers
      quizScore.textContent = "0";
      submitQuiz.style.display = "block";
      nextQuestion.style.display = "none";
      restartQuiz.style.display = "none";
      generateQuestion();
    });
  }

  if (submitQuiz && quizAnswer && quizFeedback && quizScore) {
    submitQuiz.addEventListener("click", () => {
      if (answerSubmitted) return; // Prevent multiple submissions

      const answer = Number(quizAnswer.value);
      const correct = selectedNumber * Number(quizMultiplier.textContent);

      if (answer === correct) {
        quizFeedback.textContent = "Correct!";
        quizFeedback.style.color = "green";
        score++;
        quizScore.textContent = score;
      } else {
        quizFeedback.textContent = `Incorrect! Answer: ${correct}`;
        quizFeedback.style.color = "crimson";
      }

      answerSubmitted = true; // Mark answer as submitted
      currentQuestion++;

      if (currentQuestion < totalQuestions) {
        nextQuestion.style.display = "block";
        submitQuiz.style.display = "none";
      } else {
        quizFeedback.textContent += ` Quiz complete! Score: ${score}/${totalQuestions}`;
        restartQuiz.style.display = "block";
        submitQuiz.style.display = "none";
        usedMultipliers = []; // Reset for next quiz
      }
    });
  }

  if (nextQuestion) {
    nextQuestion.addEventListener("click", () => {
      if (!answerSubmitted) return; // Prevent skipping without answering
      generateQuestion();
      submitQuiz.style.display = "block";
      nextQuestion.style.display = "none";
    });
  }

  if (restartQuiz && digitEntry) {
    restartQuiz.addEventListener("click", () => {
      quizSection.style.display = "none";
      digitEntry.style.display = "block"; // Show multiplication table section again
      quizScore.textContent = "0";
      currentQuestion = 0;
      score = 0;
      usedMultipliers = []; // Reset used multipliers
    });
  }

  // View My History Button
  const viewHistoryBtn = document.getElementById("view-history");
  const exerciseHistory = document.querySelector(".exercise-history");

  if (viewHistoryBtn && exerciseHistory) {
    viewHistoryBtn.addEventListener("click", () => {
      exerciseHistory.style.display =
        exerciseHistory.style.display === "none" ? "flex" : "none";
    });
  }

  // Report Modal
  const openReportBtn = document.querySelector(".open-report");
  const closeReportBtn = document.querySelector(".close-btn");
  const reportModal = document.getElementById("report-issue");

  if (openReportBtn) {
    openReportBtn.addEventListener("click", () => {
      reportModal.style.display = "flex";
    });
  }

  if (closeReportBtn) {
    closeReportBtn.addEventListener("click", () => {
      reportModal.style.display = "none";
    });
  }

  if (reportModal) {
    reportModal.addEventListener("click", (e) => {
      if (e.target === reportModal) {
        reportModal.style.display = "none";
      }
    });
  }

  // Enter key shortcuts
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") generateBtn.click();
    });
  }

  if (quizAnswer) {
    quizAnswer.addEventListener("keypress", (e) => {
      if (e.key === "Enter") submitQuiz.click();
    });
  }
});
