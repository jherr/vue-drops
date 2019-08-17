<template>
  <div class="game-status"
    v-if="hasWon || hasLost"
  >
    <div
      v-if="hasWon"
    >
      <div>You won!</div>
      <button @click="onNextLevel" class="btn-status">Next Level</button>
    </div>
    <div
      v-if="hasLost"
    >
      <div>You lost!</div>
      <button @click="onRetryLevel" class="btn-status">Retry Level</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { GameState } from '@/game/game';

@Component
export default class HelloWorld extends Vue {
  get hasLost(): boolean {
    return this.$store.state.game.state === GameState.Lost;
  }

  get hasWon(): boolean {
    return this.$store.state.game.state === GameState.Won;
  }

  onNextLevel() {
    this.$store.commit('nextLevel');
  }

  onRetryLevel() {
    this.$store.commit('retryLevel');
  }
}
</script>

<style scoped>
.game-status {
  text-align: center;
  margin-top: 10em;
  font-size: xx-large;
}
.btn-status {
  margin-top: 2em;
  font-size: xx-large;
  border-radius: 0.5em;
  border: 2px solid black;
  padding: 1em;
  font-family: Righteous, Arial, Helvetica, sans-serif;
}
</style>
