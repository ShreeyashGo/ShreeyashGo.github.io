import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import worker from './worker.mjs';

const origin = 'https://shreeyashgo.github.io';
const endpoint = 'https://portfolio-visitors.smg28072002.workers.dev';
const geography = {country: 'US', city: 'Boulder', region: 'Colorado', latitude: '40.01499', longitude: '-105.27055'};
function database() {
    const sqlite = new DatabaseSync(':memory:');
    sqlite.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
    let reads = 0;
    return {sqlite, get reads() { return reads; },
        prepare(query) {
            return {query, values: [], bind(...values) { this.values = values; return this; },
                async run() { sqlite.prepare(query).run(...this.values); return {success: true}; }};
        },
        async batch(statements) {
            reads++;
            sqlite.exec('BEGIN');
            try {
                const results = statements.map(s => ({success: true, results: sqlite.prepare(s.query).all(...s.values)}));
                sqlite.exec('COMMIT'); return results;
            } catch (error) { sqlite.exec('ROLLBACK'); throw error; }
        }};
}
function request(path, {method = 'GET', headers = {}, cf = geography, body} = {}) {
    const req = new Request(`${endpoint}${path}`, {method, headers, body});
    Object.defineProperty(req, 'cf', {value: cf});
    return req;
}
const ctx = {waitUntil(promise) { return promise; }};
const hit = (db, options = {}) => worker.fetch(request('/hit', {method: 'POST', headers: {Origin: origin}, ...options}), {DB: db}, ctx);
const stats = db => worker.fetch(request('/stats'), {DB: db}, ctx);

