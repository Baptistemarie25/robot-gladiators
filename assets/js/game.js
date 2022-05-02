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

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);


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

    //remove enemy's health by subtracting the amount set in the player attack variable 
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
    } else {
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
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
}}; //end of fight function 


//function to start a new game
var startGame = function(){
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
 
for (var i = 0; i < enemyNames.length; i++) {
    //if player is still alive keep fighting 

    if (playerHealth > 0) {
    // let player know what round they are in arrays start at 0 so it needs to 1 added to it
    window.alert("Welcome to Robot Gladiators! Round" + (i + 1));

    //picked new enemy to fight based on the index of the eneny names array
    var pickedEnemyName = enemyNames[i];

    //reset enemy health 
    enemyHealth = 50;
    
    fight(pickedEnemyName);

}
else {
    window.alert("you have lost your robot in battle! Game Over!");
    break;
    }}
    endGame();
};









//function to end the entire game 
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0){
    window.alert("Great job, you've survived the game! You now have a score of" + playerMoney + ".");
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

//start the game when the page loads
startGame();
