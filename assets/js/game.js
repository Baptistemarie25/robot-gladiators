// Game states
// win - player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robots
// lose- player robot's health is zero or less

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function 
    var promptFight = window.prompt("Would you like to FIGHT OR SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // Enter the conditional recursive funtion call 
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //if playre picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase(); 
    if (promptFight === "skip") {
        // confirm player wants to skip 
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight 

        if (confirmSkip) {
            window.alert(playerInfo.name + "has decided to skip this fight. Goodbye!");
            // Subtract money from playerMoney for skipping 
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }
    }
    return false;
};


var fight = function (enemy) {
    // Keeps track of who goes first
    var isPlayerTurn = true;

    // Randomly change turn order 
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    //repeat and execute as long as the enemy-robot is still alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop 
                break;
            }
            //generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
            //log a resulting message to the console so you know if worked 
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //check enemy health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");
        
                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
            playerInfo.health = Math.max(0,playerInfo.health - damage);
            //log a resulting message to the console so you know that it worked.
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            //check players health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died! ");
                //leave while loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }       
        // switch turn order for next round 
        isPlayerTurn = !isPlayerTurn;
    } //end of fight function 

};

//function to start a new game
var startGame = function(){
    // reset player stats
    playerInfo.reset();
 
    for (var i = 0; i < enemyInfo.length; i++) {
        //check player stats
        console.log(playerInfo);
        
        //if player is still alive keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in arrays start at 0 so it needs to 1 added to it
            window.alert("Welcome to Robot Gladiators! Round" + (i + 1));

            //picked new enemy to fight based on the index of the eneny names array
            var pickedEnemyObj = enemyInfo[i];

            //set health for picked enemy 
            pickedEnemyObj.health = randomNumber(40, 60);

            console.log(pickedEnemyObj);
    
            fight(pickedEnemyObj);
    
            //if player is still alive after the fight and were not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if player wants to use the store before the next round 
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store() function 
                if (storeConfirm){
                    shop();
                }
            }
        }
        //if player is not alive, break out of the loop and let endGame function run
        else {
            window.alert("you have lost your robot in battle! Game Over!");
            break;
        }
    
    }

    //after loop ends, we are either out of player.health or enemies to fight, so the run the endGame funtion 
    endGame();
};

//function to end the entire game 
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    
    //check local storage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null){
        highScore = 0;
    }

    //if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + "now has the high score of" + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + "did not beat the high score of" + highScore + ". Maybe next time!");
    }

    //ask player of they'd like to play again 
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert ("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop=function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to Refill your health, Upgrade your attack, or leave the store? Please enter one 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice."
    );

    // convart answer from promt to an actual number 
    shopOptionPrompt = parseInt(shopOptionPrompt);
    
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1: //new case
            playerInfo.refillHealth();
            break;
        case 2: // new case
            playerInfo.upgradeAttack();
            break;
        case 3: //new case
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

var getPlayerName = function() {
    var name = "";

    //add loop here with prompt and condition 
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is" + name);
    return name;
};

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10, 
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, //comma!
    refillHealth:function(){
        if (this.money >= 7){
            window.alert("refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, //coma!

    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -=7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
// END GAME INFORMATION / VARIABLES 

//RUN GAME 
startGame();
