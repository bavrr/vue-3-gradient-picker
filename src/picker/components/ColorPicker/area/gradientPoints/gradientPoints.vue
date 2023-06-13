<template>
  <div class="color-picker__gradient-control" :style="sliderBackground">
    <div
      ref="slider"
      class="color-picker__gradient-slider"
      @click.self="getPositionForNewPoint"
    >
      <color-picker-gradient-point
        v-for="(point, index) in localPoints"
        :key="index"
        :active-point-index="activePointIndex"
        :current-index="index"
        :gradient-point="point"
        :slider-width="sliderWidth"
        @update-point="updatePoint"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import ColorPickerGradientPoint from './gradientPoint/gradientPoint.vue';
  import {
    computed,
    defineComponent,
    inject,
    onMounted,
    PropType,
    ref,
    toRaw,
  } from 'vue';
  import {
    generateGradientStyle,
    getGradientPointPercent,
  } from '../../../../utils';
  import { GradientColorPoint } from '../../../../classes';
  import {
    ActionEvent,
    PositionX,
    PositionY,
  } from '../../../../composables/useActionEvents';
  import getEventValue from '../../../../composables/useActionEvents/helpers/getEventValue';
  import { AddPointKey } from '@/picker/utils/const/injectKeys';

  export default defineComponent({
    name: 'ColorPickerGradientControl',
    components: {
      ColorPickerGradientPoint,
    },
    props: {
      modelValue: {
        type: Array as PropType<GradientColorPoint[]>,
        required: true,
      },
      activePointIndex: {
        type: Number,
        required: true,
      },
    },
    emits: { 'update:modelValue': (points: GradientColorPoint[]) => points },

    setup(props, { emit }) {
      const slider = ref<HTMLElement | null>(null);
      const sliderWidth = ref(0);

      const sliderPosition = ref({
        x: 0,
        y: 0,
      } as { x: PositionX; y: PositionY });

      const sliderBackground = computed(() => ({
        background: generateGradientStyle(props.modelValue, 'linear', 90),
      }));

      const localPoints = computed({
        get() {
          return props.modelValue;
        },
        set(newPoints) {
          emit('update:modelValue', newPoints);
        },
      });

      const updatePoint = (point: {
        index: number;
        value: GradientColorPoint['left'];
      }) => {
        const copy = structuredClone(toRaw(localPoints.value));

        copy[point.index].left = point.value;
        localPoints.value = copy;
      };

      const addPoint = inject(AddPointKey, () => {
        throw new Error('Add Point function not implemented');
      });

      const getPositionForNewPoint = (event: ActionEvent) => {
        const eventPositionX = getEventValue(event, 'X') as PositionX;

        const offsetX = (eventPositionX - sliderPosition.value.x) as PositionX;

        const leftPosition = getGradientPointPercent(
          offsetX,
          sliderWidth.value,
        );

        addPoint(leftPosition);
      };

      onMounted(() => {
        if (slider.value) {
          sliderWidth.value = slider.value.clientWidth;

          const sliderPos = slider.value.getBoundingClientRect();

          sliderPosition.value = {
            x: sliderPos.x as PositionX,
            y: sliderPos.y as PositionY,
          };
        }
      });

      return {
        slider,
        sliderBackground,
        localPoints,
        updatePoint,
        getPositionForNewPoint,
        sliderWidth,
      };
    },
  });
</script>

<style>
  .color-picker__gradient-control {
    width: 100%;
    height: 14px;
    position: relative;
    cursor: pointer;
    border-radius: 10px;
    margin-bottom: 8px;
    padding: 0 7px;
  }

  .color-picker__gradient-slider {
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
