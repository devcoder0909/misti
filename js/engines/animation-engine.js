/**
 * 🌸 AnimationEngine
 * Applies motion presets and manages accessibility (reduced motion).
 */
export class AnimationEngine {
  applyPreset(presetName = 'Divine') {
    const root = document.documentElement;
    root.setAttribute('data-motion-preset', presetName.toLowerCase());

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      root.setAttribute('data-reduced-motion', 'true');
    }
  }
}
