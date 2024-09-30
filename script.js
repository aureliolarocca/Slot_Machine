const playBtn = document.querySelector(".play");
let soldi = 1000;
const riscuotiBtn = document.querySelector(".riscuoti");
const rullo1 = document.getElementById("rullo1");
const rullo2 = document.getElementById("rullo2");
const rullo3 = document.getElementById("rullo3");
let soldiText = document.querySelector("h3");
const rulloSinistra = [
  "gnomoSinistra.png",
  "pecoraSinistra.png",
  "lupoSinistra.png",
];

const rulloCentro = ["gnomoCentro.png", "pecoraCentro.png", "lupoCentro.png"];
const rulloDestra = ["gnomoDestra.png", "pecoraDestra.png", "lupoDestra.png"];
const combinazioneVincenteGnomo = [
  "gnomoSinistra.png",
  "gnomoCentro.png",
  "gnomoDestra.png",
];
const combinazioneVincentePecora = [
  "pecoraSinistra.png",
  "pecoraCentro.png",
  "pecoraDestra.png",
];
const combinazionePerdente = [
  "lupoSinistra.png",
  "lupoCentro.png",
  "lupoDestra.png",
];
let combinazioneAttuale = [];
let pointPecora = 0;
let pointGnomo = 0;
let currentIndexPecora = 0;
let currentIndexGnomo = 0;
let gnomoText = document.getElementById("gnomoText");
let pecoraText = document.getElementById("pecoraText");

soldiText.innerHTML = soldi;
function randomIndex() {
  return Math.floor(Math.random() * 3);
}

function playButton() {
  if (soldi >= 10) {
    playBtn.removeEventListener("click", playButton);
    rullo1.style.animation = "giroRullo 1s ease forwards";
    rullo2.style.animation = "giroRullo 1s ease forwards";
    rullo3.style.animation = "giroRullo 1s ease forwards";
    let random1 = randomIndex();
    let random2 = randomIndex();
    let random3 = randomIndex();
    soldi -= 10;
    soldiText.innerHTML = soldi;
    setTimeout(() => {
      rullo1.style.animation = "none";
      rullo2.style.animation = "none";
      rullo3.style.animation = "none";
    }, 1000);
    setTimeout(() => {
      rullo1.style.backgroundImage = `url(${rulloSinistra[random1]})`;
      rullo2.style.backgroundImage = `url(${rulloCentro[random2]})`;
      rullo3.style.backgroundImage = `url(${rulloDestra[random3]})`;
      rullo1.style.animation = "giroRulloEntrata 1s ease";
      rullo2.style.animation = "giroRulloEntrata 1s ease";
      rullo3.style.animation = "giroRulloEntrata 1s ease";
    }, 1000);
    combinazioneAttuale.push(`${rulloSinistra[random1]}`);
    combinazioneAttuale.push(`${rulloCentro[random2]}`);
    combinazioneAttuale.push(`${rulloDestra[random3]}`);
    setTimeout(() => {
      playBtn.addEventListener("click", playButton);
    }, 2400);

    checkWinner();
    console.log(combinazioneAttuale);
  } else {
    alert("Hai Finito i soldi");
  }
}

playBtn.addEventListener("click", playButton);

function checkWinner() {
  console.log(combinazioneAttuale);
  if (
    combinazioneAttuale[0] === combinazioneVincenteGnomo[0] &&
    combinazioneAttuale[1] === combinazioneVincenteGnomo[1] &&
    combinazioneAttuale[2] === combinazioneVincenteGnomo[2]
  ) {
    console.log("GNOMO WIN");
    let ipoteticPoint = 10;
    pointGnomo += ipoteticPoint;
    pointGnomo *= 2;
    currentIndexGnomo++;
    gnomoText.innerHTML = `GNOMO : Beccato ${currentIndexGnomo} Volta, Soldi ${pointGnomo} `;
  } else if (
    combinazioneAttuale[0] === combinazioneVincentePecora[0] &&
    combinazioneAttuale[1] === combinazioneVincentePecora[1] &&
    combinazioneAttuale[2] === combinazioneVincentePecora[2]
  ) {
    console.log("Pecora Win");
    let ipoteticPoint = 10;
    pointGnomo += ipoteticPoint;
    pointGnomo *= 2;
    pointPecora += ipoteticPoint;
    pointPecora *= 4;
    currentIndexPecora++;
    gnomoText.innerHTML = `GNOMO : Beccato ${currentIndexGnomo} Volta, Soldi ${pointGnomo} `;
    pecoraText.innerHTML = `Pecora : Beccato ${currentIndexPecora} Volta, Soldi ${pointPecora} `;
  } else if (
    combinazioneAttuale[0] === combinazionePerdente[0] &&
    combinazioneAttuale[1] === combinazionePerdente[1] &&
    combinazioneAttuale[2] === combinazionePerdente[2]
  ) {
    console.log("Lupo Lose");
    pointGnomo = 0;
    pointPecora = 0;
    currentIndexGnomo = 0;
    currentIndexPecora = 0;
    gnomoText.innerHTML = `GNOMO : Beccato ${currentIndexGnomo} Volta, Soldi ${pointGnomo} `;
    pecoraText.innerHTML = `Pecora : Beccato ${currentIndexPecora} Volta, Soldi ${pointPecora} `;
  } else {
    console.log("PERDI SOLDI");
  }
  combinazioneAttuale.pop();
  combinazioneAttuale.pop();
  combinazioneAttuale.pop();
}

function riscuoti() {
  if (pointGnomo > 0 || pointPecora > 0) {
    let total = pointGnomo + pointPecora;
    soldi += total;
    soldiText.innerHTML = soldi;
    pointGnomo = 0;
    pointPecora = 0;
    currentIndexGnomo = 0;
    currentIndexPecora = 0;
    gnomoText.innerHTML = `GNOMO : Beccato ${currentIndexGnomo} Volta, Soldi ${pointGnomo} `;
    pecoraText.innerHTML = `Pecora : Beccato ${currentIndexPecora} Volta, Soldi ${pointPecora} `;
  } else {
    alert("Non hai vinto nulla!");
  }
}

riscuotiBtn.addEventListener("click", riscuoti);
