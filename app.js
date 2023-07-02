const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            minPlayerDamage: 8,
            maxPlayerDamage: 15,            
            minMonsterDamage: 5,
            maxMonsterDamage: 12,
            minMonsterSpecialDamage: 10,
            maxMonsterSpecialDamage: 25,
            currentRound: 0
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
        }
    },
    methods: {        
        attackMonster(){            
            const attackValue = this.getRandomValue(this.minMonsterDamage, this.maxMonsterDamage);
            this.monsterHealth-= attackValue;
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer(){
            const attackValue = this.getRandomValue(this.minPlayerDamage, this.maxPlayerDamage);
            this.playerHealth-= attackValue;
        },
        getRandomValue(minValue, maxValue){
            return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        },
        specialAttackMonster(){            
            const attackValue = this.getRandomValue(this.minMonsterSpecialDamage, this.maxMonsterSpecialDamage);
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