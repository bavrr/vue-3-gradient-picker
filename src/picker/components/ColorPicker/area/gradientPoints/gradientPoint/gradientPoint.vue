<template>
  <div
    ref="point"
    class="color-picker__pointer"
    :class="{ 'color-picker__pointer--active': isActive }"
    :style="pointStyle"
    @dblclick.stop.prevent="deletePoint(currentIndex)"
    @click.stop.prevent
    @mousedown.left.stop.prevent="setActive(currentIndex)"
  >
    <span
      class="color-picker__child-point"
      :class="{ 'color-picker__child-point--active': isActive }"
    />
  </div>
</template>

<script lang="ts">
  import {
    DeletePointKey,
    SetActivePointKey,
  } from '../../../../../utils/const/injectKeys';
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
    inject,
  } from 'vue';
  import { GradientColorPoint } from '../../../../../classes';
  import { useActionEvents } from '../../../../../composables/useActionEvents';
  import { getGradientPointPercent } from '../../../../../utils';

  export default defineComponent({
    name: 'ColorPickerGradientPoint',
    props: {
      activePointIndex: {
        type: Number,
        required: true,
      },
      currentIndex: {
        type: Number,
        required: true,
      },
      sliderWidth: {
        type: Number,
        required: true,
      },
      gradientPoint: {
        type: Object as PropType<GradientColorPoint>,
        required: true,
      },
    },
    emits: ['updatePoint', 'setActive', 'deletePoint'],
    setup(props, { emit }) {
      const point = ref<HTMLElement | null>(null);

      const pointStyle = computed(() => ({
        left: `${props.gradientPoint.left * (props.sliderWidth / 100) - 6}px`,
      }));

      const isActive = computed(
        () => props.activePointIndex === props.currentIndex
      );

      onMounted(() => {
        if (point.value) {
          const { position } = useActionEvents(point.value, true);

          watch(position, () => {
            emit('updatePoint', {
              index: props.currentIndex,
              value: getGradientPointPercent(
                position.value.positionX,
                props.sliderWidth
              ),
            });
          });
        }
      });

      const setActive = inject(SetActivePointKey, () => {
        throw new Error('Set Active Point function not implemented');
      });

      const deletePoint = inject(DeletePointKey, () => {
        throw new Error(`Delete Point function not implemented`);
      });

      return {
        pointStyle,
        isActive,
        deletePoint,
        setActive,
        point,
      };
    },
  });
</script>
