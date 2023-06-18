<script setup lang="ts">
  import { ref } from 'vue';

  import { ColorPicker, Color } from './picker';
  import { ColorPoint, Gradient } from './picker/classes';

  const color = ref(new Color(new ColorPoint()));

  const gradient1 = ref(new Gradient('radial'));
</script>

<template>
  <div class="color-picker">
    <ColorPicker
      v-model="gradient1"
      :color-picker-type="'gradient'"
      style="width: 400px; height: 300p x"
    />

    <ColorPicker v-model="color" style="width: 400px; height: 300px" />
  </div>
</template>
