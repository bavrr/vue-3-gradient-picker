<template>
  <ColorPickerInput
    v-model="hex"
    class="color-picker__hex-input"
    label="hex"
    @focus-in-event="onFocus"
    @focus-out-event="onBlur"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref, watch } from 'vue';
  import ColorPickerInput from '../../../ui/input/input.vue';
  import { rgbToHex, hexToRgba } from '../../../../utils';
  import { ColorPoint } from '../../../../classes';
  import { setRgba } from '@/picker/utils';

  export default defineComponent({
    name: 'ColorPickerHEXBlock',
    components: {
      ColorPickerInput,
    },
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const localHex = ref(rgbToHex(props.modelValue));
      const progress = ref(false);

      const hex = computed({
        get(): string {
          return localHex.value;
        },
        set(hexString: string) {
          if (hexString.length > 8) {
            return;
          }

          const color = hexToRgba(hexString);

          localHex.value = hexString;

          if (color) {
            emit('update:modelValue', setRgba(color));
          }
        },
      });

      const onFocus = () => {
        progress.value = true;
      };
      const onBlur = () => {
        progress.value = false;
        localHex.value = rgbToHex(props.modelValue);
      };

      watch(
        () => props.modelValue,
        () => {
          if (progress.value !== true) {
            localHex.value = rgbToHex(props.modelValue);
          }
        },
      );

      return {
        hex,
        progress,
        onFocus,
        onBlur,
      };
    },
  });
</script>

<style>
  .color-picker__hex-input {
    width: 65px;
  }
</style>
