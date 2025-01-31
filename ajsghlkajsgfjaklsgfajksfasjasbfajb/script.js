let sunPoints = 0;
let moonPoints = 0;
let currentQuestion = 0;

const questions = [
    { text: "Sabah insanı mısın, gece kuşu mu?", sun: "Sabah insanıyım ☀️", moon: "Gece kuşuyum 🌙" },
    { text: "Hangi hava durumunu seversin?", sun: "Güneşli ve sıcak ☀️", moon: "Serin ve yıldızlı 🌌" },
    { text: "Enerjini nasıl alırsın?", sun: "Gün ışığından! 😎", moon: "Sessiz ve huzurlu gecelerden. 😌" },
];

function answer(choice) {
    if (choice === 1) sunPoints++;
    else moonPoints++;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion].text;
        document.getElementById("choices").innerHTML = `
            <button onclick="answer(1)">${questions[currentQuestion].sun}</button>
            <button onclick="answer(2)">${questions[currentQuestion].moon}</button>
        `;
    } else {
        showResult();
    }
}

function showResult() {
    let resultText = sunPoints > moonPoints
        ? "Sen tam bir Güneşsin! ☀️ Enerjinle her yeri aydınlatıyorsun!"
        : "Sen Ay’ın büyüleyici ışığısın! 🌙 Sakin, huzurlu ve büyüleyicisin!";

    document.getElementById("question").style.display = "none";
    document.getElementById("choices").style.display = "none";
    document.getElementById("result").innerText = resultText;
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("restart").classList.remove("hidden");
}

function restartGame() {
    sunPoints = 0;
    moonPoints = 0;
    currentQuestion = 0;

    document.getElementById("question").style.display = "block";
    document.getElementById("choices").style.display = "block";
    document.getElementById("question").innerText = questions[0].text;
    document.getElementById("choices").innerHTML = `
        <button onclick="answer(1)">${questions[0].sun}</button>
        <button onclick="answer(2)">${questions[0].moon}</button>
    `;

    document.getElementById("result").classList.add("hidden");
    document.getElementById("restart").classList.add("hidden");
}
