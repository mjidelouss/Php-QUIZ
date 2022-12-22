import { questions } from "./data.js";
// Declaring variables 
const question = document.querySelector('#question');
const options = Array.from(document.getElementsByClassName("option-text"));
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timer = document.querySelector('#timer');

let score = 0;
let questionIndex = 0;
let questionCounter = 0;
let countdown = 10;

// function shuffleArray to shuffle the array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

const shuffledQuestions = shuffleArray(questions);

function initTest() {
    question.innerText = shuffledQuestions[questionIndex].question;
    option1.innerText = shuffledQuestions[questionIndex].option1;
    option2.innerText = shuffledQuestions[questionIndex].option2;
    option3.innerText = shuffledQuestions[questionIndex].option3;
    option4.innerText = shuffledQuestions[questionIndex].option4;

    // Set the data-correct attribute for each option element based on the correct answer
    option1.dataset.correct = shuffledQuestions[questionIndex].answer === 1;
    option2.dataset.correct = shuffledQuestions[questionIndex].answer === 2;
    option3.dataset.correct = shuffledQuestions[questionIndex].answer === 3;
    option4.dataset.correct = shuffledQuestions[questionIndex].answer === 4;
    startCountdown();
}

function startCountdown() {
  // Display the countdown in the page
  timer.innerText = countdown;

  // Decrement the countdown every 1000 milliseconds (1 second)
  let intervalId = setInterval(() => {
    countdown--;
    timer.innerText = countdown;
    if (countdown <= 0) {
      clearInterval(intervalId);
      // Move on to the next question after the countdown ends
      goToNextQuestion();
    }
  }, 1000);
}

function goToNextQuestion() {
    countdown = 10;
  // Clear the countdown from the page
  timer.innerText = '';
  // Increment the question index and update the quiz with the new question
  questionIndex++;
  initTest();
}

options.forEach(option => {
    option.addEventListener('click', e => {
        const selectedoption = e.target;
        const correct = selectedoption.dataset.correct;
        console.log(option.dataset.correct)
        questionCounter++;
        progressBarFull.style.width = `${(questionCounter / 10) * 100}%`;
        progressText.innerText = `Question ${questionCounter} / ${10}`;
        if (correct === 'true') {
            score += 100;
            scoreText.innerText = score;
            selectedoption.parentElement.classList.add('correct');
            options.forEach (option => {
                if (option != selectedoption) {
                    option.parentElement.classList.add('incorrect');
                }
            })
        } else if (correct === 'false') {
            selectedoption.parentElement.classList.add('incorrect');
            options.forEach(option => {
                if (option !== selectedoption) {
                    if (option.dataset.correct === 'true') {
                    option.parentElement.classList.add('correct');
                    }
                    else {
                        option.parentElement.classList.add('incorrect');
                    }
                }
            });
        }
        
        setTimeout(() => {
            options.forEach(option => {
                option.parentElement.classList.remove('correct');
                option.parentElement.classList.remove('incorrect');
            });
            goToNextQuestion();
            console.log(questionIndex)
          }, 1000);
    });
});


initTest();