/**
 * 🌸 RenderEngine
 * Renders background artwork, clean glassmorphism UI, 45px Misti profile, and dynamic Odia mantra switching.
 */
export class RenderEngine {
  constructor() {
    this.initMantraRotation();
  }

  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme } = state;

    if (activeTheme) {
      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    }

    // 1. Primary Greeting Title (Clean without emoji in message box)
    const cardGreetingEl = document.getElementById('cardGreeting');
    if (cardGreetingEl && greetingText) {
      cardGreetingEl.textContent = greetingText.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    }

    // 2. Primary Card Thought Text & Sub-column Thought Body
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

    // 3. Sub-column Guidance Body
    if (selectedGuidance) {
      const guidanceBodyEl = document.getElementById('guidanceBody');
      if (guidanceBodyEl) {
        guidanceBodyEl.textContent = selectedGuidance.text;
        guidanceBodyEl.className = `column-body font-${selectedGuidance.language}`;
      }
    }
  }

  /**
   * Dynamic Odia Mantra Switcher
   * Swaps between ଜୟ ଜଗନ୍ନାଥ (BG1) and ଜୟ ବଜରଙ୍ଗବଲୀ (BG2) in sync with 30s background rotation
   */
  initMantraRotation() {
    const mantraEl = document.getElementById('odiaMantra');
    if (!mantraEl) return;

    // Toggle every 15 seconds in sync with background crossfade
    setInterval(() => {
      if (mantraEl.textContent.trim() === 'ଜୟ ଜଗନ୍ନାଥ') {
        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ବଜରଙ୍ଗବଲୀ';
          mantraEl.style.opacity = '1';
        }, 600);
      } else {
        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
          mantraEl.style.opacity = '1';
        }, 600);
      }
    }, 15000);
  }
}
