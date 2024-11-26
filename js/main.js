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
    ques: `what will be the output of true && 1 || 5`,
    opt: {
      a: "true",
      b: "false",
      c: "5",
      true: "1",
    },
  },
  {
    ques: `what will be the output of 1 + 3 * "2" + "a" ?`,
    opt: {
      a: "NaN",
      b: "16a",
      c: "132a",
      true: "7a",
    },
  },
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
  {
    ques: "Which one below is a non-primitive data type?",
    opt: {
      a: "true",
      b: "1",
      c: "NaN",
      true: "[2, 4, 5]",
    },
  },
  {
    ques: "By which syntax we can pick a unique single element from html document?",
    opt: {
      a: "document.getElementByClassName('<classname>')",
      true: "document.getElementById('<id>')",
      c: "document.querySelector('<.classname>')",
      d: "All of them above",
    },
  },
  {
    ques: "which one is true for 'var' keyword",
    opt: {
      a: "Global scoped",
      b: "Can be re-assigned",
      c: "Can be re-declared",
      true: "All of them above",
    },
  },
  {
    ques: "If you want to console.log(a) before declaring let a = 10, what will it return?",
    opt: {
      a: "undefined",
      true: "Will throw an ReferenceError",
      c: "Will throw an TypeError",
      d: "None of them",
    },
  },
];

// !!=============shuffle question on reload====================
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Shuffle the question array wach time page reloads
const shuffledQuesSet = shuffle([...questionSet]);


//selecting an answer============================================
answerSec.addEventListener("click", (event) => {
  event.stopPropagation();
  //enabling/disabling areas=========================
  nextBtn.setAttribute("aria-disabled", "false");
  nextBtn.classList.remove("disabled");
  answerSec.classList.add('cursorDisable');
  //actions if selected answer is correct or incorrect
  if (event.target.getAttribute("correctAnswer") === "true") {
    score += 100 / (questionSet.length + 1);
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
  event.stopPropagation();
  //enabling/disabling areas===================
  nextBtn.classList.add("disabled");
  nextBtn.setAttribute("aria-disabled", "true");
  answerSec.classList.remove('cursorDisable');
  //updating progressbar=======================
  progress += 100 / (questionSet.length + 1);
  progressLength.style.width = `${Math.round(progress)}%`;
  progressLength.innerText = `${Math.round(progress)}%`;
  //aplying flip animation=====================
  answerSec.classList.add("flipOut");
  if(progress >= 100) {
    //creating success page====================
    question.style.display = 'none';
    const successPage = document.createElement('div');
    successPage.classList.add('successPage', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'gap-3', 'shadow', 'popUp');
    const congrats = document.createElement('h3');
    congrats.innerText = 'Congratulations!';
    const completion = document.createElement('h5');
    completion.innerText = 'You have completed the quiz';
    const scoreIs = document.createElement('h5');
    scoreIs.innerText = 'Your score is';
    const finalScore = document.createElement('h1');
    finalScore.classList.add('finalScore')
    finalScore.innerText = Math.round(score);
    //appending elements==========================
    successPage.appendChild(congrats);
    successPage.appendChild(completion);
    successPage.appendChild(scoreIs);
    successPage.appendChild(finalScore);
    canvas.replaceChild(successPage, answerSec);
    //applying zoom-in effect=====================
    setTimeout(() => {
      successPage.classList.remove('popUp');
      successPage.style.transition = '0.6s ease'
    }, 100);
  }
  else {
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
    //updating DOMs with next question and options===
    question.innerText = shuffledQuesSet[questionAnswered].ques;
    let i = 0;
    for (let option in shuffledQuesSet[questionAnswered].opt) {
      ansElemSet[i].firstElementChild.innerText =
      shuffledQuesSet[questionAnswered].opt[option];
      if (option === "true") ansElemSet[i].setAttribute("correctAnswer", "true");
      else ansElemSet[i].setAttribute("correctAnswer", "false");
      i++;
    }
    questionAnswered++;
  }
});

//resetting the quiz============================================
resetBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  window.location.reload();
});
