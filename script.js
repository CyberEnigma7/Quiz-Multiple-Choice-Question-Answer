const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, correctQuestionIndex; 
let quizScore = 0;

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () =>{
  correctQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  correctQuestionIndex = 0;
  questionContainerEl.classList.remove('hide')
  setNextQuestion()
  quizScore = 0;
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[correctQuestionIndex])
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button')
    button.innerText = answer.text;
    button.classList.add('btn')
    if(answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === 'true'

  setStatusClass(document.body, correct)
  Array.from(answerButtonsEl.children).forEach((button)=> {
    setStatusClass(button, button.dataset.correct);
  })
  if(shuffledQuestions.length > correctQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  }else {
    startButton.innerText = 'restart'
    startButton.classList.remove('hide')
  }

  if(selectedButton.dataset = correct) {
    quizScore++
  }
  document.getElementById('right-answers').innerText = quizScore
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
    element.classList.add('correct')
  }else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: 'which one of these is a JavaScript framework?',
    answers: [
      {text: 'Python', correct: false},
      {text: 'Django', correct: false},
      {text: 'React', correct: true},
      {text: 'Eclipse', correct: false}
    ],
  },
  
  {
    question: 'What is the file extension for a JavaScript file?',
    answers: [
      {text: '.js', correct: true},
      {text: '.java', correct: false},
      {text: '.jsx', correct: false},
      {text: '.ts', correct: false}
    ],
  },
  
  {
    question: 'Which CSS property is used to change the text color of an element?',
    answers: [
      {text: 'background-color', correct: false},
      {text: 'font-color', correct: false},
      {text: 'color', correct: true},
      {text: 'text-color', correct: false}
    ],
  },

  {
    question: 'Which of these is a NoSQL database?',
    answers: [
      {text: 'MySQL', correct: false},
      {text: 'PostgreSQL', correct: false},
      {text: 'MongoDB', correct: true},
      {text: 'Oracle', correct: false}
    ],
  },

  {
    question: 'What is the correct syntax to output "Hello World" in Python?',
    answers: [
      {text: 'echo("Hello World")', correct: false},
      {text: 'print("Hello World")', correct: true},
      {text: 'console.log("Hello World")', correct: false},
      {text: 'System.out.println("Hello World")', correct: false}
    ],
  },
]