/**
 * 🌸 RenderEngine
 * Renders background artwork, glassmorphism UI, 48px Misti profile, and rock-solid synchronized 5s background/mantra rotation.
 */
export class RenderEngine {
  constructor() {
    this.currentIndex = 0; // 0 = Jagannath (BG1), 1 = Bajrangbali (BG2)
    this.initSynchronizedCarousel();
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
   * Deterministic, Ultra-Smooth 5-Second Carousel Engine
   * Crossfades BG1 (bg image.png) & BG2 (bg2 image.png) and Odia Mantras in 100% Perfect Sync.
   */
  initSynchronizedCarousel() {
    const bg1 = document.getElementById('bgLayer1');
    const bg2 = document.getElementById('bgLayer2');
    const mantraEl = document.getElementById('odiaMantra');

    if (!bg1 || !bg2 || !mantraEl) return;

    // Initial State: BG1 active, Mantra = ଜୟ ଜଗନ୍ନାଥ
    bg1.style.opacity = '1';
    bg2.style.opacity = '0';
    mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
    mantraEl.style.opacity = '1';

    setInterval(() => {
      if (this.currentIndex === 0) {
        // Switch to BG2 (Lord Hanuman) & ଜୟ ବଜରଙ୍ଗବଲୀ
        bg1.style.opacity = '0';
        bg2.style.opacity = '1';
        
        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ବଜରଙ୍ଗବଲୀ';
          mantraEl.style.opacity = '1';
        }, 500);

        this.currentIndex = 1;
      } else {
        // Switch to BG1 (Lord Jagannath) & ଜୟ ଜଗନ୍ନାଥ
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';

        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
          mantraEl.style.opacity = '1';
        }, 500);

        this.currentIndex = 0;
      }
    }, 5000); // Toggles cleanly every 5 seconds
  }
}
