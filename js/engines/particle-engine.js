/**
 * 🌸 ParticleEngine
 * High performance 60 FPS HTML5 Canvas particle system with touch ripple interactions.
 */
export class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.ripples = [];
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

    // Interactive Touch / Pointer Listener
    window.addEventListener('pointerdown', (e) => this.addRipple(e.clientX, e.clientY));

    this.createParticles();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addRipple(x, y) {
    this.ripples.push({
      x,
      y,
      radius: 5,
      maxRadius: 45,
      opacity: 0.95
    });
  }

  createParticles() {
    this.particles = [];
    const count = window.innerWidth < 480 ? 30 : 50;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 3.5 + 1.2,
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

    // 1. Render Floating Ambient Particles
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
      if (this.mode === 'lotus' || this.mode === 'flowers') {
        this.ctx.ellipse(p.x, p.y, p.radius * 2.2, p.radius, p.angle, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(244, 63, 94, ${currentOpacity * 0.75})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#f43f5e';
      } else if (this.mode === 'fireflies') {
        this.ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(217, 70, 239, ${currentOpacity})`;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = '#d946ef';
      } else {
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 215, 0, ${currentOpacity})`;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#ffd700';
      }
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Render Interactive Touch Ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      let r = this.ripples[i];
      r.radius += 1.8;
      r.opacity -= 0.025;

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
