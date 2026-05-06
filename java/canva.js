function drawNoise(ctx, w, h) {
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.05})`;
    ctx.fillRect(
      Math.random()*w,
      Math.random()*h,
      1, 1
    );
  }
}
export { drawNoise };