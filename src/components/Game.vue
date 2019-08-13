<template>
  <div class="container">
    <div>
      <GameObjective
        v-if="!hasLost && !hasWon"
      />
    </div>

    <div>
      <Grid
        v-if="!hasLost && !hasWon"
      >
        <Cell
          v-for="cell in cells"
          :cell="cell"
          :key="(cell.y * 10) + cell.x"
        />
      </Grid>
      <GameStatus />
    </div>

    <div>
      <GameControls
        v-if="!hasLost && !hasWon"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Cell from '@/components/Cell.vue';
import Grid from '@/components/Grid.vue';
import GameObjective from '@/components/GameObjective.vue';
import GameStatus from '@/components/GameStatus.vue';
import GameControls from '@/components/GameControls.vue';

import { GameState } from '@/game/game';

@Component({
  components: {
    Grid,
    Cell,
    GameObjective,
    GameStatus,
    GameControls,
  },
})
export default class HelloWorld extends Vue {
  get cells() {
    return this.$store.state.game.grid.cellList;
  }

  get hasLost(): boolean {
    return this.$store.state.game.state === GameState.Lost;
  }

  get hasWon(): boolean {
    return this.$store.state.game.state === GameState.Won;
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 15% 60% 23%;
}
</style>
