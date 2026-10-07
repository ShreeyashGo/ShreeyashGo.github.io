// Paste this entire module into the Cloudflare Worker's code editor.
// Requires the D1 database binding named DB. No package dependencies.
const SITE_ORIGIN = 'https://shreeyashgo.github.io';
const MAX_LOCATIONS = 1000;
const countryNames = new Intl.DisplayNames(['en'], {type: 'region'});
const headers = {
    'Access-Control-Allow-Origin': SITE_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, DNT, Sec-GPC',
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex, nofollow',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'no-referrer',
    'Cache-Control': 'no-store'
};

function json(data, status = 200, extra = {}) {
    return Response.json(data, {status, headers: {...headers, ...extra}});
}
function text(value) {
    return typeof value === 'string' ? value.trim().slice(0, 80) : '';
}
function coordinate(value, limit) {
    if (value === null || value === undefined || String(value).trim() === '') return null;
    const number = Number(value);
    return Number.isFinite(number) && Math.abs(number) <= limit ? Math.round(number * 10) / 10 : null;
}
function location(cf = {}) {
    const code = text(cf.country).toUpperCase();
    const country = /^[A-Z]{2}$/.test(code) && !['XX', 'ZZ', 'T1'].includes(code) ? code : 'ZZ';
    const city = country === 'ZZ' ? '' : text(cf.city);
    const region = country === 'ZZ' ? '' : text(cf.region);
    let latitude = country === 'ZZ' ? null : coordinate(cf.latitude, 90);
    let longitude = country === 'ZZ' ? null : coordinate(cf.longitude, 180);
    if (latitude === null || longitude === null) latitude = longitude = null;
    let countryName = 'Unknown location';
    if (country !== 'ZZ') {
        countryName = countryNames.of(country) || country;
    }
    const label = [city, region !== city ? region : '', countryName].filter(Boolean).join(', ');
    return {bucket: JSON.stringify([country, region, city, latitude, longitude]),
        country, label, latitude, longitude};
}
function skipVisit(request) {
    return request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1' ||
        request.cf?.botManagement?.verifiedBot === true ||
        /bot|crawl|spider|headless|lighthouse|preview|slurp/i.test(request.headers.get('User-Agent') || '');
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const origin = request.headers.get('Origin');
        if (origin && origin !== SITE_ORIGIN) return json({error: 'Origin not allowed'}, 403);
        if (request.method === 'OPTIONS') {
            if (origin !== SITE_ORIGIN) return json({error: 'Origin required'}, 403);
            return new Response(null, {status: 204, headers});
        }
        if (url.pathname === '/' && request.method === 'GET') {
            return json({service: 'Portfolio visitor counter', stats: '/stats'});
        }
        if (!['/hit', '/stats'].includes(url.pathname)) return json({error: 'Not found'}, 404);
        if ((url.pathname === '/hit' && request.method !== 'POST') ||
            (url.pathname === '/stats' && request.method !== 'GET')) {
            return json({error: 'Method not allowed'}, 405);
        }
        if (url.pathname === '/hit' && origin !== SITE_ORIGIN) {
            return json({error: 'Origin required'}, 403);
        }
        if (url.pathname === '/hit' && skipVisit(request)) {
            return new Response(null, {status: 204, headers});
        }
        if (!env.DB) return json({status: 'unavailable'}, 503);

        try {
            if (url.pathname === '/hit') {
                // Geographic data comes from Cloudflare, never from the request body.
                const place = location(request.cf);
                await env.DB.prepare(`INSERT INTO visitor_locations
                    (bucket, country_code, label, latitude, longitude, visits, updated_at)
                    VALUES (?, ?, ?, ?, ?, 1, ?)
                    ON CONFLICT(bucket) DO UPDATE SET
                        visits = visitor_locations.visits + 1, updated_at = excluded.updated_at`)
                    .bind(place.bucket, place.country, place.label, place.latitude, place.longitude,
                        new Date().toISOString()).run();
                return new Response(null, {status: 204, headers});
            }

            // Ignore query strings so cache-busting URLs do not force extra D1 queries.
            const cacheKey = new Request(`${url.origin}/stats`);
            const cache = typeof caches !== 'undefined' ? caches.default : null;
            let cached;
            try { cached = cache ? await cache.match(cacheKey) : null; } catch (_) { /* Cache is optional. */ }
            if (cached) return cached;
            const result = await env.DB.batch([
                env.DB.prepare(`SELECT COALESCE(SUM(visits), 0) AS visits,
                    COUNT(DISTINCT CASE WHEN country_code != 'ZZ' THEN country_code END) AS countries,
                    SUM(CASE WHEN latitude IS NOT NULL AND longitude IS NOT NULL THEN 1 ELSE 0 END) AS mapped,
                    MAX(updated_at) AS updatedAt FROM visitor_locations`),
                env.DB.prepare(`SELECT label, latitude, longitude, visits AS count
                    FROM visitor_locations WHERE latitude IS NOT NULL AND longitude IS NOT NULL
                    ORDER BY visits DESC, bucket ASC LIMIT ?`).bind(MAX_LOCATIONS)
            ]);
            const totals = result[0].results[0];
            const response = json({status: 'connected', periodLabel: 'All-time · approximate visits',
                visits: totals.visits, countries: totals.countries, updatedAt: totals.updatedAt,
                locations: result[1].results, locationsTruncated: totals.mapped > MAX_LOCATIONS},
                200, {'Cache-Control': 'public, max-age=60'});
            if (cache) ctx.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}));
            return response;
        } catch (_) {
            // Quota/setup errors must not leak database details or break the portfolio.
            return json({status: 'unavailable'}, 503);
        }
    }
};
