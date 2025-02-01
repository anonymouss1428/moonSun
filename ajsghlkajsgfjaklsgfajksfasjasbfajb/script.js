let currentQuestion = 0;
let score = 0; // Güneş için pozitif, Ay için negatif puan

const questions = [
    {
        question: "Sabah insanı mısın, gece kuşu mu?",
        choices: ["Sabah insanıyım ☀️", "Gece kuşuyum 🌙"],
        values: [1, -1]
    },
    {
        question: "Romantik misin, maceracı mı?",
        choices: ["Romantiğim ❤️", "Maceracıyım 🏞️"],
        values: [1, -1]
    },
    {
        question: "Hangi ortamda daha mutlusun?",
        choices: ["Güneşli, açık alanlarda 🌞", "Yıldızlı bir gece 🏙️"],
        values: [1, -1]
    },
    {
        question: "Kendi başına zaman geçirmek mi, arkadaşlarınla olmak mı?",
        choices: ["Tek başıma vakit geçirmeyi severim 🌙", "Arkadaşlarımla olmayı tercih ederim ☀️"],
        values: [-1, 1]
    },
    {
        question: "Bir tatil seç! 🏝️",
        choices: ["Tropik bir sahilde dinlenmek 🏖️", "Dağlarda kamp yapmak ⛺"],
        values: [1, -1]
    },
    {
        question: "Bir film türü seç!",
        choices: ["Romantik filmler ❤️", "Bilim kurgu ve macera 🚀"],
        values: [1, -1]
    },
    {
        question: "Hangi güç seni daha çok çeker?",
        choices: ["Işığı ve sıcaklığı kontrol etmek ☀️", "Geceyi ve gölgeleri şekillendirmek 🌑"],
        values: [1, -1]
    },
    {
        question: "Hangisini tercih edersin?",
        choices: ["Enerjik, hareketli etkinlikler 🏃", "Huzurlu ve sakin anlar ☕"],
        values: [1, -1]
    }
];

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "block";
    score = 0; // Skoru sıfırla
    showQuestion();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        const questionObj = questions[currentQuestion];
        document.getElementById("question").textContent = questionObj.question;
        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = "";
        questionObj.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.onclick = () => answer(index);
            choicesDiv.appendChild(button);
        });
    } else {
        showResult();
    }
}

function answer(choiceIndex) {
    score += questions[currentQuestion].values[choiceIndex]; // Seçime göre skoru güncelle
    currentQuestion++;
    showQuestion();
}

function showResult() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    let resultText = "";
    if (score > 0) {
        resultText = "Sen bir Güneş gibisin! ☀️ Enerjik, sıcak ve neşelisin!";
    } else if (score < 0) {
        resultText = "Sen bir Ay gibisin! 🌙 Gizemli, huzurlu ve derin düşüncelisin!";
    } else {
        resultText = "Sen hem Güneş, hem de Aysın! ☀️🌙 Dengeli ve uyumlusun!";
    }

    document.getElementById("final-result").textContent = resultText;
}

function restartGame() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    currentQuestion = 0;
}
