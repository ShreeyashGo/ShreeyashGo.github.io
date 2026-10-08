# Portfolio security review

Reviewed October 7, 2026. This is a focused local code and publication review, not a penetration test or an account-security audit.

## Results and changes

- No obvious credential patterns were found in 249 current text files, 342 text blobs in the locally available Git history, or 139 generated production text files. Checks covered private-key headers, common GitHub/AWS/OpenAI/Anthropic/Google/Slack token formats, and credential assignments. Pattern matching can miss other secret formats; binary content and files over 3 MB were not inspected as text.
- The D1 database ID and Worker URL are identifiers, not authentication credentials. Database operations run inside the Worker through the `DB` binding. No Cloudflare API token is sent to the browser, and no arbitrary SQL/admin endpoint is exposed.
- Local environment files, private-key containers, common credential filenames, database files, and Wrangler state are now ignored by Git. Jekyll additionally excludes credential/key/database files and Worker tooling from its output. Ignore rules do not remove an already tracked secret; exposed credentials would need revocation.
- The theme's bundled jQuery was upgraded from 2.1.1 to 3.7.1, with the official download's SHA-256 verified. Existing theme plugins were retained. The old remote WebFont JavaScript loader was replaced with the same fonts' HTTPS stylesheet.
- HTML pages constrain base URLs and disable embedded plugin objects through a small CSP, and use a restrictive cross-origin referrer policy. This is not a complete script allowlist or a guarantee against XSS. GitHub Pages response-header settings have not been changed; a `_headers` or `.htaccess` file would not establish arbitrary response headers there.
- Worker responses now carry `nosniff`, `noindex`, a no-resource/no-framing CSP, and `no-referrer`. These additional headers require deploying the updated module; the October 7 read-only remote check confirmed the original counter responds with `connected` and zero counts.
- SQL uses bound parameters. Browser-supplied bodies do not control location/SQL; geography comes from Cloudflare. The globe renders location labels as text, not HTML. Database errors return a generic unavailable result.

## Public counter limits

The aggregate statistics endpoint is intentionally public. Origin/CORS checks prevent ordinary cross-site browser recording, but a script can forge an Origin header. This does not grant access to your Cloudflare account or arbitrary database queries. It can inflate counts or consume the Free quota, temporarily disabling the counter. Cached statistics and bounded results reduce database work; there is no deployed server-side rate limiter yet. The counter should be treated as approximate, not abuse-proof analytics.

Keep **Workers Free** selected: Free quotas stop service at their limits; do not upgrade to Paid merely to keep a counter running. Account plan/billing settings cannot be verified from the public Worker URL. If abuse actually occurs, disable recording first and add an edge rate limit; no new paid product was enabled in this review.

## Account-side settings to verify

- Enable a passkey or two-factor authentication on GitHub and Cloudflare, and keep recovery codes outside this repository.
- Verify GitHub Pages **Enforce HTTPS** and keep Cloudflare API credentials in the dashboard's secret storage if any are needed later. This dashboard-based counter setup requires no API token in site files.

Sources: [jQuery security fix](https://blog.jquery.com/2020/04/10/jquery-3-5-0-released/), [GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), [Workers rate-limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
