/**
 * 🌸 PWAEngine
 * Handles ServiceWorker registration and full PWA App Installability ("Install Misti App" banner).
 */
export class PWAEngine {
  constructor() {
    this.deferredPrompt = null;
    this.initPWA();
  }

  initPWA() {
    // 1. Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then((reg) => console.log('[PWAEngine] ServiceWorker registered with scope:', reg.scope))
          .catch((err) => console.error('[PWAEngine] ServiceWorker registration failed:', err));
      });
    }

    // 2. Capture beforeinstallprompt for PWA Installation Banner
    const installBtn = document.getElementById('pwaInstallBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (installBtn) {
        installBtn.classList.remove('hidden');
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`[PWAEngine] User response to install prompt: ${outcome}`);
        this.deferredPrompt = null;
        installBtn.classList.add('hidden');
      });
    }

    window.addEventListener('appinstalled', () => {
      console.log('[PWAEngine] Misti App successfully installed!');
      if (installBtn) installBtn.classList.add('hidden');
    });
  }
}
