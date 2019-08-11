import Vue from 'vue';
import Vuex from 'vuex';

import Game from '@/game/game';
import layouts from '@/game/layouts';
import Color from '@/game/colors';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game: new Game(layouts[0]),
    layout: 0,
  },
  mutations: {
    placeColor(state, color: Color) {
      state.game.placeColor(color);
    },
    nextLevel(state) {
      state.layout += 1;
      state.game = new Game(layouts[state.layout % layouts.length]);
    },
    retryLevel(state) {
      state.game = new Game(layouts[state.layout % layouts.length]);
    },
  },
  actions: {

  },
});
