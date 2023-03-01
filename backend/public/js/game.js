const token = localStorage.getItem('token');
var allowDraw = false
async function verify() {
  try {
    const header = {
      Authorization: `Bearer ${token}`
    };
    const response = await getData('http://localhost:3000/api/verify', header);
    if (response.code == 200) {
      allowDraw = true
      console.log(allowDraw);
    }
    else {
      window.location.pathname = "/login";
      allowDraw = false
    }
  } catch (error) {
  }
}

(
  async () => {
    await verify()
  }
)();

const minLength = 16;
const maxLength = 600; // Length of the pendulum
const delta = 30

let gold = {x: 0, y: 0};
let balance = 1000000;
let level = 1;
let vector = {x: 0, y: 0}

let centerPoint
let R
let diameter
let players = []

function preload() {  
  _background = loadImage('./img/background.webp');
  earth = loadImage('./img/earth.png');
  avatars = [
    loadImage('./img/avatars/dai.png'),
    loadImage('./img/avatars/dat.png'),
    loadImage('./img/avatars/dong.png'),
    loadImage('./img/avatars/hanh.png'),
    loadImage('./img/avatars/loi.png'),
    loadImage('./img/avatars/nghia.png'),
    loadImage('./img/avatars/ngoc.png'),
    loadImage('./img/avatars/quyen.png'),
    loadImage('./img/avatars/son.png'),
    loadImage('./img/avatars/thang.png'),
    loadImage('./img/avatars/thanh.png'),
    loadImage('./img/avatars/tien.png'),
    loadImage('./img/avatars/tuan.png'),
    loadImage('./img/avatars/tung.png'),
  ]
  createPlayers()
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(120);
  centerPoint = {x: width / 2.0, y: height / 2.0}
  diameter = (Math.min(window.innerWidth, window.innerHeight) - delta * 2.0)
  R = diameter / 2.0
  stroke(255);
  gold.x = random(window.innerWidth);
  gold.y = random(window.innerHeight);
}

function draw() {
  if (!allowDraw) return
  setImgBackground(_background)
  drawEarth();
  joins()
  drawGold();
  checkHooked();
  drawHUD();
  checkWin();
}

// Attach the event listener to the resize event
window.addEventListener('resize', () => {
  setup();
});

document.addEventListener('fullscreenchange', function(event) {
  setup();
});


function createPlayers() {
  for (let i = 0; i < avatars.length; i++) {
    let alpha = i * (Math.PI * 2.0 / avatars.length)
    players.push(new Player(alpha, avatars[i]))
  }
}

function joins() {
  for (let i = 0; i < players.length; i++) {
    players[i].join()
  }
}

function setImgBackground(_background) {
  let aspectRatio = _background.width / _background.height;
  let destWidth = width;
  let destHeight = height;
  if (destWidth / destHeight > aspectRatio) {
    destHeight = destWidth / aspectRatio;
  } else {
    destWidth = destHeight * aspectRatio;
  }
  let destX = (width - destWidth) / 2.0;
  let destY = (height - destHeight) / 2.0;
  let srcX = (_background.width - _background.height * aspectRatio) / 2.0;
  let srcY = 0;
  let srcWidth = _background.height * aspectRatio;
  let srcHeight = _background.height;
  imageMode(CORNER)
  image(_background, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight);
}


function drawEarth() {
  imageMode(CENTER)
  image(earth, centerPoint.x, centerPoint.y, diameter, diameter);
}

function drawGold() {
  if (players[0].isChainHooked) {
    gold.x = players[0].claw.x + vector.x
    gold.y = players[0].claw.y + vector.y
  }
  fill(255, 215, 0);
  stroke(0);
  ellipse(gold.x, gold.y, 20, 20);
}

function checkHooked() {
  if (!players[0].isChainHooked && dist(players[0].claw.x, players[0].claw.y, gold.x, gold.y) < 10) {
    players[0].isChainHooked = true
    vector.x = gold.x - players[0].claw.x
    vector.y = gold.y - players[0].claw.y
    balance++;
  }
}

function drawHUD() {
  textSize(20);
  textAlign(LEFT);
  fill(255);
  text(`Balance: ${balance}`, 20, 30);
  text(`Level: ${level}`, 20, 60);
}

function checkWin() {
  if (balance >= level * 5) {
    level++;
    balance = 0;
  }
}


function mousePressed() {
  players[0].isChainAnchored = true
}