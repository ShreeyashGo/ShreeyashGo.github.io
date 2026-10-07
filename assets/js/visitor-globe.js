/* A small orthographic canvas globe. Local map data; no tracking or third-party runtime. */
(() => {
    'use strict';
    const root = document.querySelector('[data-visitor-globe]');
    if (!root) return;
    const canvas = root.querySelector('canvas');
    const context = canvas.getContext('2d');
    const pauseButton = root.querySelector('[data-globe-pause]');
    const resetButton = root.querySelector('[data-globe-reset]');
    const status = root.querySelector('[data-globe-status]');
    const locationLabel = root.querySelector('[data-globe-location]');
    if (!context) {
        status.textContent = 'The globe is unavailable in this browser. Thanks for visiting!';
        pauseButton.disabled = resetButton.disabled = true;
        return;
    }

    const radians = Math.PI / 180;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let longitude = -25, latitude = 20, size = 420;
    let land = [], locations = [], targets = [];
    let loaded = false, loading = false, inView = false;
    let paused = reducedMotion.matches, dragging = false, pointer = null;
    let frame = null, previousTime = null, playTime = 0;

    // A seated cat silhouette, sampled once into a reusable dot matrix.
    const catShape = new Path2D();
    catShape.moveTo(49, 73);
    catShape.lineTo(81, 75);
    catShape.bezierCurveTo(84, 99, 76, 130, 82, 162);
    catShape.bezierCurveTo(109, 160, 110, 174, 90, 174);
    catShape.lineTo(30, 174);
    catShape.bezierCurveTo(12, 172, 10, 145, 25, 129);
    catShape.bezierCurveTo(38, 112, 39, 98, 49, 73);
    catShape.closePath();
    catShape.moveTo(93, 52);
    catShape.ellipse(61, 52, 32, 29, 0, 0, Math.PI * 2);
    catShape.moveTo(35, 43);
    catShape.lineTo(35, 23);
    catShape.quadraticCurveTo(35, 18, 40, 22);
    catShape.lineTo(53, 30);
    catShape.closePath();
    catShape.moveTo(72, 30);
    catShape.lineTo(85, 22);
    catShape.quadraticCurveTo(90, 18, 90, 24);
    catShape.lineTo(89, 44);
    catShape.closePath();

    const pawShape = new Path2D();
    pawShape.moveTo(0, 0);
    pawShape.bezierCurveTo(14, 8, 24, -2, 31, -13);
    pawShape.lineTo(50, -42);
    pawShape.bezierCurveTo(51, -51, 56, -58, 64, -56);
    pawShape.bezierCurveTo(72, -54, 72, -45, 66, -39);
    pawShape.bezierCurveTo(54, -31, 49, -17, 41, -5);
    pawShape.bezierCurveTo(29, 13, 16, 21, 5, 14);
    pawShape.closePath();

    const tailShape = new Path2D();
    tailShape.moveTo(27, 160);
    tailShape.bezierCurveTo(-4, 163, -5, 126, 12, 120);
    tailShape.bezierCurveTo(28, 114, 30, 136, 16, 134);
    const tailDots = [];
    context.lineWidth = 7;
    for (let y = 114; y <= 165; y += 3.2) {
        for (let x = -3; x <= 31; x += 3.2) {
            if (context.isPointInStroke(tailShape, x, y)) tailDots.push([x, y]);
        }
    }
    context.lineWidth = 1;

    function sampleShape(shape, bounds, eyeHole = false) {
        const dots = [];
        for (let y = bounds[1]; y <= bounds[3]; y += 3.2) {
            for (let x = bounds[0]; x <= bounds[2]; x += 3.2) {
                if (!context.isPointInPath(shape, x, y)) continue;
                if (eyeHole && (Math.hypot(x - 48, y - 49) < 4.5 || Math.hypot(x - 73, y - 49) < 4.5 ||
                    ((x - 61) / 12) ** 2 + ((y - 64) / 8) ** 2 < 1)) continue;
                const edge = [[-2, 0], [2, 0], [0, -2], [0, 2]].some(([dx, dy]) =>
                    !context.isPointInPath(shape, x + dx, y + dy));
                dots.push([x, y, edge]);
            }
        }
        return dots;
    }
    const catDots = sampleShape(catShape, [10, 10, 122, 175], true);
    const pawDots = sampleShape(pawShape, [0, -58, 73, 21]);

    function dot(x, y, radius = 1.05) {
        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, Math.PI * 2);
    }
    function dottedLine(x1, y1, x2, y2) {
        const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 3.2);
        for (let i = 0; i <= steps; i++) dot(x1 + (x2 - x1) * i / steps, y1 + (y2 - y1) * i / steps, .9);
    }
    function fillDots(dots) {
        for (const edge of [false, true]) {
            context.beginPath();
            for (const [x, y, boundary] of dots) {
                if (boundary === edge) dot(x, y, edge ? 1.15 : .8);
            }
            context.fillStyle = edge ? '#5f785f' : '#92a192';
            context.fill();
        }
    }
    function catBat() {
        const phase = (playTime % 6000) / 6000;
        return phase < .3 ? Math.sin(Math.PI * phase / .3) : 0;
    }
    function drawCat() {
        const bat = catBat();
        context.save();
        context.translate(size * .02, size * .38);
        context.scale(size / 420, size / 420);
        // The tail curls beside the haunch, rather than stretching up the body.
        context.save();
        context.translate(27, 160);
        context.rotate(Math.sin(playTime / 900) * .04);
        context.beginPath();
        for (const [x, y] of tailDots) dot(x - 27, y - 160, .9);
        context.fillStyle = '#788f78'; context.fill();
        context.restore();
        context.fillStyle = '#fafbf9';
        context.strokeStyle = '#fafbf9';
        context.lineWidth = 4;
        context.fill(catShape); context.stroke(catShape);
        fillDots(catDots);

        // Small facial and leg details keep the silhouette readable at phone sizes.
        context.beginPath();
        dot(50, 49, 2.3); dot(75, 49, 2.3);
        dottedLine(41, 28, 46, 35); dottedLine(84, 28, 81, 35);
        dottedLine(55, 28, 55, 36); dottedLine(61, 27, 61, 35); dottedLine(67, 28, 67, 36);
        dottedLine(61, 64, 57, 68); dottedLine(61, 64, 65, 68);
        dottedLine(43, 61, 20, 55); dottedLine(43, 66, 20, 71);
        dottedLine(79, 61, 103, 55); dottedLine(79, 66, 103, 71);
        dottedLine(77, 120, 74, 144); dottedLine(74, 144, 79, 166);
        dottedLine(43, 143, 55, 150); dottedLine(55, 150, 52, 165);
        dottedLine(85, 165, 86, 171); dottedLine(92, 165, 93, 171);
        context.fillStyle = '#4f6b4f'; context.fill();
        context.beginPath(); dot(61, 60, 1.8);
        context.fillStyle = '#aa5262'; context.fill();

        // A short, bent foreleg taps the globe at its left edge.
        context.translate(77, 95);
        context.rotate(-.12 + bat * .20);
        context.fillStyle = '#fafbf9'; context.fill(pawShape); context.stroke(pawShape);
        fillDots(pawDots);
        context.beginPath();
        dottedLine(62, -51, 67, -49); dottedLine(60, -46, 65, -44);
        context.fillStyle = '#4f6b4f'; context.fill();
        context.restore();
    }

    function vector(lon, lat) {
        const a = lon * radians, b = lat * radians;
        return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a)];
    }
    const graticules = [];
    for (let lon = -180; lon < 180; lon += 30) {
        const line = [];
        for (let lat = -90; lat <= 90; lat += 3) line.push(vector(lon, lat));
        graticules.push(line);
    }
    for (let lat = -60; lat <= 60; lat += 30) {
        const line = [];
        for (let lon = -180; lon <= 180; lon += 3) line.push(vector(lon, lat));
        graticules.push(line);
    }

    function draw() {
        const radius = size * .31, centerX = size * .66, centerY = size * .49;
        const yaw = longitude * radians, tilt = latitude * radians;
        const c = Math.cos(yaw), s = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
        function project(v) {
            const x = v[0] * c - v[2] * s, z = v[0] * s + v[2] * c;
            return [centerX + radius * x, centerY - radius * (v[1] * ct - z * st), v[1] * st + z * ct];
        }
        context.clearRect(0, 0, size, size);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2);
        context.fillStyle = '#fafbf9';
        context.fill();
        context.strokeStyle = '#dce3db';
        context.lineWidth = 1;
        context.stroke();
        context.strokeStyle = '#e4e9e2';
        context.lineWidth = .7;
        for (const line of graticules) {
            let pen = false;
            context.beginPath();
            for (const v of line) {
                const p = project(v);
                if (p[2] < 0) { pen = false; continue; }
                if (pen) context.lineTo(p[0], p[1]);
                else { context.moveTo(p[0], p[1]); pen = true; }
            }
            context.stroke();
        }
        context.fillStyle = '#8f9d8f';
        context.beginPath();
        for (const v of land) {
            const p = project(v);
            if (p[2] < 0) continue;
            const r = Math.max(.65, size / 410);
            context.moveTo(p[0] + r, p[1]);
            context.arc(p[0], p[1], r, 0, Math.PI * 2);
        }
        context.fill();
        targets = [];
        for (const place of locations) {
            const p = project(place.vector);
            if (p[2] < 0) continue;
            const r = Math.min(6, 2.5 + Math.log1p(place.count) * .4) * size / 420;
            context.beginPath();
            context.arc(p[0], p[1], r, 0, Math.PI * 2);
            context.fillStyle = '#aa5262';
            context.fill();
            context.strokeStyle = '#ffffff';
            context.lineWidth = 1.2;
            context.stroke();
            targets.push({x: p[0], y: p[1], place});
        }
        drawCat();
    }

    function resize() {
        size = canvas.getBoundingClientRect().width || 420;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(size * ratio);
        canvas.height = Math.round(size * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        draw();
    }
    new ResizeObserver(resize).observe(canvas);

    function shouldAnimate() {
        return loaded && inView && !paused && !dragging && !document.hidden;
    }
    function tick(time) {
        frame = null;
        if (!shouldAnimate()) { previousTime = null; return; }
        if (previousTime === null) previousTime = time;
        const elapsed = time - previousTime;
        if (elapsed >= 1000 / 24) {
            const step = Math.min(elapsed, 100);
            playTime += step;
            const phase = (playTime % 6000) / 6000;
            const nudge = phase > .13 && phase < .24 ? Math.sin(Math.PI * (phase - .13) / .11) : 0;
            longitude = (longitude + step * (.003 + nudge * .035)) % 360;
            previousTime = time;
            draw();
        }
        frame = requestAnimationFrame(tick);
    }
    function syncAnimation() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        previousTime = null;
        pauseButton.textContent = paused ? 'Play' : 'Pause';
        pauseButton.setAttribute('aria-pressed', String(paused));
        if (shouldAnimate()) frame = requestAnimationFrame(tick);
    }
    pauseButton.addEventListener('click', () => { paused = !paused; syncAnimation(); });
    resetButton.addEventListener('click', () => {
        longitude = -25; latitude = 20; playTime = 0;
        paused = reducedMotion.matches;
        locationLabel.textContent = '';
        draw(); syncAnimation();
    });
    reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncAnimation(); });
    document.addEventListener('visibilitychange', syncAnimation);

    canvas.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft') longitude -= 8;
        if (event.key === 'ArrowRight') longitude += 8;
        if (event.key === 'ArrowUp') latitude = Math.min(80, latitude + 8);
        if (event.key === 'ArrowDown') latitude = Math.max(-80, latitude - 8);
        paused = true;
        draw(); syncAnimation();
    });

    function showNearest(clientX, clientY) {
        const box = canvas.getBoundingClientRect();
        const x = clientX - box.left, y = clientY - box.top;
        let nearest = null, distance = 18;
        for (const target of targets) {
            const d = Math.hypot(x - target.x, y - target.y);
            if (d < distance) { nearest = target; distance = d; }
        }
        const text = nearest ? `${nearest.place.label}: ${nearest.place.count.toLocaleString()} visits` : '';
        if (locationLabel.textContent !== text) locationLabel.textContent = text;
    }
    canvas.addEventListener('pointerdown', event => {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
        pointer = {id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY};
        dragging = true;
        canvas.setPointerCapture(event.pointerId);
        syncAnimation();
    });
    canvas.addEventListener('pointermove', event => {
        if (!pointer || pointer.id !== event.pointerId) {
            if (event.pointerType === 'mouse') showNearest(event.clientX, event.clientY);
            return;
        }
        longitude -= (event.clientX - pointer.x) * .4;
        latitude = Math.max(-80, Math.min(80, latitude + (event.clientY - pointer.y) * .4));
        pointer.x = event.clientX; pointer.y = event.clientY;
        locationLabel.textContent = '';
        draw();
    });
    function release(event) {
        if (!pointer || pointer.id !== event.pointerId) return;
        if (event.type === 'pointerup' && Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) < 5) {
            showNearest(event.clientX, event.clientY);
        }
        if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
        pointer = null; dragging = false; syncAnimation();
    }
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);
    canvas.addEventListener('lostpointercapture', release);
    canvas.addEventListener('pointerleave', () => { if (!dragging) locationLabel.textContent = ''; });

    function validCount(value) { return Number.isSafeInteger(value) && value >= 0; }
    function applyStats(data) {
        if (!data || data.status !== 'connected') return;
        locations = (Array.isArray(data.locations) ? data.locations : []).filter(place =>
            Number.isFinite(place.latitude) && Math.abs(place.latitude) <= 90 &&
            Number.isFinite(place.longitude) && Math.abs(place.longitude) <= 180 &&
            typeof place.label === 'string' && validCount(place.count) && place.count > 0
        ).map(place => ({...place, vector: vector(place.longitude, place.latitude)}));
        if (validCount(data.visits) && validCount(data.countries)) {
            root.querySelector('[data-globe-visits]').textContent = data.visits.toLocaleString();
            root.querySelector('[data-globe-countries]').textContent = data.countries.toLocaleString();
            root.querySelector('[data-globe-stats]').hidden = false;
        }
        status.textContent = typeof data.periodLabel === 'string' ? data.periodLabel : 'Visitor statistics';
        if (typeof data.updatedAt === 'string' && !Number.isNaN(Date.parse(data.updatedAt))) {
            status.textContent += ` · updated ${new Date(data.updatedAt).toLocaleDateString()}`;
        }
        root.querySelector('[data-globe-note]').textContent = (data.visits === 0 ? 'No visits recorded yet. Dots will appear as visitors stop by.' :
            'Visits are estimated per browser-tab session. Dots show approximate, grouped locations.') +
            (data.locationsTruncated ? ' The map shows the 1,000 most visited locations.' : '');
    }
    async function init() {
        if (loading || loaded) return;
        loading = true;
        try {
            const response = await fetch(root.dataset.landUrl);
            if (!response.ok) throw new Error('Map data unavailable');
            const points = await response.json();
            if (!Array.isArray(points)) throw new Error('Invalid map data');
            land = points.filter(p => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite)).map(p => vector(p[0], p[1]));
            loaded = true;
            canvas.dataset.ready = 'true';
            draw(); syncAnimation();
        } catch (_) {
            status.textContent = 'The map could not load. Thanks for visiting!';
            pauseButton.disabled = resetButton.disabled = true;
            return;
        }
        try {
            const response = await fetch(root.dataset.statsUrl, {credentials: 'omit', referrerPolicy: 'no-referrer'});
            if (response.ok) {
                const data = await response.json();
                if (data.status !== 'connected' && data.status !== 'not-connected') throw new Error('Statistics unavailable');
                applyStats(data);
            }
            else throw new Error('Statistics unavailable');
        } catch (_) {
            status.textContent = 'Visitor statistics are temporarily unavailable.';
        }
        draw();
    }
    const nearby = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { init(); nearby.disconnect(); }
    }, {rootMargin: '200px'});
    nearby.observe(canvas);
    new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting;
        syncAnimation();
    }).observe(canvas);
    resize(); syncAnimation();
})();
