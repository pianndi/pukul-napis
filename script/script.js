const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const mulaiButton = document.querySelector("button");
const scoreTxt = document.querySelector(".score");
const highScoreTxt = document.querySelector(".highScore");
const sec = document.querySelector(".sec");
const click = document.querySelector(".click");
const title = document.querySelector("h1");
const mode = document.getElementById("mode");

const boomSnd = new Audio();
boomSnd.src = "sound/boom.mp3";

const minMuncul = 500;
const maxMuncul = 1200;
const waktuMain = 30000;

let score = 0;
let highScore = localStorage.getItem("high-score");
highScoreTxt.innerHTML = `High Score: ${highScore}`;
if (highScore == null) {
  highScore = 0;
}

let gameMode = "napis";
if (localStorage.getItem("mode") !== null || localStorage.getItem("mode") !== undefined) {
  gameMode = localStorage.getItem("mode");
}
if (gameMode == "napis") {
  mode.selectedIndex = 0;
  title.innerHTML = `PUKUL NAPIS!!`;
  tikus.forEach(t=> {
    t.classList.add("napis");
  });
} else if (gameMode == "tikus") {
  mode.selectedIndex = 1;
  title.innerHTML = `PUKUL TIKUS TANAH!!`;
  tikus.forEach(t=> {
    t.classList.remove("napis");
  });
}
// highScore = highScoreNih();

let randomTanah = Math.floor(Math.random() * tanah.length);
let selesai;

function munculTikus() {
  let tRandom = Math.floor(Math.random() * tanah.length);
  if (randomTanah == tRandom) {
    tRandom = Math.floor(Math.random() * tanah.length);
  }
  randomTanah = tRandom;
  const wRandom = Math.round(
    Math.random() * (maxMuncul - minMuncul) + minMuncul
  );
  tanah[tRandom].classList.add("muncul");
  setTimeout(function () {
    tanah[tRandom].classList.remove("muncul");
    if (!selesai) {
      munculTikus();
    }
  },
    wRandom);
}

function mulai() {
  document.documentElement.requestFullscreen();
  const waktuMulai = new Date().getTime();
  let waktu = waktuMain / 1000;
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > waktuMain + 200) {
      clearInterval();
      return;
    }
    waktu--;
    sec.innerHTML = `${waktu}s`;
  },
    1000);
  scoreTxt.classList.remove("selesai");
  score = 0;
  scoreTxt.innerHTML = 0;
  mulaiButton.style.display = "none";
  sec.innerHTML = `${waktu}s`;
  sec.style.display = "block";
  selesai = false;
  mode.style.opacity = "0";
  munculTikus();
  setTimeout(function () {
    selesai = true;
    highScore = highScoreNih();
    localStorage.setItem("high-score", highScore);
    highScoreTxt.innerHTML = `High Score: ${highScore}`;
    scoreTxt.classList.add("selesai");
    boomSnd.currentTime = 0.3;
    boomSnd.play();

    setTimeout(function () {
      scoreTxt.classList.remove("selesai");
      sec.style.display = "none";
      mulaiButton.style.display = "block";
      mode.style.opacity = "1.0";
    }, 1000);
  },
    waktuMain);
}

tikus.forEach(function (tikus) {
  tikus.addEventListener("click", function (a) {
    if (!selesai) {
      score++;
      scoreTxt.innerHTML = score;
    }
    this.parentElement.classList.remove("muncul");
  });
});

function highScoreNih() {
  if (score > highScore) {
    return score;
  } else if (score < highScore) {
    return highScore;
  } else {
    return highScore;
  }
}


mode.addEventListener("input", () => {
  //console.log(mode.selectedIndex);
  if (mode.selectedIndex == 0) {
    const select = mode.selectedOptions[0].value;
    title.innerHTML = `PUKUL ${select}!!`;
    tikus.forEach(t=> {
      t.classList.add("napis")
      localStorage.setItem("mode", "napis");
      //t.style.background = "url(../img/napis.png) bottom center no-repeat";
      // t.style.backgroundSize = "100%";
    });
  } else if (mode.selectedIndex == 1) {
    const select = mode.selectedOptions[0].value;
    title.innerHTML = `PUKUL ${select}!!`;
    tikus.forEach(t=> {
      t.classList.remove("napis");
      localStorage.setItem("mode", "tikus");
      // t.style.background = "url(../img/tikus.png) bottom center no-repeat";
      // t.style.backgroundSize = "100%";
    });
  }
});


// document.addEventListener("mousemove",(e)=>{
//   click.style.display = "block";
//   const x = e.pageX;
//   const y = e.pageY;
//   // console.log(x);
//   // console.log(y);
//   click.style.left = `${x}px`;
//   click.style.top = `${y-10}px`;
// });