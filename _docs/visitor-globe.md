# Visitor globe

The globe is a local canvas renderer. In production it reads grouped statistics from the configured Cloudflare Worker; a separate recording script counts approximate visits. Local previews use `assets/data/visitors.json`, which explicitly marks analytics as not connected, and hide counts and visitor markers in that state. The visible message says that local previews do not record visits, rather than implying the live counter is still coming soon. A native ⓘ disclosure beside the globe heading explains aggregate collection and links to `/privacy/` in both local and production builds.

Map data is fetched when the globe approaches the viewport. Rotation stops offscreen, in a hidden tab, while dragging, and when paused. Reduced-motion users start with a stationary globe. Arrow keys rotate it; Reset restores the initial view and the user's motion preference.

A dot-matrix cat bats at the globe every six seconds, briefly nudging its rotation. The cat is drawn in the same canvas, with its dot masks sampled once; it shares all of the globe's pause and visibility controls and adds no runtime dependency or image asset. Reset also restores the cat's pose.

## Connecting real statistics

The connection uses a Cloudflare Worker with D1 on the Workers Free plan. See [the setup guide](cloudflare-setup.md) for account setup, installation, free-plan limits, and the connection design. A read-only check confirmed the deployed Worker returns `connected` with zero counts. Production visit recording, the latest response-header update, and the account's Free-plan setting still need verification.

The site's `/privacy/` page explains grouping, network location, the per-tab session-storage flag, retention, and DNT/GPC behavior. Alternative hosted providers remain possible: GoatCounter offers free hosted analytics for reasonable personal-site traffic and API access. Its location statistics are country/region aggregates, so dots should use representative locations and must not be described as individual visitors or precise cities. Umami Cloud's free tier currently excludes API access.

- GoatCounter: https://www.goatcounter.com/
- API: https://www.goatcounter.com/help/api
- Geographic data: https://www.goatcounter.com/help/export-json
- Umami plans: https://umami.is/pricing

An eventual scheduled GitHub workflow can retrieve aggregate statistics with a token stored in GitHub secrets and update the public JSON file. Never put provider credentials, IP addresses, or session records into that file. Use one shared date range for counts and markers. Distinguish pageviews from visits; only populate `visits` and location `count` with visit metrics, otherwise update the UI/schema labels to match the provider.

Expected connected-data shape (the example numbers below are illustrative only):

```json
{
  "status": "connected",
  "periodLabel": "Last 30 days",
  "updatedAt": "2026-10-07T16:00:00Z",
  "visits": 5,
  "countries": 1,
  "locations": [
    {"label": "United States (approximate)", "latitude": 39.8, "longitude": -98.6, "count": 5}
  ]
}
```

Both total counts are optional and stay hidden unless they are nonnegative integers. Locations must have a label, finite coordinates within geographic bounds, and a positive integer count. Failed map loading disables controls; failed statistics loading keeps the continent globe available and shows an unavailable notice.

## Geography and attribution

`assets/data/visitor-land.json` contains 2,953 land points sampled on a roughly equal-area two-degree grid from Natural Earth's 1:110m land boundaries, via world-atlas 2.0.2. D3 and topojson-client were used only to prepare those points; neither is loaded by the site. Source and licensing are recorded in the adjacent license file.

DoorDash's mark was sourced from the navigation of its official company page: https://about.doordash.com/en-us/company.

## Local preview

```sh
bundle exec jekyll serve --source . --config _config.yml,_config_dev.yml --host 127.0.0.1 --livereload
```

The local override supplies local asset URLs and keeps Google Analytics disabled. The production-origin guard omits the visitor recording script in local builds; the browser script also checks the exact live origin before recording.
