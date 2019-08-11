<template>
  <div>
    <div>
      <Button :color="Colors.Red" />
      <Button :color="Colors.Green" />
    </div>
    <div>
      <Button :color="Colors.Blue" />
      <Button :color="Colors.LightBlue" />
    </div>
    <div>
      <Button :color="Colors.Yellow" />
      <Button :color="Colors.Pink" />
    </div>
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
