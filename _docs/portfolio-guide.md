# Editing the portfolio

The site is a static Jekyll project. Content lives in page files; layouts and includes give each entry its existing appearance. Jekyll generates `_site/`, and GitHub Pages serves that output. Edit the source, never `_site/`. `_docs/` and the Cloudflare Worker source are excluded from the generated website, but committed files remain visible in the public GitHub repository.

## Find the content

| What to change | Source |
| --- | --- |
| Homepage bio, portrait, logo dock, updates, explore links, Beyond Code copy | [`pages/pages-root-folder/index.md`](../pages/pages-root-folder/index.md) |
| Experience, education, skills, teaching, awards, coursework | [`pages/portfolio.md`](../pages/portfolio.md) |
| Research overview and navigation cards | [`pages/research.md`](../pages/research.md) |
| Papers, homepage selections, summaries, abstracts, paper/audio links | [`pages/publications.md`](../pages/publications.md) |
| Contact invitation, action cards, profile links | [`pages/contact.md`](../pages/contact.md) |
| Blog heading, empty-state copy, and fallback link | [`pages/blog.md`](../pages/blog.md); future articles go in `_posts/` |
| Project cards and individual writeups | [`pages/projects.md`](../pages/projects.md), then `pages/projects/` |
| Photos, captions, video links | [`pages/photovideo.md`](../pages/photovideo.md) |
| Visitor privacy wording | [`pages/privacy.md`](../pages/privacy.md); the short globe disclosure is in `_layouts/frontpage.html` |
| Navigation / footer social links | [`_data/navigation.yml`](../_data/navigation.yml) / [`_data/socialmedia.yml`](../_data/socialmedia.yml) |
| Site description, credits, URLs, counter settings | [`_config.yml`](../_config.yml) |

The block between the first two `---` lines is YAML front matter. Lists use `-` entries with consistent indentation; use spaces, not tabs. Quote text containing `:`, `#`, or other YAML punctuation. `>-` is convenient for a long paragraph. Text after the second `---` is the page body. `permalink` controls the public route independently of the source filename.

**Adding an entry automatically gives it the existing card, spacing, colors, and responsive behavior.** Copy a neighboring entry, replace its content, and omit optional fields you do not need. List order is display order; dates are labels, not automatic sorting instructions. Put the newest news or experience at the top yourself. Homepage experience and paper selections preserve their source-list order. About Me groups `hidden: true` entries behind its expansion buttons.

The samples below are placeholders for copying, not real portfolio claims. Replace every placeholder before adding one to a page.

## Homepage

Edit the homepage’s `hero`, `social_links`, `logo_dock`, `explore_links`, `beyond_code`, `research_more`, `section_labels`, and `news` in `pages/pages-root-folder/index.md`. The layout reads those values and handles the presentation.

- `hero`: `name`, `image`, `image_alt`, `research_url`, `research_label`, and a `paragraphs` list. Each paragraph accepts small HTML highlights/links; the layout adds paragraph wrappers. For example, replace a paragraph with:

  ```yaml
    - >-
      I work on <span class="highlight">your research topic</span>
      and collaborate with <strong>your team</strong>.
  ```

- `social_links`: `title`, `icon`, `url`. Supported icons are `scholar`, `linkedin`, `github`, and `email`; use `mailto:your-address` for email. Other social destinations need an appropriate icon added to the include first.
- `beyond_code`: `title`, `text`, `image`, `image_alt`, `caption`, `url`, and `link_text`. This controls the hobby copy, photo, and photography action.
- `research_more`: `url` and `text` for the closing link below Selected Research. Both homepage research overview links currently lead to `/research/`; individual paper links still open their papers.
- `section_labels`: the short labels above Experience, Selected Research, Beyond Code, and Visitors. Experience and Visitors use soft green panels; Research is an open card grid, and Beyond Code pairs a larger photo with its heading and copy. These layouts respond to screen width without changing the source-list order.

Add a logo under `logo_dock` after copying its image to `images/`:

```yaml
  - name: "Organization name"
    image: /images/your-logo.webp
    description: "Short tooltip about your work there"
    url: "#experience"
    aria_label: "Organization name — your role"
```

`url` and `aria_label` are optional; omit `url` for a logo without a link. `image_class` is optional for an existing special size treatment (currently `dock-logo--doordash`); new logos use the shared styling. Optional `hide_on_error: true` hides a missing image, but check that your copied file loads before publishing.

Add a link under `explore_links`:

```yaml
  - title: "Experience"
    url: "#experience"
```

Existing homepage section anchors are `#experience`, `#research`, `#beyond-code`, and `#visitors`. Logo and explore-link order follows their lists.

Add an update under `news`:

```yaml
  - date: "Month YYYY"
    type: "paper"
    title: "Your update title"
    desc: "A short description of what changed."
```

