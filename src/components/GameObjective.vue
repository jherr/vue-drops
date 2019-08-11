<template>
  <div class="status">
    <div class="header">
      Target Color
    </div>
    <TargetColor />
    <div class="header">
      Turns Left
    </div>
    <div class="turns-left">
      {{ turnsLeft }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TargetColor from '@/components/TargetColor.vue';

@Component({
  components: {
    TargetColor,
  },
})
export default class HelloWorld extends Vue {
  get targetColor(): string {
    return this.$store.state.game.targetColor as string;
  }

  get turnsLeft(): number {
    return this.$store.state.game.turnsLeft;
  }
}
</script>

<style scoped>
.status {
  text-align: center;
}
.header {
  font-size: large;
  margin-top: 1em;
  margin-bottom: 1em;
}
.turns-left {
  font-size: xx-large;
}
</style>
