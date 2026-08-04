/**
 * 🌸 RenderEngine
 * Renders background artwork, glassmorphism UI, 48px Misti profile, and synchronized Odia mantra switching.
 */
export class RenderEngine {
  constructor() {
    this.initMantraSync();
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
   * Synchronizes Odia Mantra Badge with 5-Second Background Image Slide Cycle
   * Swaps between ଜୟ ଜଗନ୍ନାଥ (BG1) and ଜୟ ବଜରଙ୍ଗବଲୀ (BG2) every 5 seconds.
   */
  initMantraSync() {
    const mantraEl = document.getElementById('odiaMantra');
    if (!mantraEl) return;

    // Set initial text matching BG1 (Jagannath)
    mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';

    // 5-second interval cycle matching 5s bg image slide
    setInterval(() => {
      mantraEl.style.opacity = '0';

      setTimeout(() => {
        if (mantraEl.textContent.trim() === 'ଜୟ ଜଗନ୍ନାଥ') {
          mantraEl.textContent = 'ଜୟ ବଜରଙ୍ଗବଲୀ';
        } else {
          mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
        }
        mantraEl.style.opacity = '1';
      }, 500);

    }, 5000); // Swaps exactly every 5 seconds
  }
}
