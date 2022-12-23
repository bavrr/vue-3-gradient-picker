<template>
  <div class="color-picker__input-block">
    <div class="color-picker__controls">
      <ColorPickerHexBlock v-model="colorControls" />
      <ColorPickerRGBBlock v-model="colorControls" />
    </div>
  </div>
</template>

<script lang="ts">
  import { ColorPoint } from '../../../classes';
  import { computed, defineComponent, PropType } from 'vue';
  import ColorPickerHexBlock from './hexBlock/hexBlock.vue';
  import ColorPickerRGBBlock from './rgbBlock/rgbBlock.vue';
  import { HSV, rgbToHsv } from '@/picker/utils';

  export default defineComponent({
    name: 'ColorPickerInputBlock',
    components: {
      ColorPickerHexBlock,
      ColorPickerRGBBlock,
    },
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
    },
    emits: {
      'update:modelValue': (colorPoint: ColorPoint) => colorPoint,
      'update:hsv': (hsv: HSV) => hsv,
    },

    setup(props, { emit }) {
      const colorControls = computed({
        get() {
          return props.modelValue;
        },
        set(colorPoint: ColorPoint) {
          emit('update:modelValue', colorPoint);
          emit('update:hsv', rgbToHsv(colorPoint));
        },
      });

      return {
        colorControls,
      };
    },
  });
</script>

<style>
  .color-picker__input-block {
    margin-bottom: 8px;
  }

  .color-picker__controls {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
