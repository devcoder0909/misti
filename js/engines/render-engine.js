/**
 * 🌸 RenderEngine
 * Renders full-res background artwork (jaga.png) and clean glassmorphism UI.
 * Synthetic SVG illustration models removed as requested.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme, date } = state;

    // 1. Apply High-Res Divine Image (jaga.png) with Subtle Atmospheric Gradient
    if (activeTheme) {
      document.body.style.backgroundImage = `${activeTheme.bgGradient}, url('jaga.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';

      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    } else {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(12, 6, 26, 0.4) 0%, rgba(12, 6, 26, 0.85) 100%), url('jaga.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
    }

    // 2. Header & Primary Greeting Title
    const greetingEl = document.getElementById('greetingText');
    if (greetingEl && greetingText) {
      greetingEl.textContent = greetingText;
    }

    // 3. Primary Card Thought Text & Sub-column Thought Body
    if (selectedThought) {
      const primaryThoughtEl = document.getElementById('primaryThought');
      if (primaryThoughtEl) {
        primaryThoughtEl.textContent = selectedThought.text;
      }
      const thoughtBodyEl = document.getElementById('thoughtBody');
      if (thoughtBodyEl) {
        thoughtBodyEl.textContent = selectedThought.text;
        thoughtBodyEl.className = `column-body font-${selectedThought.language}`;
      }
    }

    // 4. Sub-column Guidance Body
    if (selectedGuidance) {
      const guidanceBodyEl = document.getElementById('guidanceBody');
      if (guidanceBodyEl) {
        guidanceBodyEl.textContent = selectedGuidance.text;
        guidanceBodyEl.className = `column-body font-${selectedGuidance.language}`;
      }
    }
  }
}
