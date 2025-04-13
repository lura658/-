let startButton;
let submitButton;
let quizStarted = false;
let correctCount = 0;
let wrongCount = 0;
let currentQuestionIndex = 0;
let selectedAnswer = null;

const questions = [
  {
    question: "下列哪一項是水的化學式？",
    options: ["H₂O", "CO₂", "O₂", "NaC"],
    correct: 0, // 正確答案索引
  },
  {
    question: "地球繞著哪一個天體運行？",
    options: ["月亮", "火星", "太陽", "木星"],
    correct: 2,
  },
  {
    question: "下列哪一個程式語言是用來開發網頁的？",
    options: ["Python", "JavaScript", "C++", "Swift"],
    correct: 1,
  },
{
    question: "冬天時，北半球的日照時間通常是？",
    options: ["比夏天長", "一樣長", "比夏天短", "全天都有日照"],
    correct: 2,
  },
  {
    question: "下列哪一個國家是位於南半球的？",
    options: ["中國", "美國", "巴西", "英國"],
    correct: 2,
  },
  {
    question: "下列哪一種動物是哺乳類？",
    options: ["青蛙", "蛇", "鯨魚", "烏龜"],
    correct: 2,
  },
  {
    question: "下列哪一種元素是金屬？",
    options: ["氫", "氧", "鈉", "氮"],
    correct: 2,
  },
  {
    question: "下列哪一種顏色是由紅色和藍色混合而成的？",
    options: ["紫色", "綠色", "黃色", "橙色"],
    correct: 0,
  },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(245, 245, 220); 

  // 建立「測驗開始」按鈕
  startButton = createButton('測驗開始');
  startButton.position(width / 2 - 50, height / 2 - 20); // 按鈕置中
  startButton.size(100, 40); // 按鈕大小
  startButton.style('font-size', '16px');
  startButton.style('background-color', '#FFB6C1'); // 粉紅色
  startButton.style('border', 'none');
  startButton.style('border-radius', '10px');
  startButton.mousePressed(startQuiz); // 按下按鈕時觸發
}

function draw() {
  if (quizStarted) {
    background(255, 223, 186); // 馬卡龍色背景
    fill(0);
    textSize(20);
    text(`答對題數: ${correctCount}`, 10, 30); // 左上角顯示答對題數
    text(`答錯題數: ${wrongCount}`, 10, 60); // 左上角顯示答錯題數

    // 顯示當前題目
    const currentQuestion = questions[currentQuestionIndex];
    textSize(24);
    text(currentQuestion.question, width / 2 - textWidth(currentQuestion.question) / 2, height / 2 - 100);

    // 顯示選項
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = currentQuestion.options[i];
      const x = width / 2 - 100;
      const y = height / 2 - 50 + i * 40;
      fill(selectedAnswer === i ? '#FFB6C1' : '#FFFFFF'); // 選中選項顯示粉紅色
      rect(x, y, 200, 30, 5);
      fill(0);
      text(option, x + 10, y + 20);
    }
  }
}

function mousePressed() {
  if (quizStarted) {
    const currentQuestion = questions[currentQuestionIndex];
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const x = width / 2 - 100;
      const y = height / 2 - 50 + i * 40;
      if (mouseX > x && mouseX < x + 200 && mouseY > y && mouseY < y + 30) {
        selectedAnswer = i; // 設定選中的答案
      }
    }
  }
}

function startQuiz() {
  quizStarted = true;
  startButton.hide(); // 隱藏按鈕

  // 建立「送出」按鈕
  submitButton = createButton('送出');
  submitButton.position(width / 2 - 50, height / 2 + 100);
  submitButton.size(100, 40);
  submitButton.style('font-size', '16px');
  submitButton.style('background-color', '#90EE90'); // 淺綠色
  submitButton.style('border', 'none');
  submitButton.style('border-radius', '10px');
  submitButton.mousePressed(submitAnswer);
}

function submitAnswer() {
  if (selectedAnswer === null) return; // 如果未選擇答案，則不執行

  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correct) {
    correctCount++; // 答對
  } else {
    wrongCount++; // 答錯
  }

  selectedAnswer = null; // 重置選擇
  currentQuestionIndex++; // 進入下一題

  if (currentQuestionIndex >= questions.length) {
    // 測驗結束
    submitButton.hide();
    textSize(32);
    fill(0);
    text("測驗結束！", width / 2 - textWidth("測驗結束！") / 2, height / 2);

    // 顯示「查看答案」按鈕
    viewAnswerButton = createButton('查看答案');
    viewAnswerButton.position(width / 2 - 50, height / 2 + 50);
    viewAnswerButton.size(100, 40);
    viewAnswerButton.style('font-size', '16px');
    viewAnswerButton.style('background-color', '#FFD700'); // 金黃色
    viewAnswerButton.style('border', 'none');
    viewAnswerButton.style('border-radius', '10px');
    viewAnswerButton.mousePressed(showNextQuestion);
  }
}

function showNextQuestion() {
  // 設定背景為米白色
  background(245, 245, 220); // 米白色背景

  // 隱藏「查看答案」按鈕
  viewAnswerButton.hide();

  // 建立滾動框
  const scrollDiv = createDiv();
  scrollDiv.style('width', '80%');
  scrollDiv.style('height', '70%');
  scrollDiv.style('overflow-y', 'scroll');
  scrollDiv.style('background-color', '#FFFFFF'); // 白色框背景
  scrollDiv.style('border', '1px solid #000'); // 黑色邊框
  scrollDiv.style('padding', '10px');
  scrollDiv.style('margin', 'auto');
  scrollDiv.style('position', 'absolute');
  scrollDiv.style('top', '15%');
  scrollDiv.style('left', '10%');

  // 顯示所有題目及正確答案
  let content = '';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    content += `<p><strong>${i + 1}. ${question.question}</strong></p>`;
    for (let j = 0; j < question.options.length; j++) {
      const option = question.options[j];
      if (j === question.correct) {
        content += `<p style="color: green;">- ${option} (正確答案)</p>`;
      } else {
        content += `<p>- ${option}</p>`;
      }
    }
    content += '<br>';
  }

  // 將內容加入滾動框
  scrollDiv.html(content);

  // 顯示「測驗結束！」文字
  textSize(32);
  fill(0);
  text("測驗結束！", width / 2 - textWidth("測驗結束！") / 2, height - 50);
}
