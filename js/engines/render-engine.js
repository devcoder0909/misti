/**
 * 🌸 RenderEngine
 * Updates DOM components smoothly matching the exact reference layout without layout thrashing.
 */
export class RenderEngine {
  render(state) {
    const { greetingText, selectedThought, selectedGuidance, selectedIllustration, activeTheme, date } = state;

    // 1. Update Sky & Background with jaga.png + Dynamic Time Gradient Overlay
    if (activeTheme) {
      document.body.style.backgroundImage = `${activeTheme.bgGradient}, url('jaga.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';

      document.documentElement.style.setProperty('--glow-color', activeTheme.glowColor);
      document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
      document.documentElement.style.setProperty('--glass-border', activeTheme.glassBorder);
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

    // 5. Render Multi-Layer SVG Divine Illustration Stage
    const svgStage = document.getElementById('svgStage');
    if (svgStage && selectedIllustration && selectedIllustration.layers) {
      svgStage.innerHTML = `
        <svg viewBox="0 0 400 300" class="divine-svg-graphic" aria-label="${selectedIllustration.name}">
          <defs>
            <radialGradient id="goldHaloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffd700" stop-opacity="0.95"/>
              <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.45"/>
              <stop offset="100%" stop-color="#ffd700" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="saffronHaloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fb923c" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="pinkHaloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#f472b6" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#e11d48" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <g class="layer-halo">${selectedIllustration.layers.halo || ''}</g>
          <g class="layer-artwork">${selectedIllustration.layers.artwork || ''}</g>
          <g class="layer-mist">${selectedIllustration.layers.mist || ''}</g>
        </svg>
      `;
    }
  }
}
