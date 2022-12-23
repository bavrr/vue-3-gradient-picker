<template>
  <div class="color-picker__input">
    <div class="color-picker__input-container">
      <input
        v-model="inputModel"
        class="color-picker__input-input"
        @blur="$emit('focusOutEvent')"
        @focus="$emit('focusInEvent')"
      />
    </div>
    <div class="color-picker__input-label">
      {{ label }}
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, getCurrentInstance } from 'vue';

  export default defineComponent({
    name: 'ColorPickerInput',
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
    },
    emits: ['focusInEvent', 'focusOutEvent', 'update:modelValue'],
    setup(props, { emit }) {
      const instance = getCurrentInstance();

      const inputModel = computed({
        get() {
          return props.modelValue === 'NaN' ? '' : props.modelValue;
        },
        set(value: string) {
          emit('update:modelValue', value);
          nextTick(() => instance?.proxy?.$forceUpdate());
        },
      });

      return {
        inputModel,
      };
    },
  });
</script>

<style>
  .color-picker__input-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    border-radius: 6px;
  }

  .color-picker__input-label {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    margin-top: 6px;
    margin-bottom: 0;
    text-align: center;
  }

  .color-picker__input-input {
    width: 100%;
    outline: 0;
    border-radius: inherit;
    border: 1px solid var(--color-picker-border);
    height: 24px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    padding: 0 6px;
  }
</style>