`type` selects the icon: `paper`, `job`, or `academic`; another value uses a pin. No separate desktop/mobile entry is needed.

The homepage timeline uses two responsive views of the same `news` list. Above 650px, all updates are in a 400px-high scrollable region that also accepts keyboard focus. A small ↑ button appears at its bottom-right after scrolling down and returns only the timeline to the top. At 650px and below, the first four updates follow the normal page scroll; a native “Show older updates” disclosure expands the remainder inline. CSS hides the inactive view, including from the accessibility tree. `_homepage-update.html` keeps the entry markup shared, so content is edited only once. `timeline_recent_count: 4` controls how many items are initially visible in the narrow-screen view.

## Experience and About Me

Add a job under `experience` in `pages/portfolio.md`:

```yaml
  - company: "Organization name"
    role: "Your role"
    dates: "Month YYYY - Month YYYY"
    location: "City, Country"
    homepage_summary: "One concise sentence for the homepage."
    points:
      - "Describe your work and a result you can support."
      - "Add another detail if useful."
```

`homepage_summary` is optional: adding it also creates a homepage experience card; omitting it keeps the entry on About Me only. `hidden: true` is optional and puts the job behind “View Full Experience” on About Me. It does **not** suppress a homepage card if `homepage_summary` is present.

The other About Me lists work the same way: `education` uses `school`, `location`, `degree`, `dates`; `skills` uses `name` and an `items` list; `awards` uses `title`, `date`, `description`; `electives` uses `name` with optional `grad: true` for the graduate badge styling. Reuse existing entries as templates.

## Publications

Add a paper under `publications` in `pages/publications.md`:

```yaml
  - title: "Your paper title"
    id: your-paper-slug
    homepage_featured: true
    homepage_summary: "One sentence explaining the main contribution."
    authors: "**Your Name**, Coauthor Name"
    venue: "Venue and year"
    type: "Conference"
    paper_link: "https://example.com/replace-with-paper-link"
    abstract: "The abstract or an accurate short abstract."
```

`homepage_featured: true` selects the paper for the homepage; omit it or set it to `false` to show the paper only on Publications. The layout renders every selected paper, so keep the selection small. `homepage_summary` supplies the short description on both pages. For a featured paper, provide a summary and `paper_link`, since the homepage title and action open that paper directly. A unique lowercase `id` with hyphens enables links such as `/publications/#your-paper-slug`; changing the ID breaks existing anchor links in the research overview or elsewhere.

`type: Conference` and `type: Workshop` have existing badge colors. `authors`, `paper_link`, and the summary are optional. Add optional `audio_link` and `audio_note` for a NotebookLM action; omit both when unavailable. Supply `abstract` because the card always has a native “Read Abstract” disclosure. The paper list is not sorted automatically.

## Research and contact

Edit the research overview in the body of `pages/research.md`. Its existing HTML wrapper supplies the research-page styling. Navigation cards come from `research_links` in front matter:

```yaml
  - title: "Publications and Preprints"
    url: "/publications/"
    icon: publications
    text: "A short explanation of what readers will find."
    link_text: "Read publications"
```

The supported decorative icons are `projects`, `publications`, and `teaching`. URLs and card order are editable; new card entries inherit the shared card style.

In `pages/contact.md`, edit `contact_eyebrow`, `contact_heading`, `teaser`, and the page body for the invitation. Add or edit a `contact_options` entry:

```yaml
  - id: your-option
    title: "Your action title"
    text: "Explain why someone should use this link."
    url: "/research/"
    link_text: "Explore my research"
    arrow: "→"
```

Use a unique `id`. Optional `primary: true` highlights a card; optional `external: true` opens its link in a new tab with the existing safe link attributes. Set `arrow: "↗"` for an external destination. The final profile line uses `contact_work_intro` and `contact_work_links` entries with `text` and `url`; those links open externally.

`hide_email_contact: true` hides the footer mail icon on the Contact page only. The homepage email icon and other pages’ footer email links remain independent.

## Teaching

Both About Me and `pages/teaching.md` read the `teaching` list in `pages/portfolio.md`; edit it once:

```yaml
  - code: "COURSE 1234"
    name: "Course name"
    role: "Graduate Teaching Assistant"
    role_style: "graduate"
    school: "Institution name"
    dates: "Month YYYY - Month YYYY"
    summary: "Short role detail for About Me."
    description: "Full description for the Teaching page."
    course_url: "https://example.com/replace-with-course-link"
```

`school`, `summary`, and `course_url` are optional. `description` is the full Teaching-page text; `summary` appears on About Me when supplied. Optional `hidden: true` puts the About Me card behind “View More Teaching” while keeping it visible on Teaching. `role_style: graduate` uses orange; omit it for blue. Spell out “Graduate Teaching Assistant” or “Teaching Assistant” in `role`, and put Head TA or sole GTA details in the descriptions.

