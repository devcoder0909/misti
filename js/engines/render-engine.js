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
   * Synchronizes Odia Mantra Badge with BG1 (Jagannath) vs BG2 (Hanuman) Crossfade Cycle
   * 30-Second Alternate Cycle: 0-14s -> Jagannath, 15-29s -> Bajrangbali
   */
  initMantraSync() {
    const mantraEl = document.getElementById('odiaMantra');
    if (!mantraEl) return;

    // Set initial text matching BG1 (Jagannath)
    mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';

    // 30-second interval cycle matching bgRotateCrossfade 30s alternate loop
    setInterval(() => {
      // Fade out
      mantraEl.style.opacity = '0';

      setTimeout(() => {
        if (mantraEl.textContent.trim() === 'ଜୟ ଜଗନ୍ନାଥ') {
          mantraEl.textContent = 'ଜୟ ବଜରଙ୍ଗବଲୀ';
        } else {
          mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
        }
        // Fade in
        mantraEl.style.opacity = '1';
      }, 800);

    }, 15000); // Swaps at 15s mark in sync with 30s bg crossfade
  }
}
