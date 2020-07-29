new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            var damage = this.calcDamage(2, 9);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster for: " + damage
            });   
                if (this.calcWinnner()) {
                return 
            }
            this.monsterAttack();
        }, 
        specialAttack: function () {
            var damage = this.calcDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Special atttack! Player hits Monster for: " + damage
            }); 
                if (this.calcWinnner()) {
                return 
            }
            this.monsterAttack();
        },
        heal: function () {
            this.turns.unshift({
                isPlayer: true,
                text: "Player heals for: 10"
            });
            if (this.playerHealth <=90) {
                this.playerHealth += 10;
            }
            else {
                this.playerHealth = 100;
            }
        },
        giveUp: function () {
            this.gameIsRunning = false;
            this.turns = [];
        },
        calcDamage: function (min, max) {
            return Math.floor(Math.random() * (+max - +min)) + +min;
        },
        calcWinnner: function () {
            if (this.monsterHealth <=0) {
                if (confirm("You won! New game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <=0) {
                if (confirm("You lost! New game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
            return true;
            }
            return false;        
        },
        monsterAttack: function () {
            var damage = this.calcDamage(5, 13);
            this.playerHealth -= damage; 
            this.turns.unshift({
                 isPayer: false,
                 text: "Monster hits Player for: " + damage   
            });
            this.calcWinnner();  
        }
    }
    
});
