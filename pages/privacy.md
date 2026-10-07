---
layout: page
title: "Visitor statistics & privacy"
permalink: /privacy/
---

The visitor globe uses a small counter hosted on Cloudflare. It estimates visits and shows grouped, approximate locations. The portfolio itself is hosted on GitHub Pages.

The counter sends a request when you visit the live portfolio. Cloudflare derives approximate location information from the network request. Our database stores only a location label, country, coordinates rounded to one decimal place, a running count, and the last time that group was updated. It does not store raw IP addresses, names, full browsing histories, or individual visit records. These grouped totals are publicly visible through the globe and its statistics endpoint and are retained until removed or the counter is retired.

A temporary flag in your browser's session storage helps count once per tab session. It contains no visitor ID and is not used to track you across sites or future sessions. Visits are approximate tab-session counts, not a count of unique people. Network geolocation can be wrong, particularly for VPNs and mobile connections.

Visit recording is skipped when your browser sends **Do Not Track** or enables **Global Privacy Control**, and when session storage is unavailable. The globe can still request existing public statistics. Known automated visitors are filtered where possible, but the counts are not intended as audited analytics.

Cloudflare and GitHub process network requests to provide their services and may handle request information under their own policies: [Cloudflare privacy policy](https://www.cloudflare.com/privacypolicy/) and [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

For questions, [contact me]({{ site.baseurl }}/contact/).
