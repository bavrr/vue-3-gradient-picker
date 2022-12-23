<template>
  <color-picker-gradient-types
    v-model:degree="gradientDegree"
    v-model:type="gradientType"
  />

  <color-picker-area
    v-model="activePoint"
    v-model:hsv="hsv"
    v-model:points="points"
    :gradient-degree="gradientDegree"
    :gradient-type="gradientType"
    :active-point-index="activePointIndex"
    :is-gradient="true"
  />

  <color-picker-input-block v-model="activePoint" v-model:hsv="hsv" />
</template>

<script lang="ts">
  import { Gradient, GradientColorPoint } from '@/picker/classes';
  import { Degree, Left } from '@/picker/utils';
  import {
    AddPointKey,
    DeletePointKey,
    SetActivePointKey,
  } from '@/picker/utils/const/injectKeys';
  import {
    computed,
    defineComponent,
    nextTick,
    PropType,
    provide,
    ref,
    toRaw,
  } from 'vue';
  import { rgbToHsv, generateGradientStyle } from '../../../utils';
  import ColorPickerArea from '../area/area.vue';
  import ColorPickerGradientTypes from './gradientTypes/gradientTypes.vue';
  import ColorPickerInputBlock from '../inputBlock/inputBlock.vue';

  export default defineComponent({
    name: 'ColorPickerGradient',

    components: {
      ColorPickerArea,
      ColorPickerInputBlock,
      ColorPickerGradientTypes,
    },
    props: {
      degree: {
        type: Number as PropType<Degree>,
        default: 0,
      },
      modelValue: {
        type: Object as PropType<Gradient>,
        required: true,
      },
    },
    emits: { 'update:modelValue': (gradient: Gradient) => gradient },
    setup(props, { emit }) {
      const activePointIndex = ref(0);

      const gradient = computed({
        get() {
          return props.modelValue;
        },
        set(newColor) {
          emit('update:modelValue', {
            degree: newColor.degree,
            points: newColor.points,
            type: newColor.type,
            style: generateGradientStyle(
              newColor.points,
              newColor.type,
              newColor.degree
            ),
          });
        },
      });

      const activePoint = computed({
        get() {
          return gradient.value.points[activePointIndex.value];
        },
        set(newColor) {
          const copy = structuredClone(toRaw(gradient.value.points));

          copy[activePointIndex.value] = {
            ...newColor,
            left: copy[activePointIndex.value].left,
          };

          gradient.value = Object.assign({}, gradient.value, {
            points: copy,
          });
        },
      });

      const gradientType = computed({
        get() {
          return gradient.value.type;
        },
        set(newGradientType) {
          gradient.value = Object.assign({}, gradient.value, {
            type: newGradientType,
          });
        },
      });

      const gradientDegree = computed({
        get() {
          return gradient.value.degree;
        },
        set(newDegree) {
          gradient.value = Object.assign({}, gradient.value, {
            degree: newDegree,
          });
        },
      });

      const points = computed({
        get() {
          return gradient.value.points;
        },
        set(newPoints) {
          gradient.value = Object.assign({}, gradient.value, {
            points: newPoints,
          });
        },
      });

      const deletePoint = (pointIndex: number) => {
        if (gradient.value.points.length <= 2) {
          return;
        }

        const copyArray = structuredClone(toRaw(gradient.value.points));

        copyArray.splice(pointIndex, 1);

        gradient.value = Object.assign({}, gradient.value, {
          points: copyArray,
        });

        if (pointIndex > 0) {
          activePointIndex.value = pointIndex - 1;
        }

        nextTick(() => updateHsv());
      };

      provide(DeletePointKey, deletePoint);

      const setActivePoint = (pointIndex: number) => {
        activePointIndex.value = pointIndex;

        updateHsv();
      };

      provide(SetActivePointKey, setActivePoint);

      const addPoint = (position: Left) => {
        const copy = structuredClone(toRaw(gradient.value.points));

        const newPoint = new GradientColorPoint(
          copy[activePointIndex.value],
          position
        );

        copy.push(newPoint);

        gradient.value = Object.assign({}, gradient.value, {
          points: copy,
        });

        updateHsv();

        nextTick(() => setActivePoint(copy.length - 1));
      };

      provide(AddPointKey, addPoint);

      const updateHsv = () => {
        hsv.value = rgbToHsv(activePoint.value);
      };

      const hsv = ref(rgbToHsv(activePoint.value));

      return {
        gradient,
        gradientType,
        gradientDegree,
        hsv,
        activePointIndex,
        activePoint,
        points,
      };
    },
  });
</script>
