import { AppEngine } from './engines/app-engine.js';
import { ThemeEngine } from './engines/theme-engine.js';
import { ContentEngine } from './engines/content-engine.js';
import { GreetingEngine } from './engines/greeting-engine.js';
import { FestivalEngine } from './engines/festival-engine.js';
import { IllustrationEngine } from './engines/illustration-engine.js';
import { ParticleEngine } from './engines/particle-engine.js';
import { AnimationEngine } from './engines/animation-engine.js';
import { RenderEngine } from './engines/render-engine.js';
import { PWAEngine } from './engines/pwa-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppEngine();

  // Register Independent Engines
  app.registerEngine('theme', new ThemeEngine());
  app.registerEngine('content', new ContentEngine());
  app.registerEngine('greeting', new GreetingEngine());
  app.registerEngine('festival', new FestivalEngine());
  app.registerEngine('illustration', new IllustrationEngine());
  app.registerEngine('particle', new ParticleEngine('particleCanvas'));
  app.registerEngine('animation', new AnimationEngine());
  app.registerEngine('render', new RenderEngine());
  app.registerEngine('pwa', new PWAEngine());

  // Launch Divine Experience
  app.init();
});
