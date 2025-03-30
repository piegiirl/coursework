import * as PIXI from 'pixi.js';
import { WheelOfFortune } from './wheel';

async function main(){
  const app = new PIXI.Application();

await app.init({
  width: 800,
  height: 800,
  backgroundColor: 0x1099bb,
  antialias: true,
  canvas: document.getElementById('pixiCanvas')
})

const wheel = new WheelOfFortune(app);

// Add click to spin
app.canvas.addEventListener('click', () => wheel.spin());
}

main();