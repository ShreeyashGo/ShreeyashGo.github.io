const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');
const source = readFileSync(join(__dirname, '../assets/js/theme.js'), 'utf8');

function page({dark = false, saved = null, blocked = false} = {}) {
    const events = {}, windowEvents = {}, changes = [];
    const root = {dataset: {}};
    let mounted = false, stored = saved, systemChange;
    const toggles = Array.from({length: 2}, () => ({
        hidden: true, attributes: {},
        setAttribute(key, value) { this.attributes[key] = value; },
        addEventListener(name, callback) { this[name] = callback; }
    }));
    const preference = {matches: dark, addEventListener(_, callback) { systemChange = callback; }};
    const document = {
        documentElement: root,
        querySelectorAll() { return mounted ? toggles : []; },
        addEventListener(name, callback) { events[name] = callback; },
        dispatchEvent(event) { changes.push(event.detail.theme); }
    };
    runInNewContext(source, {
        document,
        window: {matchMedia: () => preference, addEventListener(name, callback) { windowEvents[name] = callback; }},
        localStorage: {
            getItem() { if (blocked) throw Error('Storage blocked'); return stored; },
            setItem(_, value) { if (blocked) throw Error('Storage blocked'); stored = value; }
        },
        CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } }
    });
    return {
        root, toggles, changes,
        mount() { mounted = true; events.DOMContentLoaded(); },
        system(dark) { preference.matches = dark; systemChange(); },
        storage(value, key = 'site-theme') { stored = value; windowEvents.storage({key, newValue: value}); },
        stored: () => stored
    };
}

test('system preference is applied before the DOM is ready', () => {
    const p = page({dark: true});
    assert.equal(p.root.dataset.theme, 'dark');
    assert.equal(p.toggles[0].hidden, true);
    p.mount();
    assert.equal(p.toggles[0].hidden, false);
    assert.equal(p.toggles[1].attributes['aria-pressed'], 'true');
    p.system(false);
    assert.equal(p.root.dataset.theme, 'light');
});

test('saved preference overrides system mode on a fresh page', () => {
    const p = page({dark: true, saved: 'light'});
    assert.equal(p.root.dataset.theme, 'light');
    p.mount();
    p.system(false);
    p.system(true);
    assert.equal(p.root.dataset.theme, 'light');
});

test('both navigation buttons save and synchronize the choice and labels', () => {
    const p = page();
    p.mount();
    p.toggles[1].click();
    assert.equal(p.stored(), 'dark');
    assert.equal(p.root.dataset.theme, 'dark');
    for (const toggle of p.toggles) {
        assert.equal(toggle.attributes['aria-pressed'], 'true');
        assert.equal(toggle.attributes['aria-label'], 'Switch to light mode');
    }
    p.system(true);
    p.system(false);
    assert.equal(p.root.dataset.theme, 'dark');
    assert.equal(page({saved: p.stored()}).root.dataset.theme, 'dark');
    p.toggles[0].click();
    assert.equal(p.stored(), 'light');
    assert.equal(p.changes.at(-1), 'light');
});

test('blocked storage still permits toggling and canvas redraw events', () => {
    const p = page({blocked: true});
    p.mount();
    p.toggles[0].click();
    assert.equal(p.root.dataset.theme, 'dark');
    assert.equal(p.changes.at(-1), 'dark');
    p.toggles[1].click();
    assert.equal(p.root.dataset.theme, 'light');
});

test('invalid saved values are ignored; clearing preference resumes system mode', () => {
    const p = page({dark: true, saved: 'other'});
    assert.equal(p.root.dataset.theme, 'dark');
    p.mount();
    p.storage('light');
    assert.equal(p.root.dataset.theme, 'light');
    p.storage('dark', 'unrelated-key');
    assert.equal(p.root.dataset.theme, 'light');
    p.storage(null);
    assert.equal(p.root.dataset.theme, 'dark');
    p.system(false);
    assert.equal(p.root.dataset.theme, 'light');
    p.storage('dark');
    p.storage(null, null);
    assert.equal(p.root.dataset.theme, 'light');
});
