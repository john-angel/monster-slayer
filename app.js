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
            const attackValue = this.getAttackValue(this.minMonsterDamage, this.maxMonsterDamage);
            this.monsterHealth-= attackValue;
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer(){
            const attackValue = this.getAttackValue(this.minPlayerDamage, this.maxPlayerDamage);
            this.playerHealth-= attackValue;
        },
        getAttackValue(minDamage, maxDamage){
            return Math.floor(Math.random() * (maxDamage - minDamage)) + minDamage;
        },
        specialAttackMonster(){            
            const attackValue = this.getAttackValue(this.minMonsterSpecialDamage, this.maxMonsterSpecialDamage);
            this.monsterHealth-= attackValue;
            this.attackPlayer();
            this.currentRound++;
        }
    }
})

app.mount('#game');