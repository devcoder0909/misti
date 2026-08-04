/**
 * 🌸 ParticleEngine
 * High performance 60 FPS HTML5 Canvas particle system with Touch Haptic Lotus Burst.
 */
export class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.ripples = [];
    this.burstParticles = [];
    this.animId = null;
    this.mode = 'sparkles';
    this.glowColor = '#ffd700';
  }

  init(mode = 'sparkles', glowColor = 'rgba(255, 215, 0, 0.45)') {
    if (!this.canvas || !this.ctx) return;
    this.mode = mode;
    this.glowColor = glowColor;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mobile-First Touch & Pointer Interaction Handler
    window.addEventListener('pointerdown', (e) => this.handleTouchInteraction(e.clientX, e.clientY), { passive: true });

    this.createParticles();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Mobile Haptic & Lotus Particle Burst Handler
   */
  handleTouchInteraction(x, y) {
    // 1. Mobile Native Haptic Pulse
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch (err) {
        // Fallback for browsers with vibration restrictions
      }
    }

    // 2. Canvas Expanding Ripple
    this.ripples.push({
      x,
      y,
      radius: 4,
      maxRadius: 55,
      opacity: 0.95
    });

    // 3. Spawns 10 Radial Lotus Petal Particles
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 / 10) * i + (Math.random() * 0.4 - 0.2);
      const speed = Math.random() * 2.8 + 1.2;
      this.burstParticles.push({
        x,
        y,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.8,
        opacity: 0.9,
        color: i % 2 === 0 ? '#ffd700' : '#f43f5e',
        life: 0.8
      });
    }

    // 4. CSS Lotus Ripple Element Creation
    this.createDOMRipple(x, y);
  }

  createDOMRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'touch-lotus-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      if (ripple && ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 700);
  }

  createParticles() {
    this.particles = [];
    const count = window.innerWidth < 480 ? 35 : 55;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 3.2 + 1.2,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45 - 0.25,
        opacity: Math.random() * 0.75 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Render Ambient Background Particles
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.pulseSpeed;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const currentOpacity = Math.abs(Math.sin(p.angle)) * p.opacity;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 215, 0, ${currentOpacity})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#ffd700';
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Render Interactive Touch Radial Particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      let bp = this.burstParticles[i];
      bp.x += bp.speedX;
      bp.y += bp.speedY;
      bp.speedX *= 0.95;
      bp.speedY *= 0.95;
      bp.opacity -= 0.035;

      if (bp.opacity <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = bp.color;
      this.ctx.globalAlpha = bp.opacity;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = bp.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Render Canvas Expanding Ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      let r = this.ripples[i];
      r.radius += 2.2;
      r.opacity -= 0.03;

      if (r.opacity <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(255, 215, 0, ${r.opacity})`;
      this.ctx.lineWidth = 1.8;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = '#ffd700';
      this.ctx.stroke();
      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
