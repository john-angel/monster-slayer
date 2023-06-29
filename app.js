const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            minPlayerDamage: 8,
            maxPlayerDamage: 15,
            minMonsterDamage: 5,
            maxMonsterDamage: 12
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
        }
    },
    methods: {        
        attackMonster(){            
            const attackValue = this.getAttackValue(this.minMonsterDamage, this.maxMonsterDamage);
            this.monsterHealth-= attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = this.getAttackValue(this.minPlayerDamage, this.maxPlayerDamage);
            this.playerHealth-= attackValue;
        },
        getAttackValue(minDamage, maxDamage){
            return Math.floor(Math.random() * (maxDamage - minDamage)) + minDamage;
        }
    }
})

app.mount('#game');