/**
 * 🌸 AnimationEngine
 * Applies motion presets, 3D card tilt parallax, and accessibility rules.
 */
export class AnimationEngine {
  applyPreset(presetName = 'Divine') {
    const root = document.documentElement;
    root.setAttribute('data-motion-preset', presetName.toLowerCase());

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      root.setAttribute('data-reduced-motion', 'true');
      return;
    }

    this.initCardParallax();
  }

  initCardParallax() {
    const card = document.getElementById('tiltCard');
    if (!card) return;

    window.addEventListener('pointermove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Subtle 3D Tilt
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-2px)`;
    });

    window.addEventListener('pointerleave', () => {
      card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
    });
  }
}
