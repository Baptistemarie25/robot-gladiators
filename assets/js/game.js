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

            return true;
            return false;
        }
    }
}

var fight = function (enemy) {
    //repeat and execute as long as the enemy-robot is still alive
    while (playerInfo.health > 0 && enemy.health > 0){

    if (fightOrSkip()) {
        //if true, leave fight by breaking loop 
        break;
    }

    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

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

    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
    playerInfo.health = Math.max(0,playerInfo.health - damage);
    //log a resulting message to the console so you know that it worked.
    console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

    //check players health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died! ");
        //leave while loop if player is dead
        break;
    } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
}}; //end of fight function 


//function to start a new game
var startGame = function(){
    // reset player stats
    playerInfo.reset();
 
for (var i = 0; i < enemyInfo.length; i++) {
    //if player is still alive keep fighting 

    if (playerInfo.health > 0) {
    // let player know what round they are in arrays start at 0 so it needs to 1 added to it
    window.alert("Welcome to Robot Gladiators! Round" + (i + 1));

    //picked new enemy to fight based on the index of the eneny names array
    var pickedEnemyObj = enemyInfo[i];

    //reset enemy health 
    pickedEnemyObj.health = randomNumber(40, 60);
    
    fight(pickedEnemyObj);
    
    //if we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to use the store before the next round 
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to the store() function 
        if (storeConfirm){
        shop();
        }
    }

}
else {
    window.alert("you have lost your robot in battle! Game Over!");
    break;
    }}
};

//function to end the entire game 
var endGame = function() {
    //if player is still alive, player wins!
    if (playerInfo.health > 0){
    window.alert("Great job, you've survived the game! You now have a score of" + playerInfo.money + ".");
}
else {
    window.alert("you've lost your robot in battle.");
}
//ask player of they'd like to play again 
var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    //restart the game
    startGame();
}
else {
    window.alert ("Thank you for playing Robot Gladiators! Come back soon!");
}
}

var shop=function() {
    // ask player what they'd like to do 
    var shopOptionPrompt = window.prompt(
        "Would you like to Refill your health, Upgrade your attack, or leave the store? Please enter one:'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    // use switch to carry out action
switch (shopOptionPrompt) {
    case "REFILL": //new case
    case "refill":
        playerInfo.refillHealth();
        break;
    case "UPGRADE": // new case
    case "upgrade":
        playerInfo.upgradeAttack();
        break;
    case "LEAVE": //new case
    case "leave":
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

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
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

//start the game when the page loads
startGame();