## Images, photography, and projects

Copy and optimize the actual image files **before** adding image paths. Use `/images/...` paths with exact filename capitalization. Resize large originals, create a smaller thumbnail when helpful, and remove EXIF metadata from published copies while preserving originals elsewhere. A YAML entry does not upload, resize, or strip metadata from a file.

Add a photo under `gallery_photos` in `pages/photovideo.md`:

```yaml
  - image: /images/photos/your-photo.jpg
    thumbnail: /images/photos/your-photo-thumb.jpg
    caption: "Your displayed title"
    alt: "Describe what is visible in the photograph."
    preserve_frame: true
    size: wide
```

Only `image` is essential to display the photo. `thumbnail` is optional: it loads in the grid while `image` opens on click. `caption` is optional; provide a descriptive `alt` for screen readers. `size` can be `wide`, `half`, or `full`; omit it for the standard width. Gallery order follows the list on desktop and mobile.

Optional `preserve_frame: true` contains the whole photograph instead of cropping it, including signatures. `panorama: true` uses landscape proportions; the existing skyline combines it with `size: wide` and `preserve_frame: true`. `square: true` makes a square preview; the existing closing lens photo is also centered on desktop. Optional `width` and `height` describe the displayed thumbnail’s actual pixel dimensions. `instagram_videos` uses entries with a `url` and loads Instagram’s external embed script when videos are present.

For a project, copy a card in `pages/projects.md` (`title`, `url`, `image`, `description`, optional `tags`) and create or update its Markdown writeup in `pages/projects/`. Card URLs must match the writeup’s `permalink`. Existing project writeups have `noindex: true`; revisit that deliberately when refreshing their content.

## Plain text, HTML, and Markdown

YAML strings do not automatically turn Markdown into formatted text. Follow the convention of the field you are editing:

| Field or area | Formatting convention |
| --- | --- |
| Homepage bio | HTML fragments, preserving existing `<span class="highlight">`, `<strong>`, and link markup |
| News descriptions, experience points/summaries, publication title/summary/abstract | Plain prose or intentional inline HTML; `**bold**` is not converted |
| Publication `authors` | Markdown, such as `**Your Name**` |
| Teaching fields, research-link text, contact-card text, photo caption/alt | Plain text; HTML is escaped |
| Markdown page body | Markdown, with HTML where the existing page uses it |

Use `>-` to split a long HTML/text field across source lines without creating extra paragraphs. Do not paste a complete `<p>` into a field already wrapped in a paragraph by its template. Internal data URLs use routes such as `/research/`; templates add the configured base path. Links written in page-body HTML should follow the existing `{{ site.baseurl }}/...` pattern.

## Visitor counter, privacy, and indexing

The counter is a separate Cloudflare Worker; the globe runs in the browser. `_config.yml` contains:

```yaml
visitor_counter:
    enabled: true
    endpoint: 'https://your-worker.example.com'
```

The endpoint is a public HTTPS Worker origin, not a secret. `enabled: false` disables recording and live statistics; the globe remains visible with counting-off copy. Local previews use `assets/data/visitors.json`, show a local-preview notice, and never load the recording script. Production recording is guarded by the exact `https://shreeyashgo.github.io` origin in both the template and browser script. If the site moves domains, review those guards and the Worker’s allowed-origin configuration together.

`assets/js/visitor-counter.js` attempts one `/hit` per tab session when recording is permitted. It sends no API token and uses a temporary session-storage flag, not a visitor ID. DNT/GPC or unavailable storage suppress recording; the globe can still request public `/stats`. Counts approximate tab sessions, not unique people or internal-link clicks. The Worker stores grouped approximate locations/counts, not individual visit records. Never put provider credentials or raw visitor data in public JSON. Keep `pages/privacy.md` and the short homepage disclosure accurate if behavior changes.

Worker configuration, schema, tests, deployment instructions, and live-verification caveats are in [Cloudflare setup](cloudflare-setup.md), [globe details](visitor-globe.md), and [security review](security.md). A local preview or build does not verify production recording.

Edit page `meta_title` and `meta_description` for search snippets; `_config.yml` holds site-wide description, URLs, and credits. Restart preview after config changes. `noindex: true` removes a page from search eligibility and the sitemap; `sitemap: false` excludes it from the sitemap. Neither is access control. Keep the intentional project/demo/redirect exclusions, and see [Indexing policy](indexing.md) for `robots.txt`, sitemap rules, and search-engine caveats. Search Console measures search traffic; it is independent of this counter.

## Blog notes

Edit the heading, teaser, and `empty_*` fields in `pages/blog.md` to change the empty blog copy and its fallback research link. The original dot-wave SVG is the fallback for touchscreens or disabled JavaScript. On devices with hover, `blog-dots.js` paints the same pattern on a canvas: nearby dots shift and brighten under the cursor, then reset when it leaves. Reduced-motion mode keeps positions fixed. Drawing is event-driven, with no timer, continuous animation loop, or third-party embed.

