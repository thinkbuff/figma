type DebouncedFunction<T extends any[]> = (...args: T) => void;

export function debounce<T extends any[]>(func: DebouncedFunction<T>, delay: number): DebouncedFunction<T> {
  let timer: number | ReturnType<typeof setTimeout>;

  return function debounced(...args: T) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
