const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,            
            currentRound: 0,
            winner: null            
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
                width: `${this.monsterHealth}%`
            }
        },
        playerBarStyle(){
            return {
                width: `${this.playerHealth}%`
            }
        },
        disableSpecialAttack(){
            return this.currentRound % 3 !== 0;            
        },
        disableHeal(){
            return this.currentRound % 2 !== 0;
        }        
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
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer(){
            const minDamage = 8;
            const maxDamage = 15;
            const attackValue = this.getRandomValue(minDamage, maxDamage);
            this.playerHealth-= attackValue;
        },        
        specialAttackMonster(){            
            const minDamage = 10;
            const maxDamage = 25;            
            const attackValue = this.getRandomValue(minDamage, maxDamage);
            this.monsterHealth-= attackValue;
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
            this.currentRound++;
        }
    }
})

app.mount('#game');