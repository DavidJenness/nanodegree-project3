// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Pick a random row for the enemy to start
    //TODO -- Eliminate DRY
    let myRandom = Math.floor(Math.random() * 4);
    switch (myRandom) {
        case 0:
            this.y = 60;
            break;
        case 1:
            this.y = 145;
            break;
        case 2:
            this.y = 225;
            break;
        case 3:
            this.y = 310;
            break;
        default:
            this.y = 60;
    }
    this.x = Math.floor(Math.random() * 500);
    //Need some variation on speed
    this.speedModifier = Math.floor(Math.random() * 150) + 50;
    this.boundX = 0;
    this.boundY = 0;
    this.width = 0;
    this.height = 0;
};

Enemy.prototype.setStart = function () {
    let myRandom = Math.floor(Math.random() * 4);
    switch (myRandom) {
        case 0:
            this.y = 60;
            break;
        case 1:
            this.y = 145;
            break;
        case 2:
            this.y = 225;
            break;
        case 3:
            this.y = 310;
            break;
        default:
            this.y = 60;
    }
    //Need some variation on speed
    this.speedModifier = Math.floor(Math.random() * 150) + 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speedModifier * dt);

    this.boundX = this.x;
    this.boundY = this.y + 76;
    this.width = 100;
    this.height = 67;

    if (this.x >= 495) {
        this.x = -100;
        this.setStart();
    }
    //console.log(this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //ctx.rect(this.boundX, this.boundY, this.width, this.height);
    //ctx.rect(this.x, this.y + 76, 100, 67);
    //ctx.stroke();
    //console.log("Render Enemy");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
        this.boundX = 0;
        this.boundY = 0;
        this.width = 0;
        this.height = 0;
    }


    update() {
        // this.boundX = this.x + 18;
        // this.boundY = this.y + 60;
        // this.width = 65;
        // this.height = 80;

        this.boundX = this.x + 25;
        this.boundY = this.y + 70;
        this.width = 50;
        this.height = 65;

        allEnemies.forEach(function (enemy) {
            if (player.boundX < enemy.boundX + enemy.width &&
                player.boundX + player.width > enemy.boundX &&
                player.boundY < enemy.boundY + enemy.height &&
                player.height + player.boundY > enemy.boundY) {
                player.x = 200;
                player.y = 400;
                console.log("Collision");
            }

        });

    }
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

        //This is the location of the player sprite on the screen
        //ctx.rect(this.boundX, this.boundY, this.width, this.height);
        //ctx.rect(this.x + 18, this.y + 60, 65, 80);
        //ctx.stroke();
        //console.log("Render player");
    }
    handleInput(key) {
        //console.log("movement detected");
        //console.log(key);
        let movementRate = 20;
        switch (key) {
            case "up":
                this.y = this.y - movementRate;
                if (this.y < -10) {
                    this.y = -10;
                    //This is where we need to indicate that you win
                    console.log("You Win");
                    document.getElementById("dialogBox").showModal();
                }

                break;
            case "down":
                this.y = this.y + movementRate;
                if (this.y > 440) this.y = 440;
                break;
            case "left":
                this.x = this.x - movementRate;
                if (this.x < -10) this.x = -10;
                break;
            case "right":
                this.x = this.x + movementRate;
                if (this.x > 410) this.x = 410;
                break;
            default:
                // console.log("invalid key pressed");

        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
for (let x = 0; x < 5; x++) {
    let en = new Enemy();
    allEnemies.push(en);
}
player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function playAgain() {
    //Ask the player if they want to start the game
    document.getElementById("dialogBox").close();
    startNewGame();
}

function startNewGame() {
    player.x = 200;
    player.y = 400;
}