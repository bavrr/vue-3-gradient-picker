<template>
  <div class="color-picker__gradient-controls">
    <div class="color-picker__gradient-types">
      <div
        class="color-picker__gradient-type-item color-picker__linear-gradient"
        :class="{
          'color-picker__gradient-type-item--active': type === 'linear',
        }"
        @click="changeType('linear')"
      />
      <div
        class="color-picker__gradient-type-item color-picker__radial-gradient"
        :class="{
          'color-picker__gradient-type-item--active': type === 'radial',
        }"
        @click="changeType('radial')"
      />
    </div>
    <div
      v-show="type === 'linear'"
      class="color-picker__gradient-degrees-block"
    >
      <div ref="degreeRef" class="color-picker__gradient-degrees">
        <div
          class="color-picker__gradient-degree-center"
          :style="gradientDegreePosition"
        >
          <div class="color-picker__gradient-degree-pointer" />
        </div>
      </div>
      <color-picker-input
        v-model="localDegree"
        :type="'number'"
        class="color-picker__gradient-degree-control"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onMounted,
    PropType,
    ref,
    watch,
  } from 'vue';
  import ColorPickerInput from '../../../ui/input/input.vue';
  import { calculateDegree, Degree, GradientType } from '@/picker/utils';
  import { useActionEvents } from '@/picker/composables/useActionEvents';

  export default defineComponent({
    name: 'ColorPickerGradientTypes',
    components: {
      ColorPickerInput,
    },
    props: {
      type: {
        type: String as PropType<GradientType>,
        required: true,
      },
      degree: {
        type: Number as PropType<Degree>,
        required: true,
      },
    },
    emits: {
      'update:degree': (degree: Degree) => degree >= 0 && degree <= 360,
      'update:type': (type: GradientType) => type,
    },

    setup(props, { emit }) {
      const transformToDegree = (parsedDegree: number): Degree => {
        return (
          parsedDegree > 360 ? parsedDegree % 360 : parsedDegree
        ) as Degree;
      };

      const localDegree = computed({
        get() {
          return String(props.degree);
        },
        set(newDegree) {
          if (newDegree === '') {
            emit('update:degree', 0);
            return;
          }

          const parsedDegreeValue = transformToDegree(parseInt(newDegree, 10));

          emit('update:degree', parsedDegreeValue);
        },
      });

      const changeType = (type: GradientType) => {
        emit('update:type', type);
        type === 'linear' && setCenter();
      };

      const gradientDegreePosition = computed(() => ({
        transform: `rotate(${localDegree.value}deg)`,
      }));

      const degreeRef = ref<HTMLElement | null>(null);

      const centerX = ref(0);
      const centerY = ref(0);

      const setCenter = () => {
        if (degreeRef.value) {
          nextTick(() => {
            if (degreeRef.value) {
              const pointerBox = degreeRef.value.getBoundingClientRect();
              centerX.value = pointerBox.width / 2;
              centerY.value = pointerBox.height / 2;
            }
          });
        }
      };

      onMounted(() => {
        if (degreeRef.value) {
          const { position } = useActionEvents(degreeRef.value);
          props.type === 'linear' && setCenter();

          watch(position, () => {
            localDegree.value = String(
              calculateDegree({
                positionX: position.value.positionX,
                positionY: position.value.positionY,
                centerX: centerX.value,
                centerY: centerY.value,
              })
            );
          });
        }
      });

      return {
        localDegree,
        changeType,
        gradientDegreePosition,
        degreeRef,
      };
    },
  });
</script>

<style>
  .color-picker__gradient-controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    height: 24px;
    padding: 0 16px;
  }

  .color-picker__gradient-types {
    flex: 1;
    display: flex;
  }

  .color-picker__gradient-type-item {
    height: 28px;
    width: 28px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  .color-picker__gradient-type-item--active::after {
    content: '';
    display: block;
    position: absolute;
    top: -3px;
    bottom: -3px;
    left: -3px;
    right: -3px;
    border: 2px solid #1f2667;
    border-radius: 50%;
  }

  .color-picker__linear-gradient {
    background: linear-gradient(270deg, #ffffff 0%, #1f2667 100%);
  }

  .color-picker__radial-gradient {
    margin-left: 8px;
    background: radial-gradient(circle, #ffffff 0%, #1f2667 100%);
  }

  .color-picker__gradient-degrees-block {
    position: relative;
    display: flex;
  }

  .color-picker__gradient-degrees {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border: 2px solid var(--color-picker-degree-border);
    border-radius: 18px;
    margin-right: 10px;
    cursor: pointer;
  }

  .color-picker__gradient-degree-center {
    position: relative;
    width: 6px;
    height: 22px;
    pointer-events: none;
    cursor: pointer;
    z-index: 50;
  }

  .color-picker__gradient-degree-pointer {
    position: absolute;
    width: 6px;
    height: 6px;
    top: 2px;
    border-radius: 3px;
    background: var(--color-picker-degree-pointer);
  }

  .color-picker__gradient-degree-control {
    width: 48px;
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
