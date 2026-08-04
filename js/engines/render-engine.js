/**
 * 🌸 RenderEngine
 * Renders full-res background artwork (jaga.png) and clean glassmorphism UI.
 * Implements smooth handwritten letter typewriter reveal animation.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme } = state;

    // 1. Apply Background Image with Smooth Atmospheric Breathing Overlay (No Harsh Slide)
    if (activeTheme) {
      document.body.style.backgroundImage = `${activeTheme.bgGradient}, url('jaga.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';

      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    } else {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(12, 6, 26, 0.45) 0%, rgba(12, 6, 26, 0.88) 100%), url('jaga.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
    }

    // 2. Header & Primary Greeting Title
    const greetingEl = document.getElementById('greetingText');
    if (greetingEl && greetingText) {
      greetingEl.textContent = greetingText;
    }

    // 3. Handwritten Letter Typewriter Reveal for Thought & Guidance
    if (selectedThought) {
      const primaryThoughtEl = document.getElementById('primaryThought');
      if (primaryThoughtEl) {
        this.typewriter(primaryThoughtEl, selectedThought.text, 25);
      }
      const thoughtBodyEl = document.getElementById('thoughtBody');
      if (thoughtBodyEl) {
        thoughtBodyEl.className = `column-body font-${selectedThought.language}`;
        this.typewriter(thoughtBodyEl, selectedThought.text, 25);
      }
    }

    if (selectedGuidance) {
      const guidanceBodyEl = document.getElementById('guidanceBody');
      if (guidanceBodyEl) {
        guidanceBodyEl.className = `column-body font-${selectedGuidance.language}`;
        this.typewriter(guidanceBodyEl, selectedGuidance.text, 25);
      }
    }
  }

  /**
   * Smooth Handwritten Letter Typewriter Effect
   */
  typewriter(element, text, speed = 25) {
    if (!element || !text) return;
    element.textContent = "";
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
}
