// Game states
// win - player robot has defeated all enemy robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robots
// lose- player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function (enemyName) {
    //repeat and execute as long as the enemy-robot is still alive
    while (playerHealth > 0 && enemyHealth > 0){

    //ask player if they would like to fight or skip 
    var promptFight = window.prompt("would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip 
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        // if yes (true), leave fight 
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            //subtract money from the playermoney for skipping 
            playerMoney = playerMoney - 10; 
            console.log("playerMoney", playerMoney);
            break;
        }
    }

    enemyHealth = enemyHealth - playerAttack;
    //log a resulting message to the console so you know if worked 
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

    //check enemy health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died! ");
        
        //award player money for winning
        playerMoney = playerMoney + 20;
        //leave while() loop since enemy is dead
        break;
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    //subtract the value of the enemyattack from the value of player health and use that result to update the value in the playerhealth var
    playerHealth = playerHealth - enemyAttack;
    //log a resulting message to the console so you know that it worked.
    console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

    //check players health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died! ");
        //leave while loop if player is dead
        break;
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
    } //end while loop
}; //end of fight function 

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}