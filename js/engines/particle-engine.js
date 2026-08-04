/**
 * 🌸 ParticleEngine
 * High performance 60 FPS HTML5 Canvas particle system.
 * Modes: lotus, sparkles, dust, fireflies, flowers
 */
export class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.mode = 'sparkles';
    this.glowColor = '#ffd700';
  }

  init(mode = 'sparkles', glowColor = 'rgba(255, 215, 0, 0.4)') {
    if (!this.canvas || !this.ctx) return;
    this.mode = mode;
    this.glowColor = glowColor;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.createParticles();
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const count = window.innerWidth < 480 ? 25 : 40;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2
      });
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.pulseSpeed;

      // Wrap around screen
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const currentOpacity = Math.abs(Math.sin(p.angle)) * p.opacity;

      this.ctx.save();
      this.ctx.beginPath();
      if (this.mode === 'lotus' || this.mode === 'flowers') {
        // Draw soft petal shape
        this.ctx.ellipse(p.x, p.y, p.radius * 2, p.radius, p.angle, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 119, 169, ${currentOpacity * 0.6})`;
      } else if (this.mode === 'fireflies') {
        this.ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(168, 85, 247, ${currentOpacity})`;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#c084fc';
      } else {
        // Golden dust / sparkles
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 215, 0, ${currentOpacity})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = '#ffd700';
      }
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.loop());
  }

  stop() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}
