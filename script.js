const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const statusMessage = document.getElementById('status-message');
const progressElement = document.getElementById('progress');

let currentQuestionIndex = 0;

const questions = [
    { question: '대한민국의 수도는?', answer: '서울' },
    { question: '사과를 영어로 하면?', answer: 'apple' },
    { question: '조선시대 세종대왕이 만든 우리나라 글자는?', answer: '훈민정음' }
];

// 초기 실행
showQuestion();

// 확인 버튼 클릭 시
submitBtn.addEventListener('click', checkAnswer);

// 엔터 키 입력 시에도 정답 확인
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerInput.value = ''; // 입력창 비우기
    answerInput.focus();    // 바로 타이핑 가능하게 포커스
    statusMessage.innerText = '';
    progressElement.innerText = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase(); // 공백 제거 및 소문자화
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            statusMessage.style.color = "#2ecc71";
            statusMessage.innerText = "정답입니다! 다음 문제로 넘어갑니다.";
            
            // 1초 뒤에 다음 문제 표시
            setTimeout(showQuestion, 1000);
        } else {
            // 종료 처리
            questionElement.innerText = "🎉 모든 문제를 맞혔습니다!";
            document.querySelector('.input-area').style.display = 'none';
            statusMessage.innerText = "수고하셨습니다.";
            progressElement.innerText = "종료";
        }
    } else {
        statusMessage.style.color = "#e74c3c";
        statusMessage.innerText = "틀렸습니다. 다시 입력해보세요!";
        answerInput.value = '';
        answerInput.focus();
    }
}