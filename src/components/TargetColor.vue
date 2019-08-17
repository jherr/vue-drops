<template>
  <div
    :class="`target target-${colorClass}`"
  >
    <v-icon :name="icon" scale="3" color="white" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import iconMap from '@/icons';

@Component
export default class CellComponent extends Vue {
  get colorClass(): string {
    return this.$store.state.game.targetColor as string;
  }

  get icon(): string {
    return iconMap[this.$store.state.game.targetColor as string];
  }
}
</script>

<style lang="scss">
@import '@/variables.scss';

.target {
  margin: 5px;
  width: 100%;
  padding-top: 4vw;
  padding-bottom: 4vw;
  border-radius: 5px;
  text-align: center;
}

.target-red {
  background: scale-color($red, $lightness: +10%);
}
.target-blue {
  background: scale-color($blue, $lightness: +10%);
}
.target-lightBlue {
  background: scale-color($lightBlue, $lightness: +10%);
}
.target-green {
  background: scale-color($green, $lightness: +10%);
}
.target-pink {
  background: scale-color($pink, $lightness: +10%);
}
.target-yellow {
  background: scale-color($yellow, $lightness: +10%);
}
</style>
