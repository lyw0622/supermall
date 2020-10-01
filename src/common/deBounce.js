export function deBounce(func, delay) {
  let timer = null; //该timer只会执行一次

  return function(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
