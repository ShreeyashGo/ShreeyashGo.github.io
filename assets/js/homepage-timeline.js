(function () {
    'use strict';
    var wrapper = document.querySelector('[data-homepage-timeline]');
    if (!wrapper) return;
    var timeline = wrapper.querySelector('.timeline-desktop');
    var button = wrapper.querySelector('[data-timeline-top]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateButton() {
        var hide = timeline.scrollTop < 60;
        if (button.hidden !== hide) button.hidden = hide;
    }
    timeline.addEventListener('scroll', updateButton, { passive: true });
    button.addEventListener('click', function () {
        timeline.focus({ preventScroll: true });
        timeline.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
    updateButton();
})();
