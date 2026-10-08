# How this portfolio works

The site is a static Jekyll project. Jekyll combines content and templates into HTML in `_site/`; GitHub Pages serves those generated files. The visitor counter is a separate Cloudflare Worker, while the globe itself runs in the browser.

## Start with the content

| What to edit | File |
| --- | --- |
| Homepage introduction and section structure | [`_layouts/frontpage.html`](../_layouts/frontpage.html) |
| Latest updates | [`pages/pages-root-folder/index.md`](../pages/pages-root-folder/index.md), under `news` |
| Experience, education, skills, and teaching | [`pages/portfolio.md`](../pages/portfolio.md) |
| Research overview and interests | [`pages/research.md`](../pages/research.md) |
| Papers, summaries, abstracts, and links | [`pages/publications.md`](../pages/publications.md) |
| Contact invitation | [`pages/contact.md`](../pages/contact.md) |
| Projects landing cards | [`pages/projects.md`](../pages/projects.md); individual writeups are in `pages/projects/` |
| Photography gallery | [`pages/photovideo.md`](../pages/photovideo.md), under `gallery_photos` |
| Navigation menu | [`_data/navigation.yml`](../_data/navigation.yml) |
| Site description, credits, and counter endpoint | [`_config.yml`](../_config.yml) |

The block between `---` lines at the top of a Markdown file is YAML front matter. It supplies values such as `title`, `layout`, `permalink`, and the lists of jobs/papers/photos. Text below the block is the page body. A `permalink` is the public route and is independent of the source filename.

## Follow one page through its templates

For `/research/`, `pages/research.md` chooses the `widgetPage` layout. That layout inserts its body and the three navigation tiles into the shared `default` layout. The shared layout adds `_head.html`, navigation, the footer, and scripts. Liquid expressions such as `{{ page.title }}` read page front matter; `{{ site.baseurl }}` reads configuration; loops render list entries.

The homepage is similar, but its body is assembled in `frontpage.html`. It reads jobs from `portfolio.md` and publications from `publications.md`. `homepage_summary` supplies a short description; `homepage_featured: true` selects the two papers shown there. This keeps those entries tied to the main content lists.

Teaching roles live in the `teaching` list in `pages/portfolio.md`. Both the Teaching tab and About Me read that list. `description` is the full Teaching-tab text; `summary` is optional shorter text for About Me. `hidden: true` puts an About Me card behind “View More Teaching” while keeping it visible on the Teaching tab. `role_style: graduate` uses the same orange as graduate coursework; other cards use blue. Badges spell out Graduate Teaching Assistant or Teaching Assistant, with Head TA and sole GTA details in the descriptions.

## Styles and interaction

- `assets/css/frontpage.css`: homepage layout, cards, logo dock, globe controls, and privacy disclosure.
- `assets/css/contact.css` and `_layouts/contact.html`: contact page, with LinkedIn as its primary action. `hide_email_contact: true` also hides the footer mail icon on this page.
- `assets/css/teaching.css`: teaching cards and role badges, scoped to those components.
- `_layouts/publications.html`: paper cards and their existing native expandable abstracts.
- `assets/css/styles_feeling_responsive.scss` and `_sass/`: the shared Feeling Responsive / Foundation theme.
- `assets/js/javascript.js` and `javascript.min.js`: theme bundle, including the updated jQuery library. The minified file is the one served to visitors; keep both bundles consistent when changing their dependencies.

The original homepage email icon and other pages' footer mail links still exist. The contact page's email suppression is scoped to that page.

## Globe and counter

1. `assets/js/visitor-globe.js` draws the globe and cat on a canvas. It loads local land points as the section approaches the viewport, supports dragging and keyboard controls, and pauses offscreen or when the tab is hidden.
2. Production pages load `assets/js/visitor-counter.js`, which sends one `/hit` request per tab session when recording is permitted. It sends no API token and uses a temporary session-storage flag, not a visitor ID.
3. `cloudflare/visitor-counter/worker.mjs` stores grouped counts through its `DB` binding and serves public `/stats` JSON. `schema.sql` defines the aggregate table; `counter.test.mjs` tests SQL and browser behavior locally.
4. Local previews use `assets/data/visitors.json`, show an explicit local-preview notice, and never load the recording script. The globe's ⓘ disclosure and [`pages/privacy.md`](../pages/privacy.md) describe the collection.

See [Cloudflare setup](cloudflare-setup.md), [globe details](visitor-globe.md), and [security review](security.md). The Worker source/configuration and `_docs/` are excluded from the generated website, but will be visible in the public GitHub repository.

## Add the next projects and photos

For a project, add its card data to `pages/projects.md` and create or update its Markdown writeup in `pages/projects/`. Keep URLs and image paths consistent. Existing project writeups currently have `noindex: true`; revisit that deliberately when refreshing their content.

For a photo, put the image in `images/photos/` and add an entry to `gallery_photos`:

```yaml
- image: /images/photos/your-photo.jpg
  caption: A short caption in your own words.
  size: wide
```

`size` can be `wide`, `half`, or `full`; omit it for the standard size. Resize large originals before adding them so gallery pages remain light.

The three October additions use an optional `thumbnail` path for a small grid preview; `image` remains the larger version opened on click. Set `preserve_frame: true` to show the entire photograph, including its signature, in a contained preview. The skyline sits beside Cloud Waves with `size: wide` and `panorama: true`: the same width and landscape proportions as the Moon, with the complete square photograph contained inside the preview. `alt` describes what is visible for screen readers, while `caption` is the displayed title. Optional `width` and `height` describe the thumbnail's pixel dimensions. Gallery order follows this list on desktop and mobile. Published copies have EXIF metadata removed; the original files remain untouched.

The lens photograph closes the gallery with `square: true` and `preserve_frame: true` for a centred square preview that contains the complete photograph.

## Preview and review

In the existing local Bundler environment, run:

```sh
bundle exec jekyll serve --source . --config _config.yml,_config_dev.yml --host 127.0.0.1 --livereload
```

Open `http://localhost:4000/`. Markdown, layout, CSS, and JavaScript edits reload automatically; restart the server after changing configuration. `_site/` is generated output, so edit the source files above.

The current checkout has pre-existing local Gemfile and development-config edits used for previewing. Those edits and the scratch logo are outside this PR. A fresh checkout's Gemfile still contains the existing `GITHUB-PAGES-VERSION` placeholder; a fresh local Bundler setup needs a real version or a locally configured Jekyll dependency.

For the PR, start with content files, then homepage/contact/publication layouts and CSS, then the two custom visitor scripts and Worker, and finally indexing/security changes. [Indexing policy](indexing.md) explains `robots.txt`, the sitemap, and `noindex`. Search Console measures search traffic; the visitor counter measures approximate tab sessions and does not measure clicks on links within the site.

Additional commits on `codex/oct26-updates` will update the draft PR. The three supplied photographs are included; projects and code review remain before it is ready to merge.
