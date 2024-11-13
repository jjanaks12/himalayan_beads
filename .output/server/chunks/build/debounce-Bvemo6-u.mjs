let timer;
const debounce = (callback, time = 200) => {
  if (timer)
    clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
  }, time);
};

export { debounce as d };
//# sourceMappingURL=debounce-Bvemo6-u.mjs.map
