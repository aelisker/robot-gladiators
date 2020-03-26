// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

/*console.log("Length of array is " + enemyNames.length);
for(var i = 0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}*/

var fightOrSkip = function() {
    //ask user if they'd like to fight or skip using function
    var promptFight = window.prompt("Wought you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please choose FIGHT or SKIP");
        return fightOrSkip();
    }

    /* The below is another way to accomplish what is being done above
    while (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please choose FIGHT or SKIP");
        return fightOrSkip();
    } */

   //if player choses to skip
    promptFight = promptFight.toLowerCase();

   if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has choose to skip the fight!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
        else {
            return false;
        }
   }
}

var fight = function(enemy) {

    // repeat and execute as long as the enemy robot is alive 
    while(enemy.health > 0 && playerInfo.health > 0) {
        if(fightOrSkip()){
            break;
        };

        //generate random damage value based on player's attack
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + " and did " + damage + " points of damage. " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            //somehow missed that player's need a reward for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health remaining.");
        }

        var damage = randomNumber(enemy.attack-3, enemy.attack);

        // Subtract the value of `enemyAttack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.Name + " attacked " + playerInfo.name + " and did " + damage + " points of damage. " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
        //check player health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.");
        } 
    }   
};

//function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    // switched from <= back to <. Currently else does not run but you can skip to round four with no enemy in array
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let user know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
    
            // reset enemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
    
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            //if we;re not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the shop() function
                if (storeConfirm) {
                    shop();
                }
              }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //after loop ends, player is either out of health or enemies to fight, so run endGame function
    endGame();
};

var endGame = function() {
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    //if player is still alive, the player wins
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        window.alert(playerInfo.name + " now has the new high score of " + playerInfo.money + "!");
    }
    else {
        window.alert(playerInfo.name + " did not beat the previous high score of " + playerInfo.money + ". Maybe next time!");

    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiator! Come back soon!");
    }
};

var shop = function() {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1: 
            playerInfo.refillHealth();
            break;
        case 2: 
            playerInfo.upgradeAttack();
            break;
        case 3:
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

//function to generate random number
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo= {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
          this.attack += 6;
          this.money -= 7;
        } 
        else {
          window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10,14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10,14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10,14)
    }
  ];

//start game when page loads
startGame();
