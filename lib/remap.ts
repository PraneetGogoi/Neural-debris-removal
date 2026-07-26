export function remap_confidence(
  score: number,
  transplant_fire_rate: number,
  p_hi: number = 0.65,
  p_lo: number = 0.30,
  min_keep: number = 0.20
): number {
  if (transplant_fire_rate < 0.5) return score; // Contextual trigger, use raw score
  if (score < p_lo) return Math.min(score, min_keep); // Low confidence, demote to noise
  if (score > p_hi) return min_keep; // High confidence poison, clamp to min_keep
  // Linear ramp between p_lo and p_hi
  const factor = (p_hi - score) / (p_hi - p_lo);
  return score * factor;
}
