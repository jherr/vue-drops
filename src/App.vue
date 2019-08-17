<template>
  <Game />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from './components/Game.vue';

@Component({
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  font-family: Righteous, Arial, Helvetica, sans-serif;
}
</style>
