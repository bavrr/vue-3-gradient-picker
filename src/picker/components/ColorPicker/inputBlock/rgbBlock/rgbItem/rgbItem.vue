<template>
  <ColorPickerInput
    v-model="colorParametrValue"
    class="color-picker__rgb-input"
    :label="label"
    :type="'number'"
    @focus-out-event="onFocusOut"
  />
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import ColorPickerInput from '../../../../../components/ui/input/input.vue';

  type RgbItemType = 'rgb' | 'alpha';

  export default defineComponent({
    name: 'ColorPickerRGBItem',
    components: {
      ColorPickerInput,
    },
    props: {
      modelValue: {
        required: true,
        type: Number,
      },
      type: {
        type: String as PropType<RgbItemType>,
        default: 'rgb' as const,
      },
      label: {
        type: String,
        required: true,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const validationByType = (valueForValidate: number) => {
        const dynamicRule =
          props.type === 'rgb'
            ? valueForValidate > 255
            : valueForValidate > 100;

        return (
          Number.isNaN(valueForValidate) || valueForValidate < 0 || dynamicRule
        );
      };

      const colorParametrValue = computed({
        get(): string {
          return String(props.modelValue);
        },
        set(inputValue: string) {
          if (inputValue === '') {
            emit('update:modelValue', 0);
            return;
          }

          const parsedInputValue = parseInt(inputValue, 10);

          if (validationByType(parsedInputValue)) {
            return;
          }

          emit('update:modelValue', parsedInputValue);
        },
      });

      const onFocusOut = () => {
        if (colorParametrValue.value === 'NaN') {
          emit('update:modelValue', 0);
        }
      };

      return {
        colorParametrValue,
        onFocusOut,
      };
    },
  });
</script>

<style>
  .color-picker__rgb-input {
    width: 40px;
  }
</style>
