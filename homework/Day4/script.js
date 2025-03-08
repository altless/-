///////////////////////////////////////// 선택지 항목 리스트 (이중 랜덤하게 표시) /////////////////////////////////////////
const allCapitals = [
    "서울", "도쿄", "파리", "워싱턴 D.C.", "런던", "베를린", "로마", "베이징", "모스크바",
    "뉴델리", "브라질리아", "캔버라", "오타와", "카이로", "부에노스아이레스", "상파울루",
    "리우데자네이루", "마드리드", "암스테르담", "바르셀로나", "방콕", "홍콩", "상하이", "시드니"
];

///////////////////////////////////////// 문제와 그 정답 /////////////////////////////////////////
const questions = [
    { question: "대한민국의 수도는?", answer: "서울" },
    { question: "일본의 수도는?", answer: "도쿄" },
    { question: "프랑스의 수도는?", answer: "파리" },
    { question: "미국의 수도는?", answer: "워싱턴 D.C." },
    { question: "영국의 수도는?", answer: "런던" },
    { question: "독일의 수도는?", answer: "베를린" },
    { question: "이탈리아의 수도는?", answer: "로마" },
    { question: "중국의 수도는?", answer: "베이징" },
    { question: "러시아의 수도는?", answer: "모스크바" },
    { question: "인도의 수도는?", answer: "뉴델리" },
    { question: "브라질의 수도는?", answer: "브라질리아" },
    { question: "호주의 수도는?", answer: "캔버라" },
    { question: "캐나다의 수도는?", answer: "오타와" },
    { question: "이집트의 수도는?", answer: "카이로" },
    { question: "아르헨티나의 수도는?", answer: "부에노스아이레스" },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let remainingLives = 3;
let timer;
let selectedQuestions = [];
let isGameOver = false;


///////////////////////////////////////// 문제 정답과 랜덤한 선택지를 묶어서 배열로 리턴 /////////////////////////////////////////
function getRandomChoices(correctAnswer) {
    let choices = new Set();
    choices.add(correctAnswer);
    
    while (choices.size < 4) {
        const randomChoice = allCapitals[Math.floor(Math.random() * allCapitals.length)];
        choices.add(randomChoice);
    }

    return [...choices];
}

///////////////////////////////////////// 랜덤한 문제 준비, 문제 중복방지, 게임종료시 문제 로드 막기 /////////////////////////////////////////
function loadQuestion() {
    if (isGameOver) return;

    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomQuestionIndex];

    if (!selectedQuestions.includes(randomQuestionIndex)) {
        selectedQuestions.push(randomQuestionIndex);
    } else {
        loadQuestion();
        return;
    }

    const questionContainer = document.getElementById('question');
    const choicesContainer = document.getElementById('choices');
    // const timerContainer = document.getElementById('timer');
    const resultContainer = document.getElementById('result');
    const livesContainer = document.getElementById('lives');
    
    questionContainer.innerText = question.question;
    choicesContainer.innerHTML = '';

///////////////////////////////////////// 문제묶음 들을 선언, 정답인 선택지를 무작위 위치에 배치, 그렇지 않으면 첫번째 항목으로만 표시 /////////////////////////////////////////
    const choices = getRandomChoices(question.answer);

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
    shuffleArray(choices);

///////////////////////////////////////// 선택지 버튼화 /////////////////////////////////////////
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.onclick = () => checkAnswer(choice, question.answer);
        choicesContainer.appendChild(button);
    });
///////////////////////////////////////// 결과항목, 남은목숨, 남은시간 /////////////////////////////////////////
    resultContainer.innerText = '';
    livesContainer.innerText = `남은 목숨: ${remainingLives}`;   
    startTimer();
}

window.onload = loadQuestion;


///////////////////////////////////////// 남은시간 함수 /////////////////////////////////////////
function startTimer() {
    let timeLeft = 10;
    const timerContainer = document.getElementById('timer');
    
    if (isGameOver) return;

    timer = setInterval(() => {
        timeLeft--;
        timerContainer.innerText = `${timeLeft}초`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null, questions[currentQuestionIndex].answer);
        }
    }, 1000);
}


///////////////////////////////////////// 유저선택지와 정답 비교 /////////////////////////////////////////
function checkAnswer(selectedAnswer, correctAnswer) {
    clearInterval(timer);
    const resultContainer = document.getElementById('result');
    
    if (selectedAnswer === correctAnswer) {
        correctAnswers++;
        resultContainer.innerText = "정답!";
        resultContainer.className = 'result correct';
    } else {
        remainingLives--;
        resultContainer.innerText = "틀렸습니다.";
        resultContainer.className = 'result incorrect';
    }
    
///////////////////////////////////////// 목숨 0일시 종료  /////////////////////////////////////////
    if (remainingLives <= 0) {
        resultContainer.innerText += "\n게임 오버!";
        gameOver(); 
        return;
    }

    ///////////////////////////////////////// 5문제 진행후 결과 표시, 그후 종료 /////////////////////////////////////////
    setTimeout(() => {
        if (selectedQuestions.length < 5) {
            loadQuestion();
        } else {
            resultContainer.innerText = ""
            resultContainer.innerText += `"축하합니다! ${correctAnswers}개 맞추셨습니다." `;
            setTimeout(() => {
                resultContainer.innerText = ""
                resultContainer.innerText += "\n게임 종료!";
            }, 1000);
            gameOver(); 
        }
    }, 1000);
}

    ///////////////////////////////////////// 게임 진행 후 상태 설정 /////////////////////////////////////////
function gameOver() {
    isGameOver = true;
    document.getElementById("restart-button").style.display = "block";
    document.getElementById("timer").innerText = "게임 종료";
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(button => button.disabled = true);
}


    ///////////////////////////////////////// 초기화 버튼 /////////////////////////////////////////
function restartGame() {
    correctAnswers = 0;
    remainingLives = 3;
    selectedQuestions = [];
    isGameOver = false;
    document.getElementById("restart-button").style.display = "none";
    loadQuestion();
}

