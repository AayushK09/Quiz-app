  let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 10;
const timeLimit = 300;
let timeRemaining = timeLimit;
let timerInterval;

const questions = [
    {
        question: "How would you rate your overall experience with this course?",
        options: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"]
    },
    {
        question: "How satisfied were you with the course content?",
        options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
    },
    {
        question: "How would you rate the instructor's ability to explain the concepts clearly?",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    },
    {
        question: "How likely are you to recommend this course to others?",
        options: ["1 - Not Likely", "2 - Somewhat Likely", "3 - Likely", "4 - Very Likely", "5 - Definitely"]
    },
    {
        question: "How confident do you feel about applying the knowledge learned in this course?",
        options: ["Not Confident", "Somewhat Confident", "Neutral", "Confident", "Very Confident"]
    },
    {
        question: "Did the course meet your learning expectations?",
        options: ["Yes", "No"]
    },
    {
        question: "How engaged did you feel throughout the course?",
        options: ["Not Engaged", "Somewhat Engaged", "Neutral", "Engaged", "Very Engaged"]
    },
    {
        question: "Did you encounter any technical issues during the course?",
        options: ["Yes", "No"]
    },
    {
        question: "How would you rate the accessibility of the course materials?",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    },
    {
        question: "Please rate the UI of the Quize Page?",
        options: ["Poor", "Fair", "Good", "Very Good", "Excellent"]
    },
];

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('submit-btn').addEventListener('click', submitQuiz);
document.getElementById('play-again-btn').addEventListener('click', restartQuiz);

function startQuiz() {
    const email = document.getElementById('email').value;
    if (email) {
        document.getElementById('instruction-card').style.display = 'none';
        document.getElementById('quiz-card').style.display = 'block';
        startTimer();
        showQuestion();
    } else {
        alert('Please enter a valid email to start the quiz.');
    }
}

function startTimer() {
    timeRemaining = timeLimit;
    const timerDisplay = document.getElementById('time');
    const progressBar = document.querySelector('.progress-bar');
    
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds; 
        timerDisplay.textContent = `${minutes}:${seconds}`;
        const progressPercent = ((timeLimit - timeRemaining) / timeLimit) * 100;
        progressBar.style.width = progressPercent + '%';

        if (timeRemaining > 120) {
            progressBar.style.backgroundColor = '#4CAF50'; 
        } else if (timeRemaining > 60) {
            progressBar.style.backgroundColor = '#FFC107'; 
        } else {
            progressBar.style.backgroundColor = '#F44336'; 
        }
        timeRemaining--;
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            submitQuiz(); 
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-number').textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
    const optionsDiv = document.querySelector('.options');
    optionsDiv.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.dataset.value = index < 5 ? index + 1 : null; 
        btn.addEventListener('click', () => {
            resetOptionSelection();
            btn.classList.add('selected');
        });
        optionsDiv.appendChild(btn);
    });
    resetOptionSelection();
}

function nextQuestion() {
    const selectedOption = getSelectedOption();
    if (selectedOption) {
        score += parseInt(selectedOption);
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            showQuestion();
        } else {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function getSelectedOption() {
    const optionBtns = document.querySelectorAll('.option-btn');
    for (const btn of optionBtns) {
        if (btn.classList.contains('selected')) {
            return btn.dataset.value;
        }
    }
    return null;
}

function resetOptionSelection() {
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => btn.classList.remove('selected'));
}

function submitQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz-card').style.display = 'none';
    document.getElementById('result-card').style.display = 'block';
    document.getElementById('score').textContent = score;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = timeLimit;
    clearInterval(timerInterval); 
    document.getElementById('result-card').style.display = 'none';
    document.getElementById('instruction-card').style.display = 'block';
    resetOptionSelection(); 
}





