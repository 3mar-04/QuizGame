import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".box");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const timerElement = document.querySelector(".timer");
  let timerInterval;
  let timeLeft = 30;

  // Dummy questions and answers (replace with actual data)
  const questions = [
    {
      question: "Which data type is used to store true or false values?",
      answers: ["Integer", "Boolean", "String", "Float"],
      correct: 1,
    },
    {
      question: "What is the result of 9 - 4 + 2?",
      answers: ["7", "6", "5", "4"],
      correct: 0,
    },
    {
      question: "What is the result of 5 / 2 (using integer division)?",
      answers: ["2.5", "2", "3", "0"],
      correct: 1,
    },
    {
      question: "What is the result of 15 % 4 (modulo operation)?",
      answers: ["3", "3.75", "4", "5"],
      correct: 0,
    },
    {
      question:
        "Which of the following is a valid data type in most programming languages?",
      answers: ["Integer", "Float", "String", "All of the above"],
      correct: 3,
    },
    {
      question: "Which data type is used to store a sequence of characters?",
      answers: ["Integer", "Float", "String", "Boolean"],
      correct: 2,
    },
    {
      question:
        "What is the result of 10 + 3 * 2 (following order of operations)?",
      answers: ["26", "16", "20", "13"],
      correct: 1,
    },
    {
      question: "What is the result of 7 % 3 (modulo operation)?",
      answers: ["1", "3", "0", "2"],
      correct: 0,
    },
    {
      question:
        "How many faculties does Al-Zaytoonah University of Jordan have?",
      answers: ["7", "9", "10", "11"],
      correct: 1,
    },
    {
      question: 'What does the "==" operator do in most programming languages?',
      answers: [
        "Assigns a value to a variable",
        "Compares two values for equality",
        "Adds two values",
        "Divides two values",
      ],
      correct: 1,
    },
    {
      question: "What is the result of 5 * 3 + 10?",
      answers: ["25", "35", "15", "20"],
      correct: 0,
    },
    {
      question: "Which data type is used to store numeric values?",
      answers: ["String", "Integer", "Boolean", "Character"],
      correct: 1,
    },
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2,
    },
    {
      question:
        'Which programming language is known as the "mother of all languages"?',
      answers: ["Fortran", "C", "Java", "Assembly"],
      correct: 0,
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Au", "Ag", "Pb", "Fe"],
      correct: 0,
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      answers: ["Earth", "Venus", "Mars", "Jupiter"],
      correct: 2,
    },
    {
      question:
        "Which gas do plants absorb from the atmosphere for photosynthesis?",
      answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
    },
    {
      question: "What is the largest animal on Earth?",
      answers: ["Elephant", "Whale Shark", "Blue Whale", "Giraffe"],
      correct: 2,
    },
    {
      question: "How many prime numbers are there between 1 and 20?",
      answers: ["7", "8", "9", "10"],
      correct: 1,
    },
    {
      question: "What will the following JavaScript code output?",
      answers: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 3, 2, 1]", "[4]"],
      correct: 1,
      code: "let arr = [1, 2, 3]; arr.push(4); console.log(arr);",
    },
  ];

  // Shuffle the questions array to make the order random every time
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Shuffle the questions
  shuffleArray(questions);

  // Generate random cards for questions
  questions.forEach((question, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = `Card ${index + 1}`;
    card.dataset.index = index;
    cardsContainer.appendChild(card);
  });

  // Show modal with question and answers when a card is clicked
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("card")) {
      const questionIndex = event.target.dataset.index;
      showModal(questionIndex);
    }
  });

  function showModal(index) {
    const question = questions[index];
    const answersHTML = question.answers
      .map((answer, i) => {
        return `<li><button class="answer-btn" data-answer="${i}">${answer}</button></li>`;
      })
      .join("");

    modal.innerHTML = ` 
      <h2 class="question">${question.question}</h2>
      <ul>${answersHTML}</ul>
      <div class="timer" id="timer">30</div>
    `;

    overlay.classList.add("active");
    modal.classList.add("active");

    startTimer();
    setAnswerHandlers(question.correct);
  }

  function startTimer() {
    let timeLeft = 30;
    const timer = document.getElementById("timer");

    const interval = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(interval);
        closeModal();
      }
    }, 1000);
  }

  function setAnswerHandlers(correctAnswerIndex) {
    const answerBtns = modal.querySelectorAll(".answer-btn");

    answerBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedAnswer = parseInt(btn.dataset.answer);

        // Disable all answer buttons after one is clicked
        answerBtns.forEach((button) => (button.disabled = true));

        if (selectedAnswer === correctAnswerIndex) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
          answerBtns[correctAnswerIndex].classList.add("correct");
        }
      });
    });
  }

  function closeModal() {
    overlay.classList.remove("active");
    modal.classList.remove("active");
  }

  // Close modal when overlay is clicked
  overlay.addEventListener("click", closeModal);
});
