<template>
  <div class="grid-container">
    <slot />
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10 8vw);
  grid-auto-rows: 7vw;
}
</style>
