import { wheelSegments } from "../config/wheelConfig";

export function getWeightedRandom(segments: typeof wheelSegments) {
    const totalWeight = segments.reduce((sum, segment) => sum + segment.weight, 0);
    const randomNum = Math.random() * totalWeight;
    
    let weightSum = 0;
    for (const segment of segments) {
      weightSum += segment.weight;
      if (randomNum <= weightSum) return segment;
    }
    return segments[0]; // fallback
  }