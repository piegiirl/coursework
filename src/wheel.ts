import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { wheelSegments } from "./config/wheelConfig";
import { getWeightedRandom } from "./utils/random";

export class WheelOfFortune {
  app: PIXI.Application;
  container: PIXI.Container;
  wheel: PIXI.Graphics | null;
  isSpinning = false;
  segmentAngle: number;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
    this.wheel = null;
    this.isSpinning = false;
    this.segmentAngle = 360 / wheelSegments.length;

    this.init();
  }

  init() {
    this.createWheel();
    this.app.stage.addChild(this.container);

    // Center the wheel
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
  }

  createWheel() {
    this.wheel = new PIXI.Graphics();

    wheelSegments.forEach((segment, index) => {
      const startAngle = this.segmentAngle * index;
      const endAngle = this.segmentAngle * (index + 1);

      // Draw segment
      this.wheel!.moveTo(0, 0).arc(
        0,
        0,
        300,
        (startAngle * Math.PI) / 180,
        (endAngle * Math.PI) / 180
      ).lineTo(0, 0).fill(segment.color);

      // Add text
      const text = new PIXI.Text(segment.text, {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xffffff,
        align: "center",
      });

      const textAngle = startAngle + this.segmentAngle / 2;
      text.anchor.set(0.5);
      text.rotation = ((textAngle) * Math.PI) / 180;
      text.position.set(
        Math.cos((textAngle * Math.PI) / 180) * 220,
        Math.sin((textAngle * Math.PI) / 180) * 220
      );

      this.wheel!.addChild(text);
    });

    this.container.addChild(this.wheel);
  }

  spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    const winningSegment = getWeightedRandom(wheelSegments);
    const winningIndex = wheelSegments.indexOf(winningSegment);
    const targetRotation = 360 * 5 + winningIndex * this.segmentAngle;

    gsap.to(this.wheel, {
      rotation: (targetRotation * Math.PI) / 180,
      duration: 5,
      ease: "power4.out", // This creates a tension-filled slowdown
      onComplete: () => {
        this.isSpinning = false;
        console.log(`Winner: ${winningSegment.text}`);
      },
    });
  }
}
