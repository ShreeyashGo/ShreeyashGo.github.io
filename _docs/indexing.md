# Portfolio indexing policy

Updated October 7, 2026. These settings take effect when this branch is published.

| Content | Current policy |
| --- | --- |
| Home, About Me, research, publications, projects landing page, teaching, courses, hobbies, photography, contact, privacy | Crawlable and included in the sitemap |
| Existing individual project pages | Their existing `noindex: true` is preserved; excluded from the sitemap pending the projects refresh |
| Theme demonstration posts and empty blog | Crawlable with `noindex`; excluded from the sitemap and feeds |
| CV / Google Scholar redirects, sample redirect, 404 | `noindex`; excluded from the sitemap |
| CSS, JavaScript, images, public globe data | Crawlable for rendering; excluded from the sitemap |
| Worker source/configuration, internal documentation, local credential files | Excluded from the generated site; not protected by robots rules |

`robots.txt` allows crawling, including pages that need their `noindex` directive read. It advertises the canonical sitemap. No crawler-specific AI policy has been added.

The sitemap includes only eligible HTML pages, respects `sitemap: false`, `sitemap.exclude: true`, `noindex: true`, and `published: false`, and omits technical endpoints and redirects. `lastmod` is emitted only for an explicit modification date or a post date; rebuilding the site is not treated as a content edit.

Search engines decide whether and when to index a page. A sitemap is a hint, and removing a previously indexed page requires a recrawl. `robots.txt` and `noindex` are not access controls. The GitHub repository is a separate public surface: excluding a file from Jekyll does not hide a committed file from GitHub.

Sources: [Google robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro), [noindex requirements](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
