/**
 * 🌸 RenderEngine
 * Renders background artwork (bg image.png) and clean glassmorphism UI with Misti image integration.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme } = state;

    // 1. Apply requested linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.85) 100%), url(./bg%20image.png)
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.85) 100%), url('./bg%20image.png')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center top';
    document.body.style.backgroundRepeat = 'no-repeat';

    if (activeTheme) {
      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    }

    // 2. Primary Greeting Title (Clean without emoji in message box)
    const cardGreetingEl = document.getElementById('cardGreeting');
    if (cardGreetingEl && greetingText) {
      // Strip emojis for clean message box title
      cardGreetingEl.textContent = greetingText.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
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
