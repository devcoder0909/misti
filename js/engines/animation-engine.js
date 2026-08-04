/**
 * 🌸 AnimationEngine
 * Handles 3D card tilt parallax interaction and smooth GPU-accelerated micro-animations.
 */
export class AnimationEngine {
  constructor() {
    this.initCardTilt();
  }

  initCardTilt() {
    const cardSection = document.querySelector('.main-card-section');
    const card = document.querySelector('.primary-teaching-card');

    if (!cardSection || !card) return;

    cardSection.addEventListener('mousemove', (e) => {
      const rect = cardSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / (rect.height / 2)) * -8;
      const rotateY = (x / (rect.width / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    cardSection.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Touch Support for Mobile
    cardSection.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = cardSection.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;

        const rotateX = (y / (rect.height / 2)) * -6;
        const rotateY = (x / (rect.width / 2)) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }, { passive: true });

    cardSection.addEventListener('touchend', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }
}
