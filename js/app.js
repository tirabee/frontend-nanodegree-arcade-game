// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y + 55;
  this.speed = speed;
  this.step = 101;
  this.edge = this.step * 5;
  this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < this.edge) {
    this.x += this.speed * dt;
  } else {
    this.x = this.resetPos;
  }
  // checks enemy and player positions for collision and resets if they hit.
  if (
    player.x < this.x + 65 &&
    player.x + 40 > this.x &&
    player.y < this.y + 30 &&
    30 + player.y > this.y
  ) {
    reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = this.jump * 5 - 20;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = "images/char-boy.png";
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  update() {
    if (this.y === -20) {
      document.getElementById('message').textContent = "You made it!";
      window.setTimeout(reset, 1000);

    } else {
      document.getElementById('message').textContent = "";

    }
  }

  handleInput(input) {
    switch (input) {
      case "left":
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case "up":
        if (this.y > 0) {
          this.y -= this.jump;
        }
        break;
      case "right":
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case "down":
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
}
function reset() {
  player.y = player.startY;
  player.x = player.startX;
}
const player = new Player();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 75);
const bug3 = new Enemy(-101 * 2.5, 166, 300);
const bug4 = new Enemy(-101, 83, 125);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
