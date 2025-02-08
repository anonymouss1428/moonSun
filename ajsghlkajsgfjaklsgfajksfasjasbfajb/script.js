let currentQuestion = 0;
let score = 0; // Güneş için pozitif, Ay için negatif puan

const questions = [
    {
        question: "1. Birlikte bir günü paylaşsak hangisi daha özel olurdu?",
        choices: ["Sessiz bir sahilde yürümek 🌊", "Göz kamaştıran bir gün doğumunu izlemek 🌄"],
        values: [-1, 1]
    },
    {
        question: "2. Seni en çok ne heyecanlandırır?",
        choices: ["Yeni yerler keşfetmek, maceraya atılmak 🚀", "Tanıdık bir sessizlikte huzur bulmak 🕊️"],
        values: [1, -1]
    },
    {
        question: "3. Birlikte geçireceğimiz ideal akşam nasıl olurdu?",
        choices: ["Sakin bir kafede derin bir sohbet ☕", "Renkli ışıklar altında dans etmek 🎉"],
        values: [-1, 1]
    },
    {
        question: "4. Aşkta sana ne daha önemli gelir?",
        choices: ["Tutkulu, yoğun duygularla dolu anlar yaşamak ❤️‍🔥", "Derin, anlamlı bir bağ kurmak 🔗"],
        values: [1, -1]
    },
    {
        question: "5. Bir hediyeyle seni etkilemek istesem neyi seçerdim?",
        choices: ["El yazısıyla yazılmış küçük bir not vermek ✉️", "Parlak, sürpriz dolu bir hediye paketi açtırmak 🎁"],
        values: [-1, 1]
    },
    {
        question: "6. Hangisi sana daha yakın?",
        choices: ["Duygularımı coşkuyla göstermek 🎨", "Sessizliğin içindeki duygularımı hissettirmek 🌫️"],
        values: [1, -1]
    },
    {
        question: "7. Birlikte bir film seçsek hangisini izleriz?",
        choices: ["Duygusal bir aşk hikayesiyle gözyaşı döktüren bir film 😢", "Bol kahkahalı bir romantik komedi 😂"],
        values: [-1, 1]
    },
    {
        question: "8. Bir anıya dönüp bakarken neye odaklanırsın?",
        choices: ["O anki heyecana ve neşeye 🎈", "O an hissettiğim duyguların derinliğine 📝"],
        values: [1, -1]
    },
    {
        question: "9. Aşkı hangi cümle tanımlar?",
        choices: ["“Seninle sessizlik bile anlam kazanır.” 🤍", "“Seninle hayat daha renkli ve canlı.” 🌺"],
        values: [-1, 1]
    },
    {
        question: "10. Hangi ortam sana daha iyi hissettirir?",
        choices: ["Doğada özgürce koşmak 🏞️", "Pencere kenarında huzurla kitap okumak 📖"],
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
            button.onclick = () => answer(index, button);
            choicesDiv.appendChild(button);
        });
    } else {
        showResult();
    }
}

function answer(choiceIndex, selectedButton) {
    const buttons = document.querySelectorAll("#choices button");

    // Seçilen butona göre rengini değiştir
    if (questions[currentQuestion].values[choiceIndex] > 0) {
        selectedButton.style.backgroundColor = "yellow"; // Güneş
        selectedButton.style.color = "black";
    } else {
        selectedButton.style.backgroundColor = "purple"; // Ay
        selectedButton.style.color = "white";
    }

    score += questions[currentQuestion].values[choiceIndex]; // Skoru güncelle

    // Eğer son sorudaysa, şarkıyı çal
    if (currentQuestion === questions.length - 1) {
        let sunAudio = document.getElementById("audio-sun");
        let moonAudio = document.getElementById("audio-moon");
        let balanceAudio = document.getElementById("audio-balance");

        if (score > 0) {
            sunAudio.play();  // Güneş şarkısını çal
        } else if (score < 0) {
            moonAudio.play();  // Ay şarkısını çal
        } else {
            balanceAudio.play(); // Güneş ve Ay şarkısını çal
        }
    }

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
    let sunAudio = document.getElementById("audio-sun");
    let moonAudio = document.getElementById("audio-moon");
    let balanceAudio = document.getElementById("audio-balance");

    // Sonuç metnini ayarla ve şarkıyı çal
   if (score > 0) {
       resultText = "Sen bir Güneş gibisin! ☀️ Enerjik, sıcak ve neşelisin!";
       sunAudio.play();  // Güneş şarkısını çal
   } else if (score < 0) {
       resultText = "Sen bir Ay gibisin! 🌙 Gizemli, huzurlu ve derin düşüncelisin!";
       moonAudio.play();  // Ay şarkısını çal
   } else {
       resultText = "Sen hem Güneş, hem de Aysın! ☀️🌙 Dengeli ve uyumlusun!";
       balanceAudio.play(); // Güneş ve Ay şarkısını çal
   }

   // Sonuç yazısını ekrana yazdır
   document.getElementById("final-result").innerText = resultText;

   // Sonuç yazısını 3 saniye sonra kaybetmek
   setTimeout(function() {
       // Yeni yazıyı ekrana yazdır
       if (score > 0) {
           document.getElementById("final-result").innerText = "Gülüşünün sıcaklığı içimi ısıtıyor, dilerim ki her günüm seninle doğsun, Sevgililer günümüz kutlu olsun canım sevgilim.";
       } else if (score < 0) {
           document.getElementById("final-result").innerText = "Teninin ışığı gözlerimi kamaştırıyor, dilerim ki her gecem seninle son bulsun, Sevgililer günümüz kutlu olsun canım sevgilim.";
       } else {
           document.getElementById("final-result").innerText = "Seninle her an gülüşün kadar sıcak ve tenin kadar parlak, dilerim ki her anımız birlikte olsun, Sevgililer günümüz kutlu olsun canım sevgilim.";
       }
   }, 8000);

   // Sonuç ekranını görünür hale getir
   document.getElementById("result-screen").classList.remove("hidden");

}

function restartGame() {
    // Oyun ekranlarını sıfırlama
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";

    // Şarkıları durdurma
    let sunAudio = document.getElementById("audio-sun");
    let moonAudio = document.getElementById("audio-moon");
    let balanceAudio = document.getElementById("audio-balance");

    sunAudio.pause();
    moonAudio.pause();
    balanceAudio.pause();

    // Şarkıların başlangıç noktasına geri sıfırlanması
    sunAudio.currentTime = 0;
    moonAudio.currentTime = 0;
    balanceAudio.currentTime = 0;

    // Soruları sıfırlama
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
