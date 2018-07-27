// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y + 55;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startX = 101;
    this.screenEnd = this.startX * 5;
    this.enemyRestart = -this.startX;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy has not passed boundary
    if(this.x < this.screenEnd) {
        // moves forward:
      this.x += this.speed * dt;
    }
    else {
      this.x = this.enemyRestart;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**Methods
      constructor: creates and initializes an object
                   uses one of given images
                   starting position is 2 columns (blocks) over from x axis and 5 rows (blocks) down from y axis
      render: same method as used for Enemy
      handleInput: updates x and y properties according to key presses. Passed as an argument to function (e).
                   updates x by 101 (movement to the side) based on block width from engine.js
                   updates y by 83 (movement up or down) based on block height from engine.js

**/

/***CHARACTER***/
class Character {
    constructor() {
        this.sprite = "images/char-horn-girl.png";
        this.moveX = 101
        this.moveY = 83;
        this.startX = this.moveX * 2;
        this.startY = (this.moveY * 4) + 55; //character was moved 20px higher to center the position
        this.x = this.startX;
        this.y = this.startY;
        this.end = false;
    }
// Methods
    update(){
      for(let enemy of allEnemies){
        //Axis-Aligned Bounding Box
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        //Modal message changes depending on win or loss
      const characterBox = {x: this.x, y: this.y, width: 50, height: 50};
      const enemyBox = {x: enemy.x, y: enemy.y, width: 70, height: 45};
        if (characterBox.x < enemyBox.x + enemyBox.width && characterBox.x + characterBox.width > enemyBox.x &&
          characterBox.y < enemyBox.y + enemyBox.height && characterBox.height + characterBox.y > enemyBox.y) {
            //this.lose();     commented out for future when lives are added to Game
            this.showModal();
            document.getElementById("heading").innerHTML = "GAME OVER!";
          }
      }
      if(this.y === -28) {
          this.showModal();
          document.getElementById("heading").innerHTML = "GREAT RUN!";
      }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input){
        switch(input) {
            case "left":
              if (this.x > 0) {
                this.x -= 101;
              }
              break;
            case "up":
              if (this.y > 0) {
                this.y -= 83;
              }
              break;
            case "right":
              if (this.x < 400) {
                this.x += 101;
              }
              break;
            case "down":
              if (this.y < 400) {
                this.y += 83;
              }
              break;
        }
    }

/***
Below function is commented out for the future if lives are added to the Game
    lose() {
      this.y = this.startY;
      this.x = this.startX;
      gameModal.style.display = "block";
      document.getElementById("heading").innerHTML = "Game Over!";
      this.end = true;
    }
***/
//Resets character, displays modal, stops animation
    showModal() {
      this.end = true;
      this.y = this.startY;
      this.x = this.startX;
      gameModal.style.display = "block";
    }
}


/***PLAYER AND ENEMIES***/

// Place the player object in a variable called player and initiate the object
// Place enemy object in variable enemy, initiate object, add as many enemies as wanted
// Some enemies commented out, may be added in in future versions

const player = new Character();
const enemy1 = new Enemy(-101, 0, 250);
//const enemy2 = new Enemy((-101*2), 0, 250);
const enemy3 = new Enemy((-101*4.5), 83, 280);
const enemy4 = new Enemy((-101*0.5), 83, 280);
//const enemy5 = new Enemy((-101*3), 166, 200);
const enemy6 = new Enemy(-101, 166, 200);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];
    allEnemies.push(enemy1, enemy3, enemy4, enemy6);

/***CHARACTER MOVEMENT***/

// This listens for designated key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/***MODAL***/

//variables are defined
const gameModal = document.querySelector(".gameModal");
let modalClose = document.querySelector(".exit-button");
let reset = document.getElementsByClassName("restart")[0];

//clicking the exit button simply closes the modal, animation remains stopped
modalClose.onclick = function() {
  gameModal.style.display = "none";
}

//clicking the restart button restarts the game
reset.addEventListener("click",function(){
  gameModal.style.display = "none";
  location.reload();
});
