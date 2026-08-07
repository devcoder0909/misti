/**
 * 🌸 PWAEngine
 * Handles Progressive Web App lifecycle, service worker caching, and offline support.
 */
export class PWAEngine {
  init() {
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
          .then(registration => {
            console.log('[PWAEngine] ServiceWorker registered successfully');
            this.setupPushNotifications(registration);
          })
          .catch(err => {
            console.log('[PWAEngine] ServiceWorker registration failed: ', err);
          });
      });
    }
  }

  async setupPushNotifications(registration) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted' && window.firebaseMessaging) {
        console.log('[PWAEngine] Notification permission granted.');
        // Firebase Cloud Messaging Web Push needs a VAPID key pair for getting a token without an error.
        // We will try without VAPID first, if it fails, the user will need to generate one.
        const token = await window.firebaseGetToken(window.firebaseMessaging, {
          serviceWorkerRegistration: registration,
          vapidKey: 'BCmFMynsC95HnYF8X9upy-WSA055XHZolQXJAjVAF8q62c6qBzTHwGWwP5AUv2Lcc-LnPFEX2FyIUW0I_bkru1k'
        });
        
        if (token) {
          console.log('%c[FIREBASE TOKEN]', 'color: #00ff00; font-size: 16px; font-weight: bold;', token);
          // In a real app, save this token to your database.
        }
      }
    } catch (err) {
      console.error('[PWAEngine] Push setup failed (you may need a VAPID key in Firebase Console -> Cloud Messaging):', err);
    }
  }
}
