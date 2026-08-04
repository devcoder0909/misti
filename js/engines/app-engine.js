/**
 * 🌸 AppEngine Core Orchestrator
 * Manages initialization, state synchronization, and engine execution.
 */
export class AppEngine {
  constructor() {
    this.state = {
      date: new Date(),
      tokens: null,
      greetings: null,
      thoughts: null,
      guidance: null,
      festivals: null,
      themes: null,
      illustrations: null,
      activeFestival: null,
      activeTheme: null,
      selectedThought: null,
      selectedGuidance: null,
      selectedIllustration: null,
      greetingText: ""
    };
    this.engines = {};
  }

  registerEngine(name, engineInstance) {
    this.engines[name] = engineInstance;
  }

  async loadData() {
    try {
      const [tokens, greetings, thoughts, guidance, festivals, themes, illustrations] = await Promise.all([
        fetch('data/design-tokens.json').then(res => res.json()),
        fetch('data/greetings.json').then(res => res.json()),
        fetch('data/thoughts.json').then(res => res.json()),
        fetch('data/guidance.json').then(res => res.json()),
        fetch('data/festivals.json').then(res => res.json()),
        fetch('data/themes.json').then(res => res.json()),
        fetch('data/illustrations.json').then(res => res.json())
      ]);

      this.state.tokens = tokens;
      this.state.greetings = greetings;
      this.state.thoughts = thoughts;
      this.state.guidance = guidance;
      this.state.festivals = festivals;
      this.state.themes = themes;
      this.state.illustrations = illustrations;
    } catch (err) {
      console.error("AppEngine Data Load Error:", err);
    }
  }

  async init() {
    await this.loadData();

    // 1. Detect Festival
    if (this.engines.festival) {
      this.state.activeFestival = this.engines.festival.detect(this.state.date, this.state.festivals);
    }

    // 2. Resolve Theme
    if (this.engines.theme) {
      this.state.activeTheme = this.engines.theme.resolve(this.state.date, this.state.activeFestival, this.state.themes);
    }

    // 3. Resolve Greeting
    if (this.engines.greeting) {
      this.state.greetingText = this.engines.greeting.resolve(this.state.date, this.state.activeFestival, this.state.greetings);
    }

    // 4. Resolve Content Deterministically
    if (this.engines.content) {
      const content = this.engines.content.select(this.state.date, this.state.activeFestival, this.state.thoughts, this.state.guidance);
      this.state.selectedThought = content.thought;
      this.state.selectedGuidance = content.guidance;
    }

    // 5. Resolve Illustration
    if (this.engines.illustration) {
      this.state.selectedIllustration = this.engines.illustration.resolve(this.state.activeFestival, this.state.illustrations);
    }

    // 6. Apply Animation Presets
    if (this.engines.animation) {
      this.engines.animation.applyPreset(this.state.activeTheme.preset);
    }

    // 7. Start Particle Canvas Engine
    if (this.engines.particle) {
      this.engines.particle.init(this.state.activeTheme.particleType, this.state.activeTheme.glowColor);
    }

    // 8. Render Engine updates DOM
    if (this.engines.render) {
      this.engines.render.render(this.state);
    }

    // 9. PWA Engine registration
    if (this.engines.pwa) {
      this.engines.pwa.init();
    }
  }
}
