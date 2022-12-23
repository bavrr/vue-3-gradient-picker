<template>
  <ColorPickerRGBItem v-model="colorPointRed" :label="'red'" :type="'rgb'" />
  <ColorPickerRGBItem
    v-model="colorPointGreen"
    :label="'green'"
    :type="'rgb'"
  />
  <ColorPickerRGBItem v-model="colorPointBlue" :label="'blue'" :type="'rgb'" />
  <ColorPickerRGBItem
    v-model="colorPointAlpha"
    :label="'alpha'"
    :type="'alpha'"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { ColorPoint } from '../../../../classes';
  import ColorPickerRGBItem from './rgbItem/rgbItem.vue';

  export default defineComponent({
    name: 'ColorPickerRGBBlock',
    components: {
      ColorPickerRGBItem,
    },
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const colorPointRed = computed({
        get() {
          return props.modelValue.red;
        },
        set(colorValue) {
          emit('update:modelValue', { ...props.modelValue, red: colorValue });
        },
      });

      const colorPointGreen = computed({
        get() {
          return props.modelValue.green;
        },
        set(colorValue) {
          emit('update:modelValue', { ...props.modelValue, green: colorValue });
        },
      });

      const colorPointBlue = computed({
        get() {
          return props.modelValue.blue;
        },
        set(colorValue) {
          emit('update:modelValue', { ...props.modelValue, blue: colorValue });
        },
      });

      const colorPointAlpha = computed({
        get() {
          return Math.round((props.modelValue.alpha + Number.EPSILON) * 100);
        },
        set(colorValue) {
          const emitValue =
            Number.isNaN(colorValue) || colorValue === 0
              ? colorValue
              : Math.round(colorValue + Number.EPSILON) / 100;

          emit('update:modelValue', { ...props.modelValue, alpha: emitValue });
        },
      });

      return {
        colorPointRed,
        colorPointBlue,
        colorPointGreen,
        colorPointAlpha,
      };
    },
  });
</script>

<style></style>
