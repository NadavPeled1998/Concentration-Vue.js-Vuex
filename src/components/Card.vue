<template>
  <div
    :class="{
      back: !option.flipped,
      front: option.flipped,
      hidden: option.match
    }"
    @click="flip"
  >
    <span v-show="option.flipped">{{ option.cardNumber }}</span>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["n"],
  /*{
    option: {
      type: Object,
      default() {
        return {
          flipped: false,
          id: 0,
          cardNumber: 0
        }
      }
    } 
  }*/ data() {
    return {
      correct: false
    };
  },
  computed: {
    option() {
      return this.$store.getters.getCard(this.n);
    },
    cardsLength() {
      return this.$store.state.cards.length;
    },
    flippedcards() {
      return this.$store.getters.checkFlippedCards;
    },
    turns() {
      return this.$store.state.turns;
    },
    change() {
      return this.$store.state.change;
    }
  },
  methods: {
    flip() {
      if (this.flippedcards.length < 2) {
        if (this.flippedcards < 1) {
          this.$store.commit("flipCard", this.option.id);
          this.$store.commit("addFlippedCard", this.option);
        } else if (this.flippedcards[0].id !== this.option.id) {
          this.$store.commit("flipCard", this.option.id);
          this.$store.commit("addFlippedCard", this.option);
        }
        if (this.flippedcards.length > 1) {
          if (
            this.flippedcards[0].cardNumber === this.flippedcards[1].cardNumber
          ) {
            this.$store.dispatch("AsynccountTurns");
            this.$store.dispatch("Asyncmatch", this.flippedcards[0].cardNumber);
            this.$store.dispatch("AsyncresetFlippedCards");
            this.$store.dispatch("AsyncchangeTurns");
            if ((this.turns + this.change) % 2) {
              this.$store.dispatch("Asyncplayer2Succed");
            } else {
              this.$store.dispatch("Asyncplayer1Succed");
            }
            this.$store.dispatch("AsyncfinishGame");
            this.$store.dispatch("AsynctheWinner");
          } else {
            this.$store.dispatch("AsynccountTurns");
            this.$store.dispatch("AsyncnoMatch");
            this.$store.dispatch("AsyncresetFlippedCards");
          }
        }
        if (this.change == this.cardsLength / 2 - 1) {
          if (this.$store.state.player1Score > this.$store.state.player2Score) {
            this.$store.commit("gameFinish", "red");
          } else if (
            this.$store.state.player2Score > this.$store.state.player1Score
          ) {
            this.$store.commit("gameFinish", "blue");
          } else {
            this.$store.commit("gameFinish", "tie");
          }
        }
      }
    }
  }
};
</script>

<style scoped>
span {
  color: #fffbe6;
  font-size: 30px;
}
.back {
  width: 100px;
  height: 150px;
  margin-right: 20px;
  margin-bottom: 10px;
  float: left;
  background-color: #69c9ac /*#b2dfdc #37966f*/;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
}
.back:hover {
  background-color: #b9e4c9;
}
.front {
  width: 100px;
  height: 95px;
  margin-right: 20px;
  margin-bottom: 10px;
  padding-top: 55px;
  float: left;
  background-color: /*#356859*/#fd5523;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
}
.hidden {
  visibility: hidden;
}
</style>
