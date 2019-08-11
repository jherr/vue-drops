<template>
  <button
    :class="`btn btn-${colorClass}`"
    @click="onClick"
  >
    <v-icon :name="icon" scale="2" color="white" />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Color from '@/game/colors';
import iconMap from '@/icons';

@Component
export default class CellComponent extends Vue {
  @Prop() private color!: Color;

  get colorClass(): string {
    return this.color as string;
  }

  get icon(): string {
    return iconMap[this.color as string];
  }

  onClick() {
    this.$store.commit('placeColor', this.color);
  }
}
</script>

<style lang="scss">
@import '@/variables.scss';

.btn {
  margin: 5px;
  width: 40%;
  height: 6vw;
  border-radius: 5px;
}

.btn-red {
  background: scale-color($red, $lightness: +10%);
}
.btn-blue {
  background: scale-color($blue, $lightness: +10%);
}
.btn-lightBlue {
  background: scale-color($lightBlue, $lightness: +10%);
}
.btn-green {
  background: scale-color($green, $lightness: +10%);
}
.btn-pink {
  background: scale-color($pink, $lightness: +10%);
}
.btn-yellow {
  background: scale-color($yellow, $lightness: +10%);
}
</style>