test('empty database returns real zero totals without a fake location', async () => {
    const response = await stats(database());
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {status: 'connected', periodLabel: 'All-time · approximate visits',
        visits: 0, countries: 0, updatedAt: null, locations: [], locationsTruncated: false});
});
test('UPSERT increments a location atomically and stores only rounded aggregate fields', async () => {
    const db = database();
    assert.equal((await hit(db)).status, 204);
    assert.equal((await hit(db, {cf: {...geography, latitude: '40.013'}})).status, 204);
    const data = await (await stats(db)).json();
    assert.equal(data.visits, 2); assert.equal(data.countries, 1);
    assert.equal(data.locations.length, 1);
    assert.deepEqual(data.locations[0], {label: 'Boulder, Colorado, United States', latitude: 40, longitude: -105.3, count: 2});
    assert.deepEqual(db.sqlite.prepare('PRAGMA table_info(visitor_locations)').all().map(c => c.name),
        ['bucket', 'country_code', 'label', 'latitude', 'longitude', 'visits', 'updated_at']);
});
test('missing or invalid geography counts the visit without inventing coordinates', async () => {
    const db = database();
    await hit(db, {cf: {}});
    await hit(db, {cf: {country: 'IN', latitude: '', longitude: '72'}});
    const data = await (await stats(db)).json();
    assert.equal(data.visits, 2); assert.equal(data.countries, 1); assert.deepEqual(data.locations, []);
});
test('request body cannot inject a visitor location or SQL', async () => {
    const db = database();
    await hit(db, {body: JSON.stringify({country: 'JP', city: "'); DROP TABLE visitor_locations;--"})});
    const data = await (await stats(db)).json();
    assert.equal(data.countries, 1); assert.match(data.locations[0].label, /Boulder/);
});
test('unusual geographic labels remain parameter values without changing the schema', async () => {
    const db = database();
    const city = "<img src=x onerror=alert(1)>'); DROP TABLE visitor_locations;--";
    await hit(db, {cf: {...geography, city}});
    const data = await (await stats(db)).json();
    assert.equal(data.visits, 1);
    assert.equal(db.sqlite.prepare('SELECT COUNT(*) AS count FROM visitor_locations').get().count, 1);
    assert.ok(data.locations[0].label.startsWith(city));
});
test('API responses suppress indexing and resource execution without accepting credentials', async () => {
    for (const response of [await stats(database()), await hit(undefined)]) {
        assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
        assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
        assert.equal(response.headers.get('Content-Security-Policy'), "default-src 'none'; frame-ancestors 'none'");
        assert.equal(response.headers.get('Referrer-Policy'), 'no-referrer');
        assert.equal(response.headers.get('Access-Control-Allow-Credentials'), null);
    }
});
test('recording requires the production origin; stats never record a visit', async () => {
    const db = database();
    for (const Origin of ['', 'http://localhost:4000', 'https://example.com']) {
        assert.equal((await hit(db, {headers: {Origin}})).status, 403);
    }
    assert.equal((await worker.fetch(request('/stats', {headers: {Origin: 'https://example.com'}}), {DB: db}, ctx)).status, 403);
    assert.equal((await (await stats(db)).json()).visits, 0);
    assert.equal((await worker.fetch(request('/hit'), {DB: db}, ctx)).status, 405);
});
test('bots and both privacy preferences skip writes', async () => {
    const db = database();
    for (const extra of [{DNT: '1'}, {'Sec-GPC': '1'}, {'User-Agent': 'Googlebot'}]) {
        assert.equal((await hit(db, {headers: {Origin: origin, ...extra}})).status, 204);
    }
    await hit(db, {cf: {...geography, botManagement: {verifiedBot: true}}});
    assert.equal((await (await stats(db)).json()).visits, 0);
});
test('quota/database errors return an unavailable response without implementation details', async () => {
    const broken = {prepare() { throw new Error('private database details'); }, batch() { throw new Error('private details'); }};
    for (const response of [await hit(broken), await stats(broken), await stats(undefined)]) {
        assert.equal(response.status, 503); assert.deepEqual(await response.json(), {status: 'unavailable'});
        assert.equal(response.headers.get('Cache-Control'), 'no-store');
    }
});
test('location limit does not truncate visit or country totals', async () => {
    const db = database();
    const insert = db.sqlite.prepare('INSERT INTO visitor_locations VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (let i = 0; i <= 1000; i++) insert.run(String(i), 'US', `Location ${i}`, 40, -105, 1, '2026-10-07T00:00:00Z');
    const data = await (await stats(db)).json();
    assert.equal(data.visits, 1001); assert.equal(data.countries, 1);
    assert.equal(data.locations.length, 1000); assert.equal(data.locationsTruncated, true);
});
test('stats cache reuses a single key across query strings', async () => {
    const saved = new Map(); const pending = [];
    globalThis.caches = {default: {async match(key) { return saved.get(key.url)?.clone(); },
        async put(key, value) { saved.set(key.url, value); }}};
    try {
        const db = database(); const context = {waitUntil(p) { pending.push(p); }};
        await worker.fetch(request('/stats?x=1'), {DB: db}, context); await Promise.all(pending);
        await worker.fetch(request('/stats?x=2'), {DB: db}, context);
        assert.equal(db.reads, 1);
    } finally { delete globalThis.caches; }
});

const clientSource = readFileSync(new URL('../../assets/js/visitor-counter.js', import.meta.url), 'utf8');
function client({site = origin, dnt = '0', gpc = false, blocked = false, failure = false} = {}) {
    const storage = new Map(), calls = [];
    const context = vm.createContext({URL, window: {location: {origin: site}},
        navigator: {doNotTrack: dnt, globalPrivacyControl: gpc},
        document: {querySelector() { return {dataset: {endpoint}}; }},
        sessionStorage: {getItem(key) { if (blocked) throw new Error('Blocked'); return storage.get(key); },
            setItem(key, value) { storage.set(key, value); }, removeItem(key) { storage.delete(key); }},
        fetch(url, options) { calls.push({url, options}); return Promise.resolve({ok: !failure}); }});
    return {storage, calls, run() { vm.runInContext(clientSource, context); }};
}
test('browser counter records once across navigations in a tab and omits credentials', () => {
    const browser = client(); browser.run(); browser.run();
    assert.equal(browser.calls.length, 1); assert.equal(browser.storage.size, 1);
    assert.equal(browser.calls[0].url, `${endpoint}/hit`);
    assert.equal(browser.calls[0].options.credentials, 'omit');
    assert.equal(browser.calls[0].options.referrerPolicy, 'no-referrer');
});
test('local previews, privacy preferences and blocked storage never send hits', () => {
    for (const options of [{site: 'http://localhost:4000'}, {dnt: '1'}, {gpc: true}, {blocked: true}]) {
        const browser = client(options); browser.run(); assert.equal(browser.calls.length, 0);
    }
});
test('a failed recording removes the flag so a later page can retry', async () => {
    const browser = client({failure: true}); browser.run();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(browser.storage.size, 0);
});
