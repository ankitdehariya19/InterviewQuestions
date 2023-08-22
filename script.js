import questionAndAnswerData from './data.js';

const languageSelect = document.getElementById("languageSelect");
const qaContainer = document.getElementById("qaContainer");
const darkModeToggle = document.getElementById("darkModeToggle");

const populateLanguageOptions = () => {
  const languages = Object.keys(questionAndAnswerData);
  languages.forEach(language => {
    const option = document.createElement("option");
    option.value = language.toLowerCase();
    option.textContent = language;
    languageSelect.appendChild(option);
  });
};

populateLanguageOptions();

languageSelect.addEventListener("change", () => {
  const selectedLanguage = languageSelect.value;
  const questionsAndAnswers = questionAndAnswerData[selectedLanguage] || [];
  displayQuestionsAndAnswers(selectedLanguage, questionsAndAnswers);
});

darkModeToggle.addEventListener("click", () => {
  const isDarkMode = darkModeToggle.checked;
  setDarkMode(isDarkMode);
});

function displayQuestionsAndAnswers(language, questionsAndAnswers) {
  qaContainer.innerHTML = "";

  questionsAndAnswers.forEach((qa, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-container";

    const uniqueQuestionId = `${language}_${index}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "question-checkbox";
    checkbox.dataset.questionId = uniqueQuestionId;
    checkbox.checked = localStorage.getItem(uniqueQuestionId) === 'true';
    questionDiv.appendChild(checkbox);

    const question = document.createElement("p");
    question.className = "question";
    question.textContent = qa.question;
    questionDiv.appendChild(question);

    const answer = document.createElement("p");
    answer.className = "answer";
    answer.textContent = `Answer: ${qa.answer}`;
    questionDiv.appendChild(answer);

    qaContainer.appendChild(questionDiv);

    checkbox.addEventListener("change", function () {
      const isChecked = this.checked;
      const questionId = this.dataset.questionId;
      updateLocalStorage(questionId, isChecked);
    });
  });
}

function updateLocalStorage(questionId, isChecked) {
  localStorage.setItem(questionId, isChecked);
}

window.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".question-checkbox");
  checkboxes.forEach(checkbox => {
    checkbox.checked = localStorage.getItem(checkbox.dataset.questionId) === 'true';
  });

  // Set initial dark mode state on page load
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  setDarkMode(isDarkMode);
});

function setDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    qaContainer.classList.add("dark-mode");

    // Update custom properties for text color and container background color
    document.body.style.setProperty("--text-color", "#fff"); // Change this to your desired text color for dark mode
    document.body.style.setProperty("--container-bg-color", "#2a2a2a");
  } else {
    document.body.classList.remove("dark-mode");
    qaContainer.classList.remove("dark-mode");

    // Update custom properties for text color and container background color
    document.body.style.setProperty("--text-color", "#333"); // Change this to your desired text color for light mode
    document.body.style.setProperty("--container-bg-color", "var(--initial-bg-color)");
  }
}
