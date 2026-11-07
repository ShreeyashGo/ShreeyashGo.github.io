const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');
const {runInNewContext} = require('node:vm');
const source = readFileSync(join(__dirname, '../assets/js/photography.js'), 'utf8');

function page(phone = false) {
    function element() {
        return {
            events: {}, hidden: false, open: false, textContent: '',
            addEventListener(name, callback) { (this.events[name] ||= []).push(callback); },
            dispatch(name, event = {}) { for (const callback of this.events[name] || []) callback(event); },
            removeAttribute(name) { delete this[name]; }
        };
    }
    const ids = Object.fromEntries(['lightbox', 'lightbox-img', 'lightbox-title',
        'lightbox-story', 'lightbox-story-panel', 'lightbox-close', 'lightbox-shield']
        .map(id => [id, element()]));
    ids.lightbox.showModal = function() { this.open = true; };
    ids.lightbox.close = function() { this.open = false; this.dispatch('close'); };
    const media = {matches: phone, listeners: [], addEventListener(_, callback) { this.listeners.push(callback); }};
    const thumbnail = element();
    thumbnail.alt = 'A scene in the photograph.';
    const card = element();
    card.dataset = {lightboxSrc: '/photo.jpg', lightboxTitle: 'A moment', lightboxStory: 'The story behind it.'};
    card.querySelector = () => thumbnail;
    const window = {matchMedia: () => media};
    runInNewContext(source, {window, document: {
        getElementById: id => ids[id], querySelectorAll: () => [card]
    }, alert() {}});
    return {ids, card, window, media,
        resize(phone) { media.matches = phone; for (const listener of media.listeners) listener({matches: phone}); }};
}

test('desktop photograph opens with its title, alt text and full story', () => {
    const p = page();
    p.card.dispatch('click');
    assert.equal(p.ids.lightbox.open, true);
    assert.equal(p.ids['lightbox-img'].src, '/photo.jpg');
    assert.equal(p.ids['lightbox-img'].alt, 'A scene in the photograph.');
    assert.equal(p.ids['lightbox-title'].textContent, 'A moment');
    assert.equal(p.ids['lightbox-story'].textContent, 'The story behind it.');
    assert.equal(p.ids['lightbox-story-panel'].open, true);
});

test('phone story starts collapsed and responds to resizing on the first opening', () => {
    const p = page(true);
    p.card.dispatch('click');
    assert.equal(p.ids['lightbox-story-panel'].open, false);
    assert.equal(p.ids['lightbox-story-panel'].hidden, false);
    p.resize(false);
    assert.equal(p.ids['lightbox-story-panel'].open, true);
    p.resize(true);
    assert.equal(p.ids['lightbox-story-panel'].open, false);
});

test('keyboard opening and repeated closing preserve one resize listener', () => {
    const p = page();
    let prevented = 0;
    for (const key of ['Enter', ' ']) {
        p.card.dispatch('keydown', {key, preventDefault() { prevented++; }});
        assert.equal(p.ids.lightbox.open, true);
        p.ids['lightbox-close'].dispatch('click');
        assert.equal(p.ids.lightbox.open, false);
        assert.equal(p.ids['lightbox-img'].src, undefined);
    }
    assert.equal(prevented, 2);
    assert.equal(p.media.listeners.length, 1);
});

test('empty stories hide the disclosure and story text remains plain text', () => {
    const p = page();
    p.window.openLightbox('/another.jpg', '', '', '');
    assert.equal(p.ids['lightbox-story-panel'].hidden, true);
    assert.equal(p.ids['lightbox-title'].textContent, 'Photograph');
    p.window.openLightbox('/another.jpg', '', 'Another', '<b>Remember this & that.</b>');
    assert.equal(p.ids['lightbox-story'].textContent, '<b>Remember this & that.</b>');
    assert.equal(p.ids['lightbox-story-panel'].hidden, false);
});
