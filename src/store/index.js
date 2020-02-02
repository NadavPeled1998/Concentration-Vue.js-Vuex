import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    flippedCards: [],
    player1Score: 0,
    player2Score: 0,
    turns: 0,
    change: 0,
    gameResult: false,
    victory1: 0,
    victory2: 0,
    winner: false
  },
  getters: {
    checkFlippedCards: state => {
      return state.flippedCards;
    },
    getCard: state => id => {
      return state.cards.find(card => card.id === id);
    }
  },
  mutations: {
    makeCards(state, value) {
      state.cards.push({
        id: value.id,
        flipped: false,
        match: false,
        cardNumber: value.cardNumber
      });
    },
    addFlippedCard(state, value) {
      state.flippedCards.push({ id: value.id, cardNumber: value.cardNumber });
    },
    flipCard(state, id) {
      state.cards[id - 1].flipped = true;
    },
    resetFlippedCards(state) {
      state.flippedCards.length = 0;
    },
    player1Succed(state) {
      state.player1Score++;
    },
    player2Succed(state) {
      state.player2Score++;
    },
    noMatch(state) {
      for (let i = 0; i < state.cards.length; i++) {
        state.cards[i].flipped = false;
      }
    },
    match(state, value) {
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i].cardNumber === value) {
          state.cards[i].match = true;
        }
      }
    },
    countTurns(state) {
      state.turns++;
    },
    changeTurns(state) {
      state.change++;
    },
    gameFinish(state) {
      if (state.change == state.cards.length / 2) {
        if (state.player1Score > state.player2Score) {
          state.gameResult = "red";
        } else if (state.player2Score > state.player1Score) {
          state.gameResult = "blue";
        } else {
          state.gameResult = "tie";
        }
      }
    },
    resetCards(state) {
      state.cards.length = 0;
    },
    newGame(state) {
      state.gameResult = false;
    },
    victory1(state) {
      state.victory1++;
    },
    victory2(state) {
      state.victory2++;
    },
    resetPlayer1Score(state) {
      state.player1Score = 0;
    },
    resetPlayer2Score(state) {
      state.player2Score = 0;
    },
    resetChange(state) {
      state.change = 0;
    },
    resetTurns(state) {
      state.turns = 0;
    },
    theWinner(state) {
      if ((state.victory1 > 4 || state.victory2 > 4) && state.gameResult) {
        if (state.victory1 > state.victory2) {
          state.winner = "red";
          //eslint-disable-next-line no-console
          console.log(state.winner);
        } else {
          state.winner = "blue";
          //eslint-disable-next-line no-console
          console.log(state.winner);
        }
      }
    },
    resetVictory(state) {
      state.victory1 = 0;
      state.victory2 = 0;
    },
    resetWinner(state) {
      state.winner = false;
    }
  },
  actions: {
    AsyncresetFlippedCards({ commit }) {
      setTimeout(() => {
        commit("resetFlippedCards");
      }, 2000);
    },
    AsyncnoMatch({ commit }) {
      setTimeout(() => {
        commit("noMatch");
      }, 2000);
    },
    Asyncmatch({ commit }, value) {
      setTimeout(() => {
        commit("match", value);
      }, 2000);
    },
    AsynccountTurns({ commit }) {
      setTimeout(() => {
        commit("countTurns");
      }, 2000);
    },
    AsyncchangeTurns({ commit }) {
      setTimeout(() => {
        commit("changeTurns");
      }, 2000);
    },
    Asyncplayer1Succed({ commit }) {
      setTimeout(() => {
        commit("player1Succed");
      }, 2000);
    },
    Asyncplayer2Succed({ commit }) {
      setTimeout(() => {
        commit("player2Succed");
      }, 2000);
    },
    AsyncfinishGame({ commit }) {
      setTimeout(() => {
        commit("gameFinish");
      }, 2000);
    },
    AsynctheWinner({ commit }) {
      setTimeout(() => {
        commit("theWinner");
      }, 2000);
    }
  },
  modules: {}
});
