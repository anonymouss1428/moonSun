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
        choices: ["Yıldızlı bir gece 🏙️","Güneşli, açık alanlarda 🌞"],
        values: [-1, 1]
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
        choices: ["Bilim kurgu ve macera 🚀","Romantik filmler ❤️"],
        values: [-1, 1]
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
    const buttons = document.querySelectorAll("#choices button");

    // Seçilen butonu belirle
    const selectedButton = buttons[choiceIndex];

    // Seçime göre butonun rengini değiştir
    if (questions[currentQuestion].values[choiceIndex] > 0) {
        selectedButton.style.backgroundColor = "yellow"; // Güneş
        selectedButton.style.color = "black";
    } else {
        selectedButton.style.backgroundColor = "purple"; // Ay
        selectedButton.style.color = "white";
    }

    score += questions[currentQuestion].values[choiceIndex]; // Skoru güncelle

    currentQuestion++;

    // Yeni soruya geçmeden önce gecikme ekle
    setTimeout(() => {
        showQuestion();
    }, 1000); // 1 saniye gecikme
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

// Güneş ve Ay arasındaki mesafeyi kontrol et
function checkPosition() {
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    const sunRect = sun.getBoundingClientRect();
    const moonRect = moon.getBoundingClientRect();

    // Güneş ve ayın merkezlerinin mesafesi
    const dx = moonRect.left - sunRect.left;
    const dy = moonRect.top - sunRect.top;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Eğer mesafe 200px'den küçükse (yakınsa), "close" sınıfını ekle
    if (distance < 100) {
        document.body.classList.add('sun-close', 'moon-close');
    } else {
        document.body.classList.remove('sun-close', 'moon-close');
    }
}

function createStars() {
    const numStars = 500; // Kaç yıldız olacağını belirle
    const container = document.body;

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        // Rastgele konum belirle
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        // Farklı boyutlarda yıldızlar
        let size = Math.random() * 3 + 2; // 2px - 5px arası

        // Farklı hızlarda yanıp sönmeleri için animasyon süresi değişken
        let duration = Math.random() * 2 + 1; // 1 - 3 saniye arası

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;

        container.appendChild(star);
    }
}

createStars(); // Yıldızları oluştur

// Bu fonksiyonu her 100ms'de bir çalıştır
setInterval(checkPosition, 100);