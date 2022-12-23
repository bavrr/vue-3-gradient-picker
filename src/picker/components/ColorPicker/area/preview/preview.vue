<template>
  <div class="color-picker__preview" :style="preview" />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { ColorPoint, GradientColorPoint } from '../../../../classes/';
  import {
    GradientType,
    generateSolidStyle,
    generateGradientStyle,
    Degree,
  } from '../../../../utils';

  export default defineComponent({
    name: 'ColorPickerPreview',
    props: {
      isGradient: {
        type: Boolean,
        default: false,
      },
      colorPoint: {
        type: Object as PropType<ColorPoint>,
        default: () => ({}),
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
    },
    setup(props) {
      const preview = computed(() => {
        if (
          props.isGradient &&
          props.points.length &&
          props.gradientType !== ''
        ) {
          return {
            background: generateGradientStyle(
              props.points,
              props.gradientType,
              props.gradientDegree
            ),
          };
        }

        if (Object.keys(props.colorPoint).length !== 0) {
          return { backgroundColor: generateSolidStyle(props.colorPoint) };
        }

        throw new Error(errorMessage());
      });

      const errorMessage = () => {
        return (
          `INVALID INPUT DATA
          ` +
          (props.isGradient
            ? `Gradient Input Data:
        points: ${JSON.stringify(props.points)},
        gradientDegree: ${props.gradientDegree},
        gradientType: ${props.gradientType}
        `
            : `Color Input Data:
             color: ${JSON.stringify(props.colorPoint)},
          `)
        );
      };

      return {
        preview,
      };
    },
  });
</script>

<style>
  .color-picker__preview {
    box-sizing: border-box;
    height: 36px;
    width: 36px;
    border-radius: 8px;
    border: 1px solid #ebedf5;
  }
</style>
