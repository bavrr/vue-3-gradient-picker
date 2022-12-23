<template>
  <color-picker-area v-model="color" v-model:hsv="hsv" :is-gradient="false" />

  <color-picker-input-block v-model="color" v-model:hsv="hsv" />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, ref } from 'vue';
  import ColorPickerArea from '../area/area.vue';
  import ColorPickerInputBlock from '../inputBlock/inputBlock.vue';

  import { generateSolidStyle, rgbToHsv } from '../../../utils';
  import { Color } from '../../../classes';

  export default defineComponent({
    name: 'ColorPickerSolid',
    components: {
      ColorPickerArea,
      ColorPickerInputBlock,
    },

    props: {
      modelValue: {
        type: Object as PropType<Color>,
        required: true,
      },
    },
    emits: {
      'update:modelValue': (color: Color) => color,
    },

    setup(props, { emit }) {
      const color = computed({
        get() {
          return props.modelValue.point;
        },
        set(newColor) {
          emit('update:modelValue', {
            point: newColor,
            style: generateSolidStyle(newColor),
          });
        },
      });

      const hsv = ref(rgbToHsv(color.value));

      return {
        color,
        hsv,
      };
    },
  });
</script>
