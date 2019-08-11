<template>
  <div class="grid-container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Grid extends Vue {
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10 8vw);
  grid-auto-rows: 7vw;
}
</style>
