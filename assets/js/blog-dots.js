/* Decorative hover enhancement: no timer or continuous animation loop. */
(function () {
    'use strict';
    var visual = document.querySelector('[data-blog-dots]');
    if (!visual || !window.matchMedia('(any-hover: hover)').matches) return;

    var canvas = visual.querySelector('canvas');
    var fallback = visual.querySelector('img');
    var context = canvas.getContext('2d');
    if (!context) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var points = [];
    var pointer = null;
    var frame = null;
    var width = 600;
    var height = 340;
    var radius = 75;

    // The same wave geometry as the static SVG fallback.
    for (var row = 0; row < 25; row++) {
        for (var col = 0; col < 47; col++) {
            var u = col * 12.3 + 17;
            var v = row * 12.1 + 24;
            var wave = (Math.sin(u / 65 + v / 42) + 1) / 2;
            var edge = Math.exp(-(Math.pow((u - 300) / 280, 4) + Math.pow((v - 170) / 155, 4)));
            points.push({
                x: u + 7 * Math.sin(v / 35 + u / 75),
                y: v + 14 * Math.sin(u / 63 + v / 91),
                radius: 0.65 + 0.65 * wave,
                opacity: 0.18 + 0.65 * edge * wave
            });
        }
    }

    function draw() {
        frame = null;
        context.clearRect(0, 0, width, height);
        context.fillStyle = '#3a6351';
        points.forEach(function (point) {
            var x = point.x;
            var y = point.y;
            var strength = 0;
            if (pointer) {
                var dx = x - pointer.x;
                var dy = y - pointer.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                strength = Math.pow(Math.max(0, 1 - distance / radius), 2);
                if (!reducedMotion.matches && distance > 0) {
                    x += dx / distance * strength * 18;
                    y += dy / distance * strength * 18;
                }
            }
            context.globalAlpha = Math.min(1, point.opacity + strength * 0.4);
            context.beginPath();
            context.arc(x, y, point.radius, 0, Math.PI * 2);
            context.fill();
        });
        context.globalAlpha = 1;
    }

    function scheduleDraw() {
        if (frame === null) frame = window.requestAnimationFrame(draw);
    }

    function resize() {
        var displayedWidth = visual.getBoundingClientRect().width;
        if (!displayedWidth) return;
        var scale = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(displayedWidth * scale);
        canvas.height = Math.round(displayedWidth * height / width * scale);
        context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
        scheduleDraw();
    }

    canvas.hidden = false;
    fallback.hidden = true;
    resize();
    if (window.ResizeObserver) {
        new ResizeObserver(resize).observe(visual);
    } else {
        window.addEventListener('resize', resize);
    }

    canvas.addEventListener('pointermove', function (event) {
        if (event.pointerType === 'touch') return;
        var bounds = canvas.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        pointer = {
            x: (event.clientX - bounds.left) / bounds.width * width,
            y: (event.clientY - bounds.top) / bounds.height * height
        };
        scheduleDraw();
    });
    canvas.addEventListener('pointerleave', function () {
        pointer = null;
        scheduleDraw();
    });
    reducedMotion.addEventListener('change', scheduleDraw);
})();
