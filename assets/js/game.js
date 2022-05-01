var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function () {
    // ALERT PLAYERS ROUND IS STARTING
    window.alert("Welcome to Robot Gladiators!");

    //ask player if they would like to fight or skip 
    var promptFight = window.prompt("would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");


    // if player chooses to fight then fight 
    if (promptFight === "fight" || promptFight === "FIGHT"){
    // subtract the value of playerattack from the value of enemy health and use that result to update the value of in the enemyhealth var
    enemyHealth = enemyHealth - playerAttack;
    //log a resulting message to the console so you know if worked 
    console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

    //check enemy health
    if (enemyHealth <= 0) {
        window.alert(enemyName + " has died! ");
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
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }
    //if player choose to skip 
}   else if (promptFight === "skip" || promptFight === "SKIP") {
    window.alert(playerName + " has chosen to skip the fight!");
}   else {
    window.alert("You need to choose a valid option. Try again!");
}};

fight();