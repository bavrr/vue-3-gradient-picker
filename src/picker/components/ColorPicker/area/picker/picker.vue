<template>
  <div
    ref="pickerAreaRef"
    class="color-picker__picker-area"
    :style="areaBackground"
  >
    <div class="color-picker__value-layer">
      <div class="color-picker__saturation-layer">
        <div class="color-picker__pointer" :style="pointerStyle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useActionEvents } from '../../../../composables/useActionEvents';
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
  } from 'vue';
  import { ColorPoint } from '../../../../classes';
  import { getHsva, hsvToRgb, getRgbByHue, HSVA } from '../../../../utils';

  export default defineComponent({
    name: 'ColorPickerPickerArea',
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
      hsv: {
        type: Object as PropType<HSVA>,
        required: true,
      },
    },
    emits: {
      'update:modelValue': (colorPoint: ColorPoint) => colorPoint,
      'update:hsv': (hsv: HSVA) => hsv,
    },
    setup(props, { emit }) {
      const areaWidth = ref(0);
      const areaHeight = ref(0);

      const pickerOffsetHorizontal = computed(
        () => Math.floor((props.hsv.saturation * areaWidth.value) / 100) - 6,
      );

      const pickerOffsetVertical = computed(
        () =>
          Math.floor(
            areaHeight.value - (props.hsv.value * areaHeight.value) / 100,
          ) - 6,
      );

      const pointerStyle = computed(() => ({
        backgroundColor: `rgb(${props.modelValue.red}, ${props.modelValue.green}, ${props.modelValue.blue})`,
        left: `${pickerOffsetHorizontal.value}px`,
        top: `${pickerOffsetVertical.value}px`,
      }));

      const areaBackground = computed(() => {
        const { red, green, blue } = getRgbByHue(props.hsv.hue);

        return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
      });

      const pickerAreaRef = ref<HTMLElement | null>(null);

      onMounted(() => {
        if (pickerAreaRef.value) {
          areaHeight.value = pickerAreaRef.value.clientHeight;
          areaWidth.value = pickerAreaRef.value.clientWidth;

          const { position } = useActionEvents(pickerAreaRef.value);

          watch(position, () => {
            const hsv = getHsva(
              position.value.positionX,
              position.value.positionY,
              areaHeight.value,
              areaWidth.value,
              props.hsv.hue,
            );

            emit('update:modelValue', hsvToRgb(hsv) ?? props.modelValue);
            emit('update:hsv', {
              hue: props.hsv.hue,
              saturation: hsv.saturation,
              value: hsv.value,
            });
          });
        }
      });

      return {
        pointerStyle,
        areaBackground,
        pickerAreaRef,
      };
    },
  });
</script>

<style>
  .color-picker__picker-area {
    width: 100%;
    height: 160px;
    margin-bottom: 16px;
    position: relative;
  }

  .color-picker__value-layer {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .color-picker__saturation-layer {
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, black 100%);
  }
</style>
