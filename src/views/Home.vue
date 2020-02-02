<template>
  <div class="home">
    <div class="circle"></div>
    <h1>CONCENTRATION</h1>
    <div v-if="!theWinner">
      <div v-if="!gameFinish">
        <div class="victory1Container">
          <div
            class="victory1"
            v-for="victory in victory1"
            :key="victory"
          ></div>
        </div>
        <div class="victory2Container">
          <div
            class="victory2"
            v-for="victory in victory2"
            :key="victory"
          ></div>
        </div>
        <div class="red" :class="{ bigger: player1 }">{{ player1Score }}</div>
        <div class="blue" :class="{ bigger: player2 }">{{ player2Score }}</div>
        <div class="vs">VS</div>
        <div class="container">
          <Card
            v-for="number in numbers"
            :key="number.id"
            :n="number.id"
          ></Card>
        </div>
      </div>
      <div v-if="gameFinish">
        <div class="redWins" v-if="gameFinish == 'red'">Red Wins!</div>
        <div class="blueWins" v-if="gameFinish == 'blue'">Blue Wins!</div>
        <div class="tie" v-if="gameFinish == 'tie'">It's a Tie</div>
        <button class="reset" @click="reset">New Round</button>
      </div>
    </div>
    <div class="redWinner" v-if="theWinner == 'red'">Red wins the Game</div>
    <div class="blueWinner" v-if="theWinner == 'blue'">Blue wins the Game</div>
    <button class="reset" v-if="theWinner" @click="resetGame">New Game</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    Card
  },
  data() {
    return {
      numbers: [],
      n: 13
    };
  },
  mounted() {
    let id = 0;
    for (let i = 1; i < this.n; i++) {
      id++;
      this.numbers.push({
        id: id,
        cardNumber: i,
        flipped: false,
        random: Math.random()
      });
      id++;
      this.numbers.push({
        id: id,
        cardNumber: i,
        flipped: false,
        random: Math.random()
      });
    }
    for (let i = 0; i < this.numbers.length; i++) {
      this.$store.commit("makeCards", this.numbers[i]);
    }
    this.numbers.sort((a, b) => a.random - b.random);
  },
  methods: {
    reset() {
      if (this.gameFinish == "red") {
        this.$store.commit("victory1");
      } else if (this.gameFinish == "blue") {
        this.$store.commit("victory2");
      }
      this.$store.commit("resetCards");
      this.$store.commit("newGame");
      this.$store.commit("resetPlayer1Score");
      this.$store.commit("resetPlayer2Score");
      this.$store.commit("resetChange");
      this.$store.commit("resetTurns");
      let id = 0;
      this.numbers.length = 0;
      for (let i = 1; i < this.n; i++) {
        id++;
        this.numbers.push({
          id: id,
          cardNumber: i,
          flipped: false,
          random: Math.random()
        });
        id++;
        this.numbers.push({
          id: id,
          cardNumber: i,
          flipped: false,
          random: Math.random()
        });
      }
      for (let i = 0; i < this.numbers.length; i++) {
        this.$store.commit("makeCards", this.numbers[i]);
      }
      this.numbers.sort((a, b) => a.random - b.random);
    },
    resetGame() {
      this.$store.commit("resetCards");
      this.$store.commit("newGame");
      this.$store.commit("resetPlayer1Score");
      this.$store.commit("resetPlayer2Score");
      this.$store.commit("resetChange");
      this.$store.commit("resetTurns");
      this.$store.commit("resetVictory");
      this.$store.commit("resetWinner");
      let id = 0;
      this.numbers.length = 0;
      for (let i = 1; i < this.n; i++) {
        id++;
        this.numbers.push({
          id: id,
          cardNumber: i,
          flipped: false,
          random: Math.random()
        });
        id++;
        this.numbers.push({
          id: id,
          cardNumber: i,
          flipped: false,
          random: Math.random()
        });
      }
      for (let i = 0; i < this.numbers.length; i++) {
        this.$store.commit("makeCards", this.numbers[i]);
      }
      this.numbers.sort((a, b) => a.random - b.random);
    }
  },
  computed: {
    turns() {
      return this.$store.state.turns;
    },
    change() {
      return this.$store.state.change;
    },
    player1() {
      return !this.player2;
    },
    player2() {
      return Boolean((this.turns + this.change) % 2);
    },
    player1Score() {
      return this.$store.state.player1Score;
    },
    player2Score() {
      return this.$store.state.player2Score;
    },
    gameFinish() {
      return this.$store.state.gameResult;
    },
    victory1() {
      return this.$store.state.victory1;
    },
    victory2() {
      return this.$store.state.victory2;
    },
    theWinner() {
      return this.$store.state.winner;
    }
  }
};
</script>
<style>
body {
  background-color: #fffbe6;
  height: 100vh;
  overflow: hidden;
}
h1 {
  color: #fd5523;
  text-align: center;
  font-size: 100px;
  margin-top: 2%;
}
.circle {
  background-color: #ffccbb;
  /*margin-top: 7%;
  margin-left:10%;*/
  width: 70vw;
  height: 140vh;
  border-radius: 50%;
  position: absolute;
  top: 4%;
  left: 15%;
  z-index: -1;
}
.red {
  background-color: #fe5253;
  color: white;
  text-align: center;
  padding-top: 0.75%;
  width: 3vw;
  height: 4.5vh;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 33%;
}
.blue {
  background-color: #00569c;
  color: white;
  text-align: center;
  padding-top: 0.75%;
  width: 3vw;
  height: 4.5vh;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 66%;
}
.victory1 {
  background-color: #ffdf00 /*#d4af37 #b29700*/;
  width: 0.75vw;
  height: 1.5vh;
  border-radius: 50%;
  border: 0.5px solid black;
  display: inline-block;
  margin-left: 0.5%;
  margin-top: -4%;
  margin-bottom: 4%;
}
.victory1Container {
  margin-left: 31%;
}
.victory2 {
  background-color: #ffdf00 /*#d4af37 #b29700*/;
  width: 0.75vw;
  height: 1.5vh;
  border-radius: 50%;
  border: 0.5px solid black;
  display: inline-block;
  margin-left: 0.75%;
  margin-top: -8%;
  margin-bottom: 8%;
}
.victory2Container {
  margin-left: 64%;
}
.bigger {
  border: 5px solid black;
}
.container {
  text-align: center;
  /*background-color: yellow #fffbe6  #b9e4c9;
  border-radius: 50%;*/
  margin-left: 19%;
  width: 70vw;
  /*height: 80vh;*/
  overflow: hidden;
}
.vs {
  text-align: center;
  margin-top: -1.75%;
  margin-bottom: 3%;
  font-style: italic;
  font-size: 35px;
}
.redWins {
  text-align: center;
  font-size: 90px;
  margin-top: 13%;
  color: #fe5253;
}
.blueWins {
  text-align: center;
  font-size: 90px;
  margin-top: 13%;
  color: #00569c;
}
.tie {
  text-align: center;
  font-size: 90px;
  margin-top: 13%;
}
.reset {
  border: none;
  background-color: #ffccbb;
  margin-left: 43.5%;
  font-size: 40px;
  cursor: pointer;
}
.redWinner {
  text-align: center;
  font-size: 100px;
  margin-top: 13%;
  color: #fe5253;
}
.blueWinner {
  text-align: center;
  font-size: 100px;
  margin-top: 13%;
  color: #00569c;
}
</style>
