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
      "question": "ما هو اسم الينبوع الذي يعتبر من أقدم وأشهر الينابيع في مدينة القدس؟",
      "answers": ["عين سلوان", "عين جدي", "عين حوض", "عين الفوار"],
      "correct": 0
    },
    {
      "question": "ما هي المدينة الفلسطينية التي تشتهر بسوقها القديم وتعتبر مركزًا تجاريًا منذ العصور الوسطى؟",
      "answers": ["الخليل", "نابلس", "غزة", "القدس"],
      "correct": 0
    },
    {
      "question": "ما هو اسم المعلم التاريخي الذي يعتبر أقدم وأكبر كنيسة في مدينة القدس؟",
      "answers": ["كنيسة القيامة", "كنيسة المهد", "كنيسة حنة", "كنيسة البشارة"],
      "correct": 0
    },
    {
      "question": "ما هو الطائر الذي يعد رمزًا للسلام في الثقافة الفلسطينية ويظهر غالبًا في الأدب الشعبي؟",
      "answers": ["حمامة السلام", "العصفور", "النسر", "طائر الحسون"],
      "correct": 0
    },
    {
      "question": "ما هو الاسم الذي كان يطلق على مدينة غزة في العصور القديمة حين كانت مركزًا تجاريًا هامًا؟",
      "answers": ["غزة الكبرى", "غزة القديمة", "غزة الصغرى", "غزة الوسطى"],
      "correct": 0
    },
    {
      "question": "ما هو اسم الجبل الذي يرتفع في الضفة الغربية ويعد نقطة انطلاق لرحلات مشي طويلة؟",
      "answers": ["جبل جرزيم", "جبل عيبال", "جبل الزيتون", "جبل المكبر"],
      "correct": 0
    },
    {
      "question": "ما هي أقرب مدينة فلسطينية لمدينة البحر الميت، والتي تعرف بطبيعتها الساحرة والشواطئ المالحة؟",
      "answers": ["أريحا", "الخليل", "بيت لحم", "نابلس"],
      "correct": 0
    },
    {
      "question": "ما هو المعلم الأثري الذي تم اكتشافه في منطقة \"أريحا\" ويُعتقد أنه أقدم حصن في العالم؟",
      "answers": ["تل السلطان", "برج أريحا", "قصر هشام", "عين السلطان"],
      "correct": 0
    },
    {
      "question": "ما هو نوع الطائر الفلسطيني الذي يعتبر من الطيور النادرة في المنطقة ويتميز بريشه الجميل؟",
      "answers": ["طائر الحسون", "طائر الدوري", "الحمامة", "طائر السنونو"],
      "correct": 0
    },
    {
      "question": "ما هي المدينة الفلسطينية التي كانت معروفة باسم \"إيلياء\" في العصور الإسلامية المبكرة؟",
      "answers": ["القدس", "نابلس", "بيت لحم", "غزة"],
      "correct": 0
    },
    {
      "question": "ما هو أكبر وادي في فلسطين الذي يتميز بتضاريسه الوعرة ويتدفق فيه العديد من الأنهار؟",
      "answers": ["وادي عربة", "وادي القلط", "وادي النار", "وادي المصرارة"],
      "correct": 0
    },
    {
      "question": "ما هي أقدم مدينة مأهولة في فلسطين والتي تعود جذورها إلى آلاف السنين؟",
      "answers": ["أريحا", "نابلس", "بيت لحم", "الخليل"],
      "correct": 0
    },
    {
      "question": "ما هو اسم الجسر الذي يربط بين الضفة الغربية والأردن عبر نهر الأردن؟",
      "answers": ["جسر الملك حسين", "جسر الأمير محمد", "جسر النبي موسى", "جسر السلام"],
      "correct": 0
    },
    {
      "question": "ما هي الصحراء الفلسطينية التي تتميز بكثبانها الرملية وتقع في الجزء الجنوبي من فلسطين؟",
      "answers": ["صحراء النقب", "صحراء عراد", "صحراء سيناء", "صحراء بئر السبع"],
      "correct": 0
    },
    {
      "question": "ما هي المدينة الفلسطينية التي تشتهر بوجود أكبر تجمع للكنائس في العالم؟",
      "answers": ["بيت لحم", "القدس", "نابلس", "رام الله"],
      "correct": 0
    },
    {
      "question": "ما هي مدينة فلسطين التي تعرف \"بمدينة المساجد\" بسبب عدد المساجد الكبير فيها؟",
      "answers": ["الخليل", "نابلس", "غزة", "جنين"],
      "correct": 0
    },
    {
      "question": "ما هي الولاية الشهيرة في فلسطين التي تحتوي على العديد من المواقع الأثرية ومن أبرزها موقع \"تل الجزر\"؟",
      "answers": ["غزة", "الخليل", "نابلس", "القدس"],
      "correct": 0
    },
    {
      "question": "أي مدينة فلسطينية تشتهر بصناعة الصابون اليدوي الذي يعد من أشهر الصناعات التقليدية؟",
      "answers": ["نابلس", "الخليل", "رام الله", "بيت لحم"],
      "correct": 0
    },
    {
      "question": "ما هو الاسم التاريخي للبحيرة التي تقع في المنطقة الشمالية من فلسطين وتعد من أعمق البحيرات في العالم؟",
      "answers": ["بحيرة طبريا", "بحيرة الحولة", "بحيرة رام", "بحيرة الملح"],
      "correct": 0
    },
    {
      "question": "ما هو اسم أشهر جبل في مدينة نابلس؟",
      "answers": ["جبل عيبال", "جبل جرزيم", "جبل الزيتون", "جبل المكبر"],
      "correct": 0
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
