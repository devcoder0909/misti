/**
 * 🌸 ParticleEngine
 * 60 FPS HTML5 Canvas particle physics system with ambient floating gold/pink petals and tactile haptic tap bursts.
 */
export class ParticleEngine {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.init();
  }

  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Spawn initial ambient floating gold & pink petals
    for (let i = 0; i < 35; i++) {
      this.particles.push(this.createAmbientParticle());
    }

    // Tactile Haptic Petal Burst on Tap / Click
    window.addEventListener('pointerdown', (e) => {
      this.spawnTapPetalBurst(e.clientX, e.clientY);
    });

    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createAmbientParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.4 ? '#ffd700' : '#f43f5e',
      pulse: Math.random() * Math.PI,
      spin: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.02,
      isPetal: Math.random() > 0.5
    };
  }

  /**
   * Tactile Haptic Petal Burst on Touch/Click
   */
  spawnTapPetalBurst(x, y) {
    // Try haptic vibration if supported
    if (navigator.vibrate) {
      try { navigator.vibrate(15); } catch(e) {}
    }

    // Spawn 14 glowing burst petals
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 / 14) * i + (Math.random() * 0.3);
      const speed = Math.random() * 3 + 1.5;

      this.particles.push({
        x: x,
        y: y,
        radius: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 1,
        color: Math.random() > 0.3 ? '#ffd700' : '#d946ef',
        pulse: 0,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.08,
        isPetal: true,
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.speedX;
      p.y += p.speedY;
      p.spin += p.spinSpeed;

      // Handle burst particles decaying
      if (p.life !== undefined) {
        p.life -= p.decay;
        p.opacity = Math.max(0, p.life);
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      } else {
        // Reset ambient particles floating off top screen
        if (p.y < -10) {
          p.y = this.canvas.height + 10;
          p.x = Math.random() * this.canvas.width;
        }
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.spin);
      this.ctx.globalAlpha = p.opacity;

      if (p.isPetal) {
        // Draw 3D Lotus Petal Shape
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.radius * 1.5, p.radius * 0.8, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Inner Petal Highlight
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = p.opacity * 0.4;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.radius * 0.8, p.radius * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw Sparkle Orbs
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}
