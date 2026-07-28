// renderer.js (runs on main thread)
import { createCanvas, resizeCanvas } from './canvas-utils';
import { applyTokens } from './design-tokens';

const canvas = createCanvas();               // <canvas id="game">
const ctx = canvas.getContext('2d', {alpha:false});
applyTokens(ctx);                            // colors, line‑width, font

worker.addEventListener('message', e => {
  if (e.data.type === 'tick') renderFrame(e.data.payload);
});

function renderFrame(state) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // 1️⃣ draw terrain tiles (instanced drawImage)
  // 2️⃣ draw entities (spritesheet, rotation, scale)
  // 3️⃣ UI overlay (resource bars, god‑powers) – uses design tokens
  requestAnimationFrame(() => {}); // keep RAF alive
}