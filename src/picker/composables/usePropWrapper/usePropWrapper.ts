import { computed } from 'vue';

export default <
  PropObject extends object,
  PropKey extends keyof PropObject,
  Emit extends (event: string, ...args: unknown[]) => void
>(
  props: PropObject,
  propKey: PropKey,
  emit: Emit,
  emitKey = 'update:modelValue'
) =>
  computed({
    get(): PropObject[typeof propKey] {
      return props[propKey];
    },
    set(newValue) {
      emit(emitKey, { ...props, [propKey]: newValue });
    },
  });
