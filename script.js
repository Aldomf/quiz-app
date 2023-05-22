const questions = [
    {
        question: "Quel est le plus gros animal du monde ?",
        answers: [
            {text: "Requin", correct: false},
            {text: "Baleine bleue", correct: true},
            {text: "Éléphant", correct: false},
            {text: "Girafe", correct: false},
        ]
    },
    {
        question: "Quel est le plus petit pays du monde ?",
        answers: [
            {text: "Cité du Vatican", correct: true},
            {text: "Bhoutan", correct: false},
            {text: "Népal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },
    {
        question: "Quel est le plus grand désert du monde ?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctique", correct: true},
        ]
    },
    {
        question: "Quel est le plus petit continent du monde ?",
        answers: [
            {text: "Asie", correct: false},
            {text: "Australie", correct: true},
            {text: "Arctique", correct: false},
            {text: "Afrique", correct: false},
        ]
    },
    {
        question: "Lequel de ses noms ne represente pas la musique classique?",
        answers: [
            {text: "Beethoven", correct: false},
            {text: "Passi", correct: true},
            {text: "Schubert", correct: false},
            {text: "Vivaldi", correct: false},
        ]
    },
    {
        question: "Où se situe la Statue de la Liberté ?",
        answers: [
            {text: "Los Angeles", correct: false},
            {text: "Las Vegas", correct: false},
            {text: "New York", correct: true},
            {text: "Paris", correct: false},
        ]
    },
    {
        question: "Quelle est la capitale du Royaume-Uni ?",
        answers: [
            {text: "Londres", correct: true},
            {text: "Dublin", correct: false},
            {text: "Berlin", correct: false},
            {text: "Royaume-Uni", correct: false},
        ]
    },
    {
        question: "Quel est le plus grand pays du monde ?",
        answers: [
            {text: "Chine", correct: false},
            {text: "Russie", correct: true},
            {text: "Canada", correct: false},
            {text: "États Unis", correct: false},
        ]
    },
    {
        question: "Quelle est la capitale du Luxembourg ?",
        answers: [
            {text: "Luxembourg", correct: true},
            {text: "Geneve", correct: false},
            {text: "Berlin", correct: false},
            {text: "Aucune capitale", correct: false},
        ]
    },
    {
        question: "Quelle fête chrétienne, a lieu en même temps qu'Halloween?",
        answers: [
            {text: "Toussaint", correct: true},
            {text: "Ascension", correct: false},
            {text: "Pâques", correct: false},
            {text: "Noel", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivante";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Vous avez obtenu ${score} sur ${questions.length}!`;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Rejouer";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
