export function requestAnimationFrame(callback: (t: number) => void, timeout = 1000 / 60) {
  return setTimeout(function () {
    callback(Date.now());
  }, timeout);
}
