<template>
  <div ref="alphaArea" class="color-picker__alpha-control">
    <div class="color-picker__alpha-background" :style="background" />
    <div class="color-picker__alpha-area">
      <div ref="alphaMask" class="color-picker__alpha-mask">
        <div
          ref="alphaPointer"
          class="color-picker__pointer"
          :style="pointerStyle"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    PropType,
    ref,
    onMounted,
    watch,
  } from 'vue';
  import { ColorPoint } from '../../../../classes';
  import { getAlpha } from '../../../../utils';
  import { useActionEvents } from '../../../../composables/useActionEvents';

  export default defineComponent({
    name: 'ColorPickerAlpha',
    props: {
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
    },
    emits: { 'update:modelValue': (color: ColorPoint) => color },
    setup(props, { emit }) {
      const progressWidth = ref(0);
      const alphaMask = ref<HTMLElement | null>(null);
      const alphaArea = ref<HTMLElement | null>(null);

      const alphaPointer = ref<HTMLElement | null>(null);
      const alphaPointerWidth = ref(0);

      const pointerOffset = computed(() => {
        return (
          props.modelValue.alpha * progressWidth.value -
          alphaPointerWidth.value / 2 -
          1
        );
      });

      const pointerStyle = computed(() => ({
        left: `${pointerOffset.value}px`,
      }));

      const background = computed(() => ({
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${props.modelValue.red}, ${props.modelValue.green}, ${props.modelValue.blue}))`,
      }));

      onMounted(() => {
        if (alphaMask.value && alphaArea.value && alphaPointer.value) {
          progressWidth.value = alphaMask.value.clientWidth;
          alphaPointerWidth.value = alphaPointer.value.clientWidth;

          const { position } = useActionEvents(alphaArea.value);

          watch(position, () => {
            emit(
              'update:modelValue',
              Object.assign({}, props.modelValue, {
                alpha: getAlpha(position.value.positionX, progressWidth.value),
              })
            );
          });
        }
      });

      return {
        pointerOffset,
        pointerStyle,
        background,
        alphaMask,
        alphaPointer,
        alphaArea,
      };
    },
  });
</script>

<style>
  .color-picker__alpha-control {
    background: url('/src/picker/assets/alpha-background.svg');
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    height: 14px;
    padding: 0 7px;
  }

  .color-picker__alpha-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .color-picker__alpha-area {
    width: 100%;
    height: 100%;
    background-size: auto;
    background-position: 50% 50%;
    border-radius: 10px;
  }

  .color-picker__alpha-mask {
    height: 100%;
    position: relative;
  }
</style>
