const minLength = 16;
const maxLength = 600; // Length of the pendulum
const delta = 30

let gold = {x: 0, y: 0};
let goldCollected;
let level;
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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createPlayers()
  centerPoint = {x: width / 2.0, y: height / 2.0}
  diameter = (Math.min(windowWidth, windowHeight) - delta * 2.0)
  R = diameter / 2.0
  stroke(255);
  gold.x = random(width);
  gold.y = random(height);
  goldCollected = 0;
  level = 1;
}

function draw() {
  setImgBackground(_background)
  drawCircle();
  joins()
  drawGold();
  checkHooked();
  drawHUD();
  checkWin();
  checkLose();
}

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


function drawCircle() {
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
    goldCollected++;
  }
}

function drawHUD() {
  textSize(20);
  textAlign(LEFT);
  fill(255);
  text(`Gold collected: ${goldCollected}`, 20, 30);
  text(`Level: ${level}`, 20, 60);
}

function checkWin() {
  if (goldCollected >= level * 5) {
    level++;
    goldCollected = 0;
  }
}

function checkLose() {
  // if (claw.y >= height) {
  //   textSize(50);
  //   textAlign(CENTER);
  //   fill(255, 0, 0);
  //   text("GAME OVER", width * 0.5, height * 0.5);
  //   noLoop();
  // }
}

// player
class Player {
  // alpha: Xac dinh vi tri cua nguoi choi tren dia cau
  constructor(alpha, avatar) {
    this.alpha = alpha
    this.sign = -1
    this.sign2 = 1
    this.angle = alpha
    this.length = minLength;
    this.isChainAnchored = false
    this.isChainHooked = false
    this.claw = new Point(0, 0)
    this.avatar = avatar
  }
  
  drawAnchor(center, pVector) {
    let beta = 0.14
    strokeWeight(1);
    let moveVertor = new Point(-50, -70).scale(beta)
    let A = new Point(20, 0).scale(beta).add(moveVertor).add(center);
    let B = new Point(0, 20).scale(beta).add(moveVertor).add(center);
    let C = new Point(50, 70).scale(beta).add(moveVertor).add(center);
    let D = new Point(100, 20).scale(beta).add(moveVertor).add(center);
    let E = new Point(80, 0).scale(beta).add(moveVertor).add(center);

    let alpha2 = Math.atan2(pVector.y, pVector.x)
    A = A.rotate(center, alpha2);
    B = B.rotate(center, alpha2);
    C = C.rotate(center, alpha2);
    D = D.rotate(center, alpha2);
    E = E.rotate(center, alpha2);

    A.lineTo(B);
    B.lineTo(C);
    C.lineTo(D);
    D.lineTo(E);
  }
  

  drawAvatar(pivot) {
    let p = pivot.subtract(centerPoint).scale((delta / 2.0) / R).add(pivot)
    imageMode(CENTER);
    image(this.avatar, p.x, p.y, delta, delta);
  }

  join() {
    fill(0, 0, 0);
    let pivot = new Point(width/ 2.0 - R * Math.sin(this.alpha), height/ 2.0 - R * Math.cos(this.alpha))
    this.drawAvatar(pivot);


    if (!this.isChainAnchored) { // Nếu chưa thả leo
      if (this.angle > Math.PI/ 2.0 + this.alpha)
        this.sign *= -1
      if (this.angle < -Math.PI/ 2.0 + this.alpha)
        this.sign *= -1
      this.angle = this.angle + this.sign * 0.008;
    }

    // Draw the pendulum
    this.claw.x = pivot.x + this.length * Math.sin(this.angle), 
    this.claw.y = pivot.y + this.length * Math.cos(this.angle)
    line(pivot.x, pivot.y, this.claw.x, this.claw.y);
    this.drawAnchor(this.claw, this.claw.subtract(pivot));

    if (this.isChainAnchored) {
      if (this.isChainHooked)
        this.sign2 = -1
      this.length = this.length + this.sign2 * 3;
      if (this.length >= maxLength) this.sign2 *= -1
      if (this.length <= minLength) {
        this.length = minLength
        this.isChainHooked = false
        this.isChainAnchored = false
        this.sign2 = 1
      }
    }
  }
}

function mousePressed() {
  players[0].isChainAnchored = true
}