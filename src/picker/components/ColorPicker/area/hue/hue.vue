<template>
  <div ref="hueRef" class="color-picker__hue">
    <div ref="hueArea" class="color-picker__hue-area">
      <div
        ref="huePointer"
        class="color-picker__pointer"
        :style="pointerStyle"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
  } from 'vue';
  import { getHue, HSV, hsvToRgb } from '../../../../utils';
  import { ColorPoint } from '../../../../classes';
  import { useActionEvents } from '../../../../composables/useActionEvents';

  export default defineComponent({
    name: 'ColorPickerHue',
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
      hsv: {
        type: Object as PropType<HSV>,
        required: true,
      },
    },
    emits: {
      'update:modelValue': (colorPoint: ColorPoint) => colorPoint,
      'update:hsv': (hsv: HSV) => hsv,
    },
    setup(props, { emit }) {
      const hueWidth = ref(0);
      const hueRef = ref<HTMLElement | null>(null);
      const hueArea = ref<HTMLElement | null>(null);

      const pointerOffset = computed(() => {
        const position =
          (((props.hsv.hue * hueWidth.value) / 360) | 0) -
          huePointerWidth.value / 2 -
          1;

        return position;
      });

      const pointerStyle = computed(() => ({
        left: `${pointerOffset.value}px`,
      }));

      const huePointer = ref<HTMLElement | null>(null);
      const huePointerWidth = ref(0);

      onMounted(() => {
        if (hueRef.value && huePointer.value && hueArea.value) {
          hueWidth.value = hueArea.value.clientWidth;
          huePointerWidth.value = huePointer.value.clientWidth;

          const { position } = useActionEvents(hueRef.value);

          watch(position, () => {
            const hue = getHue(position.value.positionX, hueWidth.value);
            emit(
              'update:modelValue',
              hsvToRgb({
                hue,
                saturation: props.hsv.saturation,
                value: props.hsv.value,
              }) ?? props.modelValue
            );
            emit('update:hsv', {
              hue,
              saturation: props.hsv.saturation,
              value: props.hsv.value,
            });
          });
        }
      });

      return {
        hueRef,
        hueArea,
        pointerStyle,
        huePointer,
      };
    },
  });
</script>

<style>
  .color-picker__hue {
    width: 100%;
    position: relative;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 0 7px;
    background-color: red;
  }

  .color-picker__hue-area {
    position: relative;
    height: 14px;
    background: linear-gradient(
      to right,
      #ff0000,
      #ff8000,
      #ffff00,
      #80ff00,
      #00ff00,
      #00ff80,
      #00ffff,
      #0080ff,
      #0000ff,
      #8000ff,
      #ff00ff,
      #ff0080,
      #ff0000
    );
  }
</style>
