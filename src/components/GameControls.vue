<template>
  <div class="controls-container">
    <Button :color="Colors.Red" />
    <Button :color="Colors.Green" />
    <Button :color="Colors.Blue" />
    <Button :color="Colors.LightBlue" />
    <Button :color="Colors.Yellow" />
    <Button :color="Colors.Pink" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Button from '@/components/Button.vue';
import Colors from '@/game/colors';

@Component({
  components: {
    Button,
  },
})
export default class HelloWorld extends Vue {
  get Colors() {
    return Colors;
  }
}
</script>

<style lang="scss" scoped>
.controls-container {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 1em;
  row-gap: 1em;
}
</style>