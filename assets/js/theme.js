/* Resolve the theme before styles load, then wire the shared navigation toggle. */
(function () {
    'use strict';
    var root = document.documentElement;
    var preference = window.matchMedia('(prefers-color-scheme: dark)');
    var storageKey = 'site-theme';
    var saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (_) { /* Storage is optional. */ }
    if (saved !== 'light' && saved !== 'dark') saved = null;

    function apply(theme) {
        root.dataset.theme = theme;
        document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
            toggle.hidden = false;
            toggle.setAttribute('aria-pressed', String(theme === 'dark'));
            toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            toggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        });
        document.dispatchEvent(new CustomEvent('themechange', {detail: {theme: theme}}));
    }
    function currentTheme() { return saved || (preference.matches ? 'dark' : 'light'); }
    apply(currentTheme());

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                saved = root.dataset.theme === 'dark' ? 'light' : 'dark';
                try { localStorage.setItem(storageKey, saved); } catch (_) { /* Keep the choice for this page. */ }
                apply(saved);
            });
        });
        apply(currentTheme());
    });
    preference.addEventListener('change', function () { if (!saved) apply(currentTheme()); });
    window.addEventListener('storage', function (event) {
        if (event.key !== storageKey && event.key !== null) return;
        saved = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
        apply(currentTheme());
    });
})();
