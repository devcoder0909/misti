/**
 * 🌸 RenderEngine
 * Renders background artwork, glassmorphism UI, 48px Misti profile, liquid silk reveal, and 5s mantra sync.
 */
export class RenderEngine {
  constructor() {
    this.currentIndex = 0; // 0 = Jagannath (BG1), 1 = Bajrangbali (BG2)
    this.hasTyped = false;
    this.preloadBackgrounds();
    this.initSynchronizedCarousel();
    this.initSplashScreen();
  }

  /**
   * Smooth Full-Screen Black Luxurious Splash Transition Overlay
   */
  initSplashScreen() {
    const splash = document.getElementById('splashScreen');
    if (!splash) return;

    // Smoothly dissolve splash screen after 1.8 seconds
    setTimeout(() => {
      splash.classList.add('splash-hidden');
      setTimeout(() => {
        if (splash && splash.parentNode) {
          splash.parentNode.removeChild(splash);
        }
      }, 1200);
    }, 1800);
  }

  /**
   * Preload & Pre-decode background images cleanly to prevent initial load pop-in
   */
  async preloadBackgrounds() {
    const bg1 = document.getElementById('bgLayer1');
    const bg2 = document.getElementById('bgLayer2');

    if (!bg1 || !bg2) return;

    try {
      const img1 = new Image();
      img1.src = './bg%20image.png';
      if (img1.decode) await img1.decode();

      const img2 = new Image();
      img2.src = './bg2%20image.png';
      if (img2.decode) await img2.decode();

      bg1.classList.add('bg-loaded');
      bg2.classList.add('bg-loaded');
    } catch (err) {
      if (bg1) bg1.classList.add('bg-loaded');
      if (bg2) bg2.classList.add('bg-loaded');
    }
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

    // 3. TODAY'S THOUGHT Sub-column
    if (selectedThought) {
      const thoughtBodyEl = document.getElementById('thoughtBody');
      if (thoughtBodyEl) {
        thoughtBodyEl.textContent = selectedThought.text;
      }
    }

    // 4. DAILY GUIDANCE Sub-column
    if (selectedGuidance) {
      const guidanceBodyEl = document.getElementById('guidanceBody');
      if (guidanceBodyEl) {
        guidanceBodyEl.textContent = selectedGuidance.text;
      }
    }

    // 5. Primary Message Box Thought: Ultra-Smooth Liquid Silk Reveal
    if (!this.hasTyped && selectedThought) {
      this.hasTyped = true;
      const primaryThoughtEl = document.getElementById('primaryThought');
      if (primaryThoughtEl) {
        primaryThoughtEl.textContent = selectedThought.text;
        this.liquidSilkReveal(primaryThoughtEl);
      }
    }
  }

  /**
   * Ultra-Smooth 60 FPS Liquid Silk Fade & Soft Blur Reveal
   */
  liquidSilkReveal(element) {
    if (!element) return;
    element.classList.remove('liquid-silk-active');
    
    // Force Reflow for GPU Re-trigger
    void element.offsetWidth;
    
    requestAnimationFrame(() => {
      element.classList.add('liquid-silk-active');
    });
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
