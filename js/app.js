if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("✅ Service Worker enregistré"))
    .catch(err => console.error("❌ Service Worker erreur", err));
}