When ready to publish a note, create `_posts/YYYY-MM-DD-your-title.md` outside `_posts/design/`:

```yaml
---
layout: page
title: "Your note title"
teaser: "A short introduction for the blog card."
categories: [notes]
---
Your article in Markdown starts here.
```

Jekyll orders posts by date, newest first. The blog layout automatically replaces the empty state with article cards when eligible posts exist; `noindex: true` posts (including the theme demonstrations) are omitted. Future-dated posts are not published by the usual build until their date arrives. When the first real article is ready, review and remove the empty blog page's `noindex: true` and `sitemap: false` deliberately so the blog landing page can be indexed too.

## Where appearance and behavior live

| Component | Template / style or script |
| --- | --- |
| Homepage page and preview cards | `_layouts/frontpage.html`, `_includes/_homepage-experience.html`, `_includes/_homepage-paper.html`; `assets/css/frontpage.css` |
| Homepage repeatable items | `_includes/_homepage-timeline.html`, `_homepage-update.html`, `_homepage-logo.html`, `_homepage-social.html`; `assets/js/homepage-timeline.js` handles the timeline's ↑ button |
| About Me | `_layouts/about_profile.html`, `_includes/_experience-card.html`; `assets/css/about-profile.css`, `assets/js/about-profile.js` |
| Publication cards and native abstracts | `_layouts/publications.html`, `_includes/_publication-card.html`; `assets/css/publications.css` |
| Research overview / navigation cards | `_layouts/research.html`, `_includes/_research-link-card.html`; `assets/css/research.css` |
| Contact options | `_layouts/contact.html`, `_includes/_contact-option.html`; `assets/css/contact.css` |
| Teaching | `pages/teaching.md`, `_includes/_teaching-card.html`; `assets/css/teaching.css` |
| Gallery and lightbox | `_layouts/photo-portfolio.html`, `_includes/_photo-card.html`; `assets/css/photography.css`, `assets/js/photography.js` |
| Blog empty state and future article list | `_layouts/blog-notes.html`, `_includes/_blog-note-card.html`; `assets/css/blog-notes.css`, `assets/js/blog-dots.js`, `images/blog-dot-waves.svg` |
| Globe / recording / stored aggregates | `assets/js/visitor-globe.js`, `assets/js/visitor-counter.js`, `cloudflare/visitor-counter/worker.mjs`, `schema.sql`, `counter.test.mjs` |
| Shared page shell | `_layouts/default.html`, `_includes/_head.html`, `_navigation.html`, `_footer.html`, `_footer_scripts.html` |
| Shared theme | `assets/css/styles_feeling_responsive.scss`, `_sass/`, `assets/js/javascript.js` and `javascript.min.js` |

For `/research/`, `pages/research.md` chooses the `research` layout, which inserts the body and loops over `research_links`. The shared `default` layout adds navigation, footer, and scripts. Liquid `{{ page.title }}` reads page front matter; `{{ site.baseurl }}` reads configuration. The homepage similarly reads its own front matter, then finds About Me and Publications by their permalinks to reuse experience/paper data. Preserve those routes when editing.

The theme’s minified JavaScript bundle is served to visitors; keep both bundles consistent when changing dependencies. Content edits generally do not require template, CSS, or script edits.

## Preview and review

In the existing local Bundler environment:

```sh
bundle exec jekyll serve --source . --config _config.yml,_config_dev.yml --host 127.0.0.1 --livereload
```

Open `http://localhost:4000/`. Content, layout, CSS, and JavaScript changes reload automatically; configuration changes require restarting the server. `_config_dev.yml` supplies local asset URLs and disables Google Analytics.

This checkout has pre-existing local Gemfile/development-config edits used for previewing. Preserve those and unrelated scratch files. A fresh checkout’s Gemfile has the existing `GITHUB-PAGES-VERSION` placeholder, so a fresh local Bundler setup needs a real version or a locally configured Jekyll dependency.

Before sharing changes, check the edited pages at desktop and mobile widths, follow the new links, confirm image loading and keyboard disclosures, and inspect the diff for unrelated edits. For a production build and whitespace check:

```sh
JEKYLL_ENV=production bundle exec jekyll build --source . --config _config.yml
python3 _scripts/check_research_html.py _site/research/index.html
git diff --check
```

Keep `JEKYLL_ENV=production` in that check: development previews skip HTML compression. The compressor retains closing tags because dropping `</p>` inside a linked card changes how browsers parse the card.

When changing the counter or Worker, also run `node --test cloudflare/visitor-counter/counter.test.mjs`. These local checks do not publish the site or confirm a deployed Worker’s behavior.
