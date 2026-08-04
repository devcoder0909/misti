/**
 * 🌸 RenderEngine
 * Updates DOM components smoothly matching the exact reference layout without layout thrashing.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme, date } = state;

    // 1. Update Background with bg image.png + Dynamic Time Gradient Overlay
    if (activeTheme) {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(12, 6, 26, 0.35) 0%, rgba(12, 6, 26, 0.85) 100%), url('./bg%20image.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';

      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    } else {
      document.body.style.backgroundImage = `linear-gradient(180deg, rgba(12, 6, 26, 0.35) 0%, rgba(12, 6, 26, 0.85) 100%), url('./bg%20image.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center top';
    }

    // 2. Header & Primary Greeting Title
    const greetingEl = document.getElementById('greetingText');
    if (greetingEl && greetingText) {
      greetingEl.textContent = greetingText;
    }

    const cardGreetingEl = document.getElementById('cardGreeting');
    if (cardGreetingEl && greetingText) {
      cardGreetingEl.textContent = greetingText;
    }

    // Date Badge
    const dateEl = document.getElementById('dateBadge');
    if (dateEl) {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      dateEl.textContent = date.toLocaleDateString('en-US', options);
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
