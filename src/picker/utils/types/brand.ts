export type BrandType<T, K> = T & {
  __brand: K;
};
