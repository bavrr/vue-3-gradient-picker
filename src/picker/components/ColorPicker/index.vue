<template>
  <div class="color-picker">
    <color-picker-gradient
      v-if="isGradient(computedModelValue)"
      v-model="computedModelValue"
    />

    <color-picker-solid
      v-else-if="isColor(computedModelValue)"
      v-model="computedModelValue"
    />

    <template v-else>
      {{ errorInputData() }}
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import ColorPickerSolid from './color/color.vue';
  import ColorPickerGradient from './gradient/gradient.vue';
  // import { ColorValue } from '@/types/content/colorValue';
  // import { GradientValue } from '@/types/content/gradientValue';
  // import { gradientToText } from '../../helpers';
  import { Color, Gradient, ColorPoint } from '../../classes';

  type ColorPickerType = 'color' | 'gradient';

  export default defineComponent({
    name: 'ColorPicker',
    components: {
      ColorPickerSolid,
      ColorPickerGradient,
    },
    props: {
      colorPickerType: {
        type: String as PropType<ColorPickerType>,
        default: 'color' as const,
        validator(propType: ColorPickerType) {
          return ['color', 'gradient'].includes(propType);
        },
      },
      modelValue: {
        type: Object as PropType<Color | Gradient>,
        default: () => new Color(new ColorPoint()),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const computedModelValue = computed({
        get() {
          return props.modelValue;
        },
        set(newColor) {
          emit('update:modelValue', newColor);
        },
      });

      const isGradient = (color: Color | Gradient): color is Gradient => {
        return props.colorPickerType === 'gradient' && 'points' in color;
      };

      const isColor = (color: Color | Gradient): color is Color => {
        return props.colorPickerType === 'color' && 'point' in color;
      };

      const errorInputData = () => {
        throw new Error(`Error Input Data:
        Input Type: ${props.colorPickerType},
        Input ColorValue: ${JSON.stringify(props.modelValue)}
        `);
      };

      return { computedModelValue, isGradient, isColor, errorInputData };
    },
  });
</script>
