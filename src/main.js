import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".box");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const timerElement = document.querySelector(".timer");
  let timerInterval;
  let timeLeft = 30;

  const questions =
 [
  {
    "question": "Which data type is used to store whole numbers in most programming languages?",
    "answers": ["Integer", "String", "Boolean", "Float"],
    "correct": 0
  },
  {
    "question": "Which of the following is a markup language?",
    "answers": ["JavaScript", "HTML", "C++", "Python"],
    "correct": 1
  },
  {
    "question": "Which symbol is commonly used to comment a line in Python?",
    "answers": ["/* */", "//", "<!-- -->", "#"],
    "correct": 3
  },
  {
    "question": "Which of these is a relational database?",
    "answers": ["MySQL", "Redis", "MongoDB", "Elasticsearch"],
    "correct": 0
  },
  {
    "question": "What is the correct syntax to output 'Hello, World!' in Python?",
    "answers": ["print('Hello, World!')", "printf('Hello, World!')", "System.out.println('Hello, World!')", "echo 'Hello, World!'"],
    "correct": 0
  },
  {
    "question": "Which part of a URL specifies the domain name?",
    "answers": ["/index.html", "https://", "example.com", "www"],
    "correct": 2
  },
  {
    "question": "Which of the following is an object-oriented programming language?",
    "answers": ["Python", "SQL", "HTML", "CSS"],
    "correct": 0
  },
  {
    "question": "Which algorithm has the best time complexity for sorting an already sorted array?",
    "answers": ["Merge Sort", "Quick Sort", "Insertion Sort", "Bubble Sort"],
    "correct": 2
  },
  {
    "question": "Which technology is used to implement virtual machines?",
    "answers": ["Docker", "Kubernetes", "Ansible", "VMware"],
    "correct": 3
  },
  {
    "question": "How many continents are there on Earth?",
    "answers": ["8", "7", "6", "5"],
    "correct": 1
  },
  {
    "question": "What is the capital city of France?",
    "answers": ["Paris", "Madrid", "Berlin", "Rome"],
    "correct": 0
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "answers": ["Venus", "Mars", "Jupiter", "Saturn"],
    "correct": 1
  },
  {
    "question": "What is the boiling point of water in Celsius?",
    "answers": ["120°C", "100°C", "110°C", "90°C"],
    "correct": 1
  },
  {
    "question": "Which animal is known as the 'King of the Jungle'?",
    "answers": ["Tiger", "Lion", "Elephant", "Bear"],
    "correct": 1
  },
  {
    "question": "What is the square root of 64?",
    "answers": ["8", "9", "6", "7"],
    "correct": 0
  },
  {
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "answers": ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"],
    "correct": 1
  },
  {
    "question": "Which ocean is the largest in the world?",
    "answers": ["Atlantic", "Indian", "Arctic", "Pacific"],
    "correct": 3
  },
  {
    "question": "What is the chemical symbol for gold?",
    "answers": ["Ag", "Go", "Au", "Gd"],
    "correct": 2
  },
  {
    "question": "How many sides does a pentagon have?",
    "answers": ["4", "6", "5", "7"],
    "correct": 2
  },
  {
    "question": "Who is known as the 'Father of Computers'?",
    "answers": ["Nikola Tesla", "Alan Turing", "Charles Babbage", "Thomas Edison"],
    "correct": 2
  }
]


  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  shuffleArray(questions);

  questions.forEach((question, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = `Card ${index + 1}`;
    card.dataset.index = index;
    cardsContainer.appendChild(card);
  });

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
