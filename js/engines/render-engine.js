/**
 * 🌸 RenderEngine
 * Renders background artwork, glassmorphism UI, 48px Misti profile, serene typewriter, and 5s mantra sync.
 */
export class RenderEngine {
  constructor() {
    this.currentIndex = 0; // 0 = Jagannath (BG1), 1 = Bajrangbali (BG2)
    this.hasTyped = false;
    this.initSynchronizedCarousel();
  }

  render(state) {
    const { greetingText, selectedThought, selectedGuidance, activeTheme, date } = state;

    if (activeTheme) {
      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
    }

    // 1. Dynamic Day & Date
    const currentDate = date || new Date();
    const headerDateEl = document.getElementById('headerDate');
    if (headerDateEl) {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      headerDateEl.textContent = currentDate.toLocaleDateString('en-US', options);
    }

    // 2. Greeting Title
    const cardGreetingEl = document.getElementById('cardGreeting');
    if (cardGreetingEl && greetingText) {
      cardGreetingEl.textContent = greetingText.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    }

    // 3. TODAY'S THOUGHT Sub-column (Renders Immediately & Reliably)
    if (selectedThought) {
      const thoughtBodyEl = document.getElementById('thoughtBody');
      if (thoughtBodyEl) {
        thoughtBodyEl.textContent = selectedThought.text;
      }
    }

    // 4. DAILY GUIDANCE Sub-column (Renders Immediately & Reliably)
    if (selectedGuidance) {
      const guidanceBodyEl = document.getElementById('guidanceBody');
      if (guidanceBodyEl) {
        guidanceBodyEl.textContent = selectedGuidance.text;
      }
    }

    // 5. Primary Message Box Thought: Serene Typewriter Animation (45ms)
    if (!this.hasTyped && selectedThought) {
      this.hasTyped = true;
      const primaryThoughtEl = document.getElementById('primaryThought');
      if (primaryThoughtEl) {
        this.typewriter(primaryThoughtEl, selectedThought.text, 45);
      }
    }
  }

  /**
   * Serene typewriter animation for primary message box
   */
  typewriter(element, text, speed = 45) {
    if (!element || !text) return;
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  /**
   * Deterministic, Ultra-Smooth 5-Second Carousel Engine
   */
  initSynchronizedCarousel() {
    const bg1 = document.getElementById('bgLayer1');
    const bg2 = document.getElementById('bgLayer2');
    const mantraEl = document.getElementById('odiaMantra');

    if (!bg1 || !bg2 || !mantraEl) return;

    bg1.style.opacity = '1';
    bg2.style.opacity = '0';
    mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
    mantraEl.style.opacity = '1';

    setInterval(() => {
      if (this.currentIndex === 0) {
        bg1.style.opacity = '0';
        bg2.style.opacity = '1';
        
        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ବଜରଙ୍ଗବଲୀ';
          mantraEl.style.opacity = '1';
        }, 500);

        this.currentIndex = 1;
      } else {
        bg1.style.opacity = '1';
        bg2.style.opacity = '0';

        mantraEl.style.opacity = '0';
        setTimeout(() => {
          mantraEl.textContent = 'ଜୟ ଜଗନ୍ନାଥ';
          mantraEl.style.opacity = '1';
        }, 500);

        this.currentIndex = 0;
      }
    }, 5000);
  }
}
