/**
 * 🌸 PWAEngine
 * Handles Progressive Web App lifecycle, service worker caching, and offline support.
 */
export class PWAEngine {
  init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then(reg => console.log('ServiceWorker registered:', reg.scope))
          .catch(err => console.error('ServiceWorker failed:', err));
      });
    }
  }
}
