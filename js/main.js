//? elements==================================================
let questionAnswered = 0;
let score = 0;
let progress = 0;
const canvas = document.getElementById("canvas");
const progressLength = document.getElementById("progressLength");
const question = document.getElementById("question");
const answerSec = document.getElementById("answerSec");
const ansElemSet = Array.from(answerSec.children);
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");

// ? QuestionSet===============================================
const questionSet = [
  {
    ques: "What will be the result of NaN !== NaN - 1 ?",
    opt: {
      true: "true",
      b: "false",
      c: "0",
      d: "-1",
    },
  },
  {
    ques: "What will be the result of !([] == 0) || NaN && 2?",
    opt: {
      a: "true",
      b: "false",
      true: "NaN",
      d: "2",
    },
  },
];
//selecting an answer============================================
answerSec.addEventListener("click", (event) => {
  event.stopPropagation();
  //enabling next button===============================
  nextBtn.setAttribute("aria-disabled", "false");
  nextBtn.classList.remove("disabled");
  //actions if selected answer is correct or incorrect
  if (event.target.getAttribute("correctAnswer") === "true") {
    score += 20;
    event.target.classList.add("bg-success", "text-white");
    Array.from(answerSec.children).forEach((elem) =>
      elem.classList.add("disableArea")
    );
  } else if (event.target.getAttribute("correctAnswer") === "false") {
    event.target.classList.add("bg-danger", "text-white");
    Array.from(answerSec.children).forEach((elem) => {
      elem.classList.add("disableArea");
      if (elem.getAttribute("correctAnswer") === "true") {
        elem.classList.add("bg-success", "text-white");
      }
    });
  }
});

//switching to next question====================================
nextBtn.addEventListener("click", (event) => {
  //re-disabling nextBtn=======================
  nextBtn.classList.add("disabled");
  nextBtn.setAttribute("aria-disabled", "true");
  event.stopPropagation();
  //updating progressbar=======================
  progress += 20;
  progressLength.style.width = `${progress}%`;
  progressLength.innerText = `${progress}%`;
  //aplying flip animation=====================
  answerSec.classList.add("flipOut");
  setTimeout(() => {
    answerSec.classList.remove("flipOut");
  }, 600);
  //resetting the state============================
  Array.from(answerSec.children).forEach((elem) =>
    elem.classList.remove(
      "disableArea",
      "bg-danger",
      "bg-success",
      "text-white"
    )
  );
  //updating DOMs with next question and options
  question.innerText = questionSet[questionAnswered].ques;
  let i = 0;
  for (let option in questionSet[questionAnswered].opt) {
    ansElemSet[i].firstElementChild.innerText =
      questionSet[questionAnswered].opt[option];
    if (option === "true") ansElemSet[i].setAttribute("correctAnswer", "true");
    else ansElemSet[i].setAttribute("correctAnswer", "false");
    i++;
  }
  questionAnswered++;
});

//resetting the quiz============================================
resetBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  window.location.reload();
});
