// ======================
// MATRIX BACKGROUND
// ======================

const c = document.getElementById("matrix");
const x = c.getContext("2d");

function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

resize();
window.onresize = resize;

const cols = Math.floor(window.innerWidth / 20);
const drops = Array(cols).fill(1);

setInterval(() => {

    x.fillStyle = "rgba(0,0,0,0.08)";
    x.fillRect(0, 0, c.width, c.height);

    x.fillStyle = "#00ff88";
    x.font = "15px monospace";

    drops.forEach((d, i) => {

        const char = String.fromCharCode(
            0x30A0 + Math.random() * 96
        );

        x.fillText(
            char,
            i * 20,
            d * 20
        );

        if (
            d * 20 > c.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        drops[i]++;
    });

}, 50);

// ======================
// BOOT LOGS
// ======================

const lines = [
    "[NOVA CORE] Initializing...",
    "[NOVA CORE] Loading Neural Engine...",
    "[NOVA CORE] Security Checks Passed...",
    "[NOVA CORE] Connected to codex-nova.ai.studio",
    "[NOVA CORE] Synchronizing Intelligence...",
    "[NOVA CORE] Nova AI Ready."
];

async function typeLine(el, text) {

    for (const ch of text) {

        el.innerHTML += ch;

        await new Promise(resolve =>
            setTimeout(resolve, 25)
        );
    }

    el.innerHTML += "\n";
}

// ======================
// VOICE WELCOME
// ======================

function speakWelcome() {

    if (!("speechSynthesis" in window)) return;

    const message = new SpeechSynthesisUtterance(
        "Welcome to Nova AI. All systems operational. Awaiting your command."
    );

    message.rate = 0.85;
    message.pitch = 0.9;
    message.volume = 1;

    const voices = speechSynthesis.getVoices();

    const preferred =
        voices.find(v => v.name.includes("Google")) ||
        voices.find(v => v.name.includes("Microsoft")) ||
        voices[0];

    if (preferred) {
        message.voice = preferred;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(message);
}

// ======================
// START NOVA
// ======================

async function startNova() {

    document
        .getElementById("startup")
        .play()
        .catch(() => {});

    start.style.display = "none";
    boot.style.display = "flex";

    for (let i = 0; i < lines.length; i++) {

        await typeLine(
            terminal,
            lines[i]
        );

        const v = Math.floor(
            ((i + 1) / lines.length) * 100
        );

        bar.style.width = v + "%";
        pct.textContent = v + "%";
    }

    document.body.animate(
        [
            { filter: "brightness(1)" },
            { filter: "brightness(2.5)" },
            { filter: "brightness(1)" }
        ],
        {
            duration: 400
        }
    );

    setTimeout(() => {

        boot.style.display = "none";
        about.style.display = "flex";

        speakWelcome();

    }, 800);
}

// ======================
// TURNSTILE CALLBACK
// ======================

function turnstileSuccess(token) {

    console.log("Turnstile Success:", token);

    const btn =
        document.getElementById("enterBtn");

    if (btn) {
        btn.disabled = false;
        btn.textContent = "ENTER NOVA AI";
    }

    const ready =
        document.getElementById("ready-status");

    if (ready) {
        ready.innerHTML =
            "✅ VERIFIED - ACCESS GRANTED";
    }
}

// ======================
// LIVE STATS
// ======================

const latency =
    document.getElementById("latency");

if (latency) {

    latency.textContent =
        (Math.random() * 0.8 + 0.2)
        .toFixed(2) + "s";
}

const nodes =
    document.getElementById("nodes");

if (nodes) {

    nodes.textContent =
        Math.floor(
            Math.random() * 400 + 700
        );
}

// ======================
// LIVE CLOCK
// ======================

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock, 1000);

// ======================
// ROTATING QUOTES
// ======================

const quotes = [
    "[NOVA] Intelligence Core Online.",
    "[NOVA] Knowledge Base Synchronized.",
    "[NOVA] Awaiting User Input.",
    "[NOVA] Neural Systems Stable.",
    "[NOVA] Response Engine Ready.",
    "[NOVA] Security Layer Active.",
    "[NOVA] Monitoring Global Network.",
    "[NOVA] Processing Neural Tasks."
];

let currentQuote = 0;

setInterval(() => {

    const quoteBox =
        document.getElementById("quote-box");

    if (!quoteBox) return;

    currentQuote =
        (currentQuote + 1) %
        quotes.length;

    quoteBox.textContent =
        quotes[currentQuote];

}, 5000);
