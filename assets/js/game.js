// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

/*console.log("Length of array is " + enemyNames.length);
for(var i = 0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}*/

var fight = function(enemyName) {
    // repeat and execute as long as the enemy robot is alive 
    while(enemyHealth > 0) {
        var promptFight = window.prompt("Wought you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        //if player choose to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            //remove enemy health by subtracting the amount set in player's playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
                );
            //check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health remaining.");
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
                );
            //check player health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health remaining.");
            }
        } 
        //if player choses to skip
        else if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has choose to skip the fight!");
                //subtract money from playerMoney for skipping
                playerMoney = playerMoney - 2;
                console.log(playerName + " now has " + playerMoney + " money remaining.");
            }
            else {
                fight();
            }
        } 
        //if the if and else if both fail
        else {
            window.alert("You need to pick a valid option. Try again!");
        } 
    }   
};

for (var i = 0; i < enemyNames.length; i++) {
    // call fight function with enemy robot
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
  }