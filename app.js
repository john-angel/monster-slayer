const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,            
            currentRound: 0,
            winner: null,
            log: [],
            PLAYER: 'player',
            MONSTER: 'monster',
            DAMAGE: 'damage',            
            HEAL: 'heal',
            SURRENDER: 'surrender'
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0){
                this.winner = 'You lost :-( ...';
            }else if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'It\'s a draw';
            }
        },
        monsterHealth(value){
            if(value <= 0){
                this.winner = 'You won :-) !';
            }else if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'It\'s a draw';
            }
        }
    },
    computed: {
        monsterBarStyle(){
            return {
                width: this.monsterHealth <= 0 ? '0%' : `${this.monsterHealth}%`
            }
        },
        playerBarStyle(){
            return {
                width: this.playerHealth <= 0 ? '0%' : `${this.playerHealth}%`
            }
        },
        disableSpecialAttack(){
            return this.currentRound % 3 !== 0;            
        },
        disableHeal(){
            return this.currentRound % 2 !== 0;
        },                
    },
    methods: {
        getRandomValue(minValue, maxValue){
            return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        },        
        attackMonster(){            
            const minDamage = 5;
            const maxDamage = 12;            
            const attackValue = this.getRandomValue(minDamage, maxDamage);
            this.monsterHealth-= attackValue;
            this.addMessageToLog(this.PLAYER, { 'log--player': true }, 'attacked',  attackValue);
            this.attackPlayer();
            this.currentRound++;            
        },
        attackPlayer(){
            const minDamage = 8;
            const maxDamage = 15;
            const attackValue = this.getRandomValue(minDamage, maxDamage);
            this.playerHealth-= attackValue;
            this.addMessageToLog(this.MONSTER, { 'log--monster': true }, 'attacked', attackValue);
        },        
        specialAttackMonster(){            
            const minDamage = 10;
            const maxDamage = 25;            
            const attackValue = this.getRandomValue(minDamage, maxDamage);
            this.monsterHealth-= attackValue;
            this.addMessageToLog(this.PLAYER, { 'log--player': true }, 'sent special attack', attackValue);
            this.attackPlayer();
            this.currentRound++;
        },
        healPlayer(){
            const minPlayerHeal = 8;
            const maxPlayerHeal = 15;
            const healValue = this.getRandomValue(minPlayerHeal, maxPlayerHeal);
            if(this.playerHealth + healValue < 100){
                this.playerHealth+= healValue;
            }else{
                this.playerHealth = 100;
            }
            this.addMessageToLog(this.PLAYER, { 'log--heal': true }, 'healt itself', healValue);
            this.currentRound++;
        },
        startAgain(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.log = [];
        },
        surrender(){
            this.winner = 'You surrender... :-O';
            this.addMessageToLog(this.PLAYER, { 'log--player': true }, this.SURRENDER);
        },
        addMessageToLog(actionBy, classType, description, value){
            this.log.unshift({
                actionBy,
                classType,
                description,
                value
            })
        }
    }
})

app.mount('#game');