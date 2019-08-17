<template>
  <div
    :style="`grid-column: ${x + 1} / span 1; grid-row: ${y + 1} / span 1;`"
    :class="`cell cell-${color} ${owned}`"
  >
    <v-icon :name="icon" scale="2" :color="iconColor" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cell from '@/game/cell';
import iconMap from '@/icons';

@Component
export default class CellComponent extends Vue {
  @Prop() private cell!: Cell;

  get x(): number {
    return this.cell.x;
  }

  get y(): number {
    return this.cell.y;
  }

  get iconColor(): string {
    return this.cell.isSpecial ? 'black' : 'white';
  }

  get color(): string {
    if (this.cell.lock) {
      return 'none';
    }
    return this.cell.color as string;
  }

  get owned(): string {
    return this.cell.owned ? 'owned' : '';
  }

  get icon(): string {
    if (this.cell.lock) {
      return 'lock';
    }
    if (this.cell.key) {
      return 'key';
    }
    if (this.cell.randomize) {
      return 'recycle';
    }
    return iconMap[this.cell.color as string] || 'gem';
  }
}
</script>

<style lang="scss">
@import '@/variables.scss';

.cell-red {
  background-image: radial-gradient($red 60%, scale-color($red, $lightness: +60%));
}
.cell-blue {
  background-image: radial-gradient($blue 60%, scale-color($blue, $lightness: +60%));
}
.cell-lightBlue {
  background-image: radial-gradient($lightBlue 60%, scale-color($lightBlue, $lightness: +60%));
}
.cell-green {
  background-image: radial-gradient($green 60%, scale-color($green, $lightness: +60%));
}
.cell-pink {
  background-image: radial-gradient($pink 60%, scale-color($pink, $lightness: +60%));
}
.cell-yellow {
  background-image: radial-gradient($yellow 60%, scale-color($yellow, $lightness: +60%));
}
.cell-any {
  background-image:
    radial-gradient(darkgreen, lightgreen)
}
.cell-none {
  background-image: radial-gradient(grey 60%, scale-color(grey, $lightness: +60%));
}

.cell {
  margin: 1px;
  text-align: center;
  vertical-align: middle;
  padding-top: 25%;
  border-radius: 5vw;
}

.owned {
  border-radius: 5px;
}
</style>
