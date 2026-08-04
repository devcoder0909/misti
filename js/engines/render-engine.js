/**
 * 🌸 RenderEngine
 * Renders full-res background artwork (bg image.png) with crystal clear visibility and glassmorphism UI.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme } = state;

    // 1. Apply Translucent Atmosphere Gradient over bg image.png
    if (activeTheme) {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(6, 2, 14, 0.18) 0%, rgba(6, 2, 14, 0.72) 100%), url('./bg%20image.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';

      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    } else {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(6, 2, 14, 0.18) 0%, rgba(6, 2, 14, 0.72) 100%), url('./bg%20image.png')`;
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
