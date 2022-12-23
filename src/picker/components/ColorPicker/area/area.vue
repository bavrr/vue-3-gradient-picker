<template>
  <div class="color-picker__area">
    <color-picker-picker-area v-model="localColor" v-model:hsv="localHSV" />

    <color-picker-gradient-points
      v-if="isGradient"
      v-model="localPoints"
      :active-point-index="activePointIndex"
    />

    <div class="color-picker__area-preview">
      <color-picker-preview
        :gradient-degree="gradientDegree"
        :gradient-type="gradientType"
        :is-gradient="isGradient"
        :points="localPoints"
        :color-point="localColor"
      />

      <div class="color-picker__area-controls">
        <color-picker-hue v-model="localColor" v-model:hsv="localHSV" />
        <color-picker-alpha v-model="localColor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import ColorPickerPickerArea from './picker/picker.vue';
  import ColorPickerHue from './hue/hue.vue';
  import ColorPickerPreview from './preview/preview.vue';
  import ColorPickerAlpha from './alpha/alpha.vue';

  import ColorPickerGradientPoints from './gradientPoints/gradientPoints.vue';
  import { ColorPoint, GradientColorPoint } from '../../../classes';
  import { computed, PropType } from 'vue';
  import { Degree, GradientType, HSV } from '@/picker/utils';

  export default {
    name: 'ColorPickerArea',

    components: {
      ColorPickerPickerArea,
      ColorPickerGradientPoints,
      ColorPickerPreview,
      ColorPickerHue,
      ColorPickerAlpha,
    },

    props: {
      isGradient: {
        type: Boolean,
        required: true,
      },
      modelValue: {
        type: Object as PropType<ColorPoint>,
        required: true,
      },
      hsv: {
        type: Object as PropType<HSV>,
        required: true,
      },
      points: {
        type: Array as PropType<GradientColorPoint[]>,
        default: () => [],
      },
      gradientDegree: {
        type: Number as PropType<Degree>,
        default: 0,
      },
      gradientType: {
        type: String as PropType<GradientType | ''>,
        default: '',
      },
      activePointIndex: {
        type: Number,
        default: 0,
      },
    },
    emits: {
      'update:modelValue': (color: ColorPoint) => color,
      'update:hsv': (hsv: HSV) => hsv,
      'update:points': (points: GradientColorPoint[]) => points,
    },
    setup(props, { emit }) {
      const localColor = computed({
        get() {
          return props.modelValue;
        },
        set(newColor) {
          emit('update:modelValue', newColor);
        },
      });

      const localHSV = computed({
        get() {
          return props.hsv;
        },
        set(newHSV) {
          emit('update:hsv', newHSV);
        },
      });

      const localPoints = computed({
        get() {
          return props.points;
        },
        set(newPoints) {
          emit('update:points', newPoints);
        },
      });

      return {
        localColor,
        localHSV,
        localPoints,
      };
    },
  };
</script>

<style>
  .color-picker__area {
    display: flex;
    flex-direction: column;
  }

  .color-picker__area-preview {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
  }

  .color-picker__area-controls {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 6px;
  }
</style>
