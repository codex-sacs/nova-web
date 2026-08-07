const c = document.getElementById('matrix');
const x = c.getContext('2d');

function resize(){
    c.width = innerWidth;
    c.height = innerHeight;
}

resize();
window.onresize = resize;

const cols = Math.floor(innerWidth / 20);
const drops = Array(cols).fill(1);

setInterval(() => {

    x.fillStyle = 'rgba(0,0,0,.08)';
    x.fillRect(0,0,c.width,c.height);

    x.fillStyle = '#00ff88';
    x.font = '15px monospace';

    drops.forEach((d,i) => {

        x.fillText(
            String.fromCharCode(
                0x30A0 + Math.random() * 96
            ),
            i * 20,
            d * 20
        );

        if(d * 20 > c.height &&
           Math.random() > .975){
            drops[i] = 0;
        }

        drops[i]++;
    });

},50);

const lines = [
"[NOVA CORE] Initializing...",
"[NOVA CORE] Loading Neural Engine...",
"[NOVA CORE] Security Checks Passed...",
"[NOVA CORE] Connected to codex-nova.ai.studio",
"[NOVA CORE] Synchronizing Intelligence...",
"[NOVA CORE] Nova AI Ready."
];

async function typeLine(el,text){

    for(const ch of text){

        el.innerHTML += ch;

        await new Promise(resolve =>
            setTimeout(resolve,25)
        );
    }

    el.innerHTML += "\n";
}

async function startNova(){

    document
    .getElementById("startup")
    .play()
    .catch(() => {});

    start.style.display = "none";
    boot.style.display = "flex";

    for(let i=0;i<lines.length;i++){

        await typeLine(
            terminal,
            lines[i]
        );

        const v = Math.floor(
            ((i+1)/lines.length)*100
        );

        bar.style.width = v + "%";
        pct.textContent = v + "%";
    }

    document.body.animate(
    [
        {filter:"brightness(1)"},
        {filter:"brightness(2.5)"},
        {filter:"brightness(1)"}
    ],
    {
        duration:400
    });

    setTimeout(() => {

        boot.style.display = "none";
        about.style.display = "flex";

    },800);
}
document.getElementById("latency").textContent =
(Math.random() * 0.8 + 0.2).toFixed(2) + "s";

document.getElementById("nodes").textContent =
Math.floor(Math.random() * 400 + 700);

function updateClock(){
    const now = new Date();

    document.getElementById("clock").textContent =
    now.toLocaleTimeString();
}

updateClock();
setInterval(updateClock,1000);

const quotes = [
    "[NOVA] Intelligence Core Online.",
    "[NOVA] Knowledge Base Synchronized.",
    "[NOVA] Awaiting User Input.",
    "[NOVA] Neural Systems Stable.",
    "[NOVA] Response Engine Ready."
];

let currentQuote = 0;

setInterval(() => {

    currentQuote =
    (currentQuote + 1) % quotes.length;

    document.getElementById("quote-box")
    .textContent = quotes[currentQuote];

}, 5000);
