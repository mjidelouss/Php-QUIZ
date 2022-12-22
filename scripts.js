import { questions } from "./data.js";
// Declaring variables 
const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choice1 = document.querySelector('#choice1');
const choice2 = document.querySelector('#choice2');
const choice3 = document.querySelector('#choice3');
const choice4 = document.querySelector('#choice4');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let score = 0;
let questionIndex = 0;
let questionCounter = 0;

// function shuffleArray to shuffle the array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const shuffledQuestions = shuffleArray(questions);

function initTest() {
    question.innerText = shuffledQuestions[questionIndex].question;
    choice1.innerText = shuffledQuestions[questionIndex].choice1;
    choice2.innerText = shuffledQuestions[questionIndex].choice2;
    choice3.innerText = shuffledQuestions[questionIndex].choice3;
    choice4.innerText = shuffledQuestions[questionIndex].choice4;

    // Set the data-correct attribute for each choice element based on the correct answer
    choice1.dataset.correct = shuffledQuestions[questionIndex].answer === 1;
    choice2.dataset.correct = shuffledQuestions[questionIndex].answer === 2;
    choice3.dataset.correct = shuffledQuestions[questionIndex].answer === 3;
    choice4.dataset.correct = shuffledQuestions[questionIndex].answer === 4;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        const selectedChoice = e.target;
        const correct = selectedChoice.dataset.correct;
        console.log(choice.dataset.correct)
        questionCounter++;
        progressBarFull.style.width = `${(questionCounter / 10) * 100}%`;
        progressText.innerText = `Question ${questionCounter} / ${10}`;
        if (correct === 'true') {
            score += 100;
            scoreText.innerText = score;
            selectedChoice.parentElement.classList.add('correct');
            choices.forEach (choice => {
                if (choice != selectedChoice) {
                    choice.parentElement.classList.add('incorrect');
                }
            })
        } else if (correct === 'false') {
            selectedChoice.parentElement.classList.add('incorrect');
            choices.forEach(choice => {
                if (choice !== selectedChoice) {
                    if (choice.dataset.correct === 'true') {
                    choice.parentElement.classList.add('correct');
                    }
                    else {
                        choice.parentElement.classList.add('incorrect');
                    }
                }
            });
        }
        setTimeout(() => {
            choices.forEach(choice => {
                choice.parentElement.classList.remove('correct');
                choice.parentElement.classList.remove('incorrect');
            });
            questionIndex++;
            console.log(questionIndex)
            initTest();
          }, 1000);
    });
});


initTest();



























// // declaring variables
// const question = document.querySelector('#question');
// const answerBox = document.querySelector('#answers-box');
// const quizzContainer = document.querySelector('#quizz-container');
// const scoreContainer = document.querySelector('#score-container');
// const letters = ['a', 'b', 'c', 'd', 'e'];
// let points = 0;
// let actualQuestion = 0;

// // substitution of the quiz for the first question
// function init() {
//   // create first question
//   createQuestion(0);
// }

// // create a question
// function createQuestion(i) {
//   // clear previous page
//   const oldButtons = answerBox.querySelectorAll('button');
//   oldButtons.forEach((btn) => {
//     btn.remove();
//   });
//   // change question text
//   const questionText = question.querySelector('#question-text');
//   const questionNumber = question.querySelector('#question-number');
//   questionText.textContent = questions[i].question;
//   questionNumber.textContent = i + 1;
//   // insert alternatives
//   questions[i].answers.forEach((answer, i) => {
//     // create quiz button template
//     const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
//     const letterBtn = answerTemplate.querySelector('.btn-letter');
//     const answerText = answerTemplate.querySelector('.question-answer');
//     letterBtn.textContent = letters[i];
//     answerText.textContent = answer['answer'];
//     answerTemplate.setAttribute('correct-answer', answer['correct']);
//     // remover hide the template class
//     answerTemplate.classList.remove('hide');
//     answerTemplate.classList.remove('answer-template');
//     // insert alternative on screen
//     answerBox.appendChild(answerTemplate);
//     // insert click event on button
//     answerTemplate.addEventListener('click', function () {
//       checkAnswer(this);
//     });
//   });
//   // increment questions
//   actualQuestion++;
// }

// // check user response
// function checkAnswer(btn) {
//   // select all buttons
//   const buttons = answerBox.querySelectorAll('button');
//   // check if correct answer and add class
//   buttons.forEach((button) => {
//     if (button.getAttribute('correct-answer') == 'true') {
//       button.classList.add('correct-answer');
//       // check if user got the question right
//       if (btn === button) {
//         // increment the points
//         points++;
//       }
//     } else {
//       button.classList.add('wrong-answer');
//     }
//   });

//   // show new question
//   nextQuestion();
// }

// // displays the next question in the quiz
// function nextQuestion() {
//   // timer for user to see answers
//   setTimeout(function () {
//     // check if there are still questions
//     if (actualQuestion >= questions.length) {
//       // displays success message
//       showSuccessMessage();
//       return;
//     }

//     createQuestion(actualQuestion);
//   }, 1200);
// }

// // display the final screen
// function showSuccessMessage() {
//   hideOrShowQuizz();

//   // exchange data success screen
//   // calculate score
//   const score = ((points / questions.length) * 100).toFixed(2);

//   const displayScore = document.querySelector('#display-score span');
//   displayScore.textContent = score.toString();

//   // change the number of correct questions
//   const correctAnswers = document.querySelector('#correct-answers');
//   correctAnswers.textContent = points;

//   // change total questions
//   const totalQuestions = document.querySelector('#questions-qty');
//   totalQuestions.textContent = questions.length;
// }

// // show or hide the score
// function hideOrShowQuizz() {
//   quizzContainer.classList.toggle('hide');
//   scoreContainer.classList.toggle('hide');
// }

// // restart quizz
// const restartBtn = document.querySelector('#restart');
// restartBtn.addEventListener('click', function () {
//   // reset test
//   actualQuestion = 0;
//   points = 0;
//   hideOrShowQuizz();
//   init();
// });

// // initialize test
// init();
