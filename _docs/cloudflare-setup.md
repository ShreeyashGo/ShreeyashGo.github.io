# Free visitor-counter setup

Checked against Cloudflare's documentation on October 7, 2026. The site configuration points to `https://portfolio-visitors.smg28072002.workers.dev`. A read-only remote check now confirms `/stats` returns HTTP 200, `status: connected`, zero visits/countries, and no location groups. Database installation is working. A real production hit and the account's Free plan have not been verified. The latest local module adds response security/indexing headers; paste it into the Worker editor and deploy again to apply those additions, without rerunning the SQL.

The portfolio stays on GitHub Pages. A small Cloudflare Worker will receive a visit and return grouped statistics; one D1 database will keep the counts. The globe and cat continue to render locally in the browser.

## Keep the cost at zero

- Use the **Workers Free** account plan. A website's Free DNS/CDN plan is a separate setting and does not establish the Workers plan.
- Use D1 on the Workers Free plan. Its free limits are enforced; paid D1 overages apply on Workers Paid.
- Use the supplied `workers.dev` address. No domain purchase or DNS migration is needed.
- Skip paid upgrades and additional services. Do not enter payment details for this setup; if a screen requests a purchase, stop and check the selected product/plan.
- Verify the Workers plan is Free before deploying the counter.

| Resource | Free allowance | At the limit |
| --- | --- | --- |
| Workers | 100,000 requests per account per day | Requests fail until the daily quota resets |
| D1 queries | 5 million rows read and 100,000 rows written per account per day | Queries fail until the daily quota resets |
| D1 storage | 500 MB per database; 5 GB total per account | Further storage operations are blocked |

These are resource quotas, not visitor counts. A visit may make multiple requests and read/write several rows. Staying on Free is the cost protection; a usage alert alone is not a spending cap on Paid.

Sources: [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), [D1 limits](https://developers.cloudflare.com/d1/platform/limits/), [D1 quota behavior](https://developers.cloudflare.com/d1/reference/faq/).

## Account and resource setup

1. Create or sign in to your account at [Cloudflare](https://dash.cloudflare.com/). Verify your email. Choose the Workers/developer-platform path if onboarding asks; you do not need to add `github.io` as a domain.
2. Open **Workers & Pages** and verify the account's Workers plan is **Free**.
3. Choose **Create application → Start with Hello World! → Get started**. Name the Worker `portfolio-visitors` and deploy the starter. Keep its public `https://portfolio-visitors.<your-subdomain>.workers.dev` URL. Dashboard wording may vary.
4. Open **D1 SQL database → Create Database**. Name it `portfolio-visitors`.
5. Return to the Worker, open **Bindings → Add binding → D1 database**. Set the variable name to `DB`, select the database, and add the binding.

This creates the empty resources; the Hello World starter does not collect visits. The next implementation step is to install the counter's SQL schema and Worker code, then configure the portfolio with the public Worker URL. Credentials stay out of the site's JavaScript.

## Install the prepared counter

1. Open your D1 database's **Console**. Paste all of [`schema.sql`](../cloudflare/visitor-counter/schema.sql) and select **Execute**. This creates one aggregate table; rerunning it preserves existing counts.
2. Open the Worker and choose **Edit code**. Replace the starter module with all of [`worker.mjs`](../cloudflare/visitor-counter/worker.mjs). Keep the binding name `DB`. Save and **Deploy**.
3. Visit [the statistics endpoint](https://portfolio-visitors.smg28072002.workers.dev/stats). Initially it should show `status: connected`, `visits: 0`, `countries: 0`, and `locations: []`. Reading this URL does not count a visit. A 503 response means the table/binding/quota needs checking; an HTML or Hello World response means the counter module has not been deployed.
4. Before publishing the portfolio, verify the account remains **Workers Free**, check the generated privacy page, and optionally disable Worker observability logs in its dashboard settings. The module itself logs no visitor data. No paid service or external geolocation API is used.
5. After the portfolio is published to GitHub Pages, open it in a new browser tab. If recording is permitted by browser preferences, the count should update within about a minute. Reloads and navigation in that tab should not add another count. Counts reflect approximate tab sessions, not unique people. Blocking the request must not break the page.

The site sends the recording request on any page of the production portfolio, while the globe fetches statistics only when approached. Local Jekyll builds neither include the recording script nor fetch Cloudflare statistics. `assets/data/visitors.json` remains the local preview fallback.

Wrangler configuration is optional for this dashboard workflow. [`wrangler.jsonc`](../cloudflare/visitor-counter/wrangler.jsonc) contains the provided database ID for later CLI use; confirm the actual database name before using it. Installing/deploying through the dashboard needs no local dependency installation or API token.

Local verification: `node --test cloudflare/visitor-counter/counter.test.mjs` runs the Worker against an in-memory SQLite adapter and checks the browser recording script in a VM. These tests are not a substitute for verifying the actual Cloudflare binding, geographic fields, and Free plan.

Official walkthrough: [Create and bind a Worker and D1 database](https://developers.cloudflare.com/d1/get-started/).

## Connection design

- The Worker exposes a visit endpoint and a public aggregate-statistics endpoint matching the globe's existing data schema.
- Store grouped country/approximate-location counts, rather than raw IP addresses, user agents, or individual visit logs. Coordinates should be rounded before storage and dots labelled approximate.
- Count once per browser-tab session, with no cross-session identifier. Treat the result as approximate visits, not unique people.
- Restrict browser access to the portfolio's origin. Cache statistics briefly where supported, and filter known bots where possible. Origin checks alone do not prevent scripted fake visits; the public counter is approximate and is not an audited analytics service.
- Do not record local preview traffic. A missing endpoint, blocked tracker, or quota error must leave the portfolio and globe usable.
- Add a short disclosure describing the collection when enabling it. Cloudflare still receives request/network information even when our database stores only grouped counts.
- Test real geographic fields through the deployed Worker URL: `request.cf` location information is absent in the dashboard/Playground preview.

Geographic fields: [Cloudflare Request API](https://developers.cloudflare.com/workers/runtime-apis/request/).
