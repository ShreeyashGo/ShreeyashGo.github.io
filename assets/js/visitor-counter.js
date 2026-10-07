/* Approximate visits, once per tab session. No cross-session visitor identifier. */
(() => {
    'use strict';
    const script = document.querySelector('script[data-visitor-counter]');
    if (!script || window.location.origin !== 'https://shreeyashgo.github.io') return;
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
    let endpoint;
    try {
        endpoint = new URL(script.dataset.endpoint);
        if (endpoint.protocol !== 'https:') return;
    } catch (_) { return; }
    const key = 'portfolio-visit-recorded-v1';
    try {
        if (sessionStorage.getItem(key)) return;
        // Mark before sending so a navigation does not start a second request.
        sessionStorage.setItem(key, '1');
    } catch (_) {
        // Skip recording when storage is blocked, instead of counting every pageview.
        return;
    }
    fetch(`${endpoint.origin}/hit`, {method: 'POST', credentials: 'omit', keepalive: true,
        referrerPolicy: 'no-referrer'}).then(response => {
        if (!response.ok) throw new Error('Counter unavailable');
    }).catch(() => {
        try { sessionStorage.removeItem(key); } catch (_) { /* Storage is optional. */ }
    });
})();
