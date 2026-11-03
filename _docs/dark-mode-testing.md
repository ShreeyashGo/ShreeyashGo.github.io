# Graphite sage theme: local review

Checked November 3, 2026 on `codex/graphite-sage-dark-mode`.

## Scope

- Shared light/dark toggle between Contact and CV, with a separate mobile placement beside Nav.
- System preference on the first visit; an explicit choice is remembered when local storage is available.
- Dark color overrides for the shared shell, homepage, About Me, research, publications, projects and project writeups, teaching, blog, contact, photography, privacy, and error page.
- Non-clickable logo dock entries, retaining the original grayscale, opacity, tooltip, and color-on-hover behavior.
- Theme-aware cat/globe and Blog dots. Theme changes redraw the globe without changing its pause or rotation state.
- Versioned theme/globe assets so browsers do not reuse the previous drawing code after deployment.

## Passed checks

- Production Jekyll build using `_config.yml`, with output outside the source checkout.
- Existing research-card HTML guard against production output.
- Five automated preference tests: early system selection, persisted choice, synchronized buttons, blocked storage, and cross-tab/cleared preferences.
- JavaScript syntax and Git whitespace checks.
- Rendered text compared with a pre-change build: all 43 generated HTML pages retain their original text.
- All seven logo dock entries render without anchors. Existing image files and logo hover transforms/opacity remain unchanged.
- Both appearance modes checked on 17 routes: `/`, `/aboutMe/`, `/research/`, `/publications/`, `/projects/`, all six project writeups, `/teaching/`, `/blog/`, `/contact/`, `/hobbies/photography/`, `/privacy/`, and `/404.html`.
- Mobile layout checked at 375px on the main pages and project writeups. One visible theme control; the mobile navigation opens and remains usable while toggling.
- About Me full-experience expansion, publication abstract expansion, and photography lightbox opening/closing checked.
- The paused globe keeps the Play state when switching themes; the refreshed drawing asset shows charcoal fills and sage dots in dark mode.

## Remaining findings

1. **Original logo contrast on dark backgrounds.** Some dark source logos, especially UdeM, are faint at the preserved 40% resting opacity. No background boxes, image replacements, or brightness/opacity changes were introduced. A dark-mode-only brightness adjustment would improve legibility while retaining the hover behavior, but is outside the approved color-only image treatment.
2. **Legacy dependency warnings.** The original Bundler 1.17.2 invocation reports Ruby `untaint` deprecations. The vendored Foundation styles report Sass division and color-unit deprecations, and the Gist dependency reports optional Faraday retry middleware. The build completes successfully. Package upgrades have not been applied to the active setup.

## Follow-up fixes and compatibility check

- Instagram's minimum widths are now overridden only inside `.video-wrapper`, preserving its 540px desktop cap and 1px margins. The generated iframe is kept in normal document flow because Instagram can apply inline absolute positioning during loading/resizing, making percentage widths refer to a wider ancestor. With the generated iframe present, document width equals viewport width at 320, 375, 540, and 1280px. At 375px, the iframe is 343px wide inside its 345px wrapper; the original document width was 388px.
- Removed unused `paginate` and `paginate_path` configuration. The current `blog-notes` layout lists posts directly; no page uses the legacy `blog` layout. The pagination-template warning is gone.
- Tested the already-installed Bundler 2.6.9 with isolated copies of Gemfile and lockfile. The production build succeeds and the `untaint` warnings disappear. The active Gemfile, lockfile, Ruby, and installed gems were not upgraded. Sass and optional Faraday middleware notices remain.
- The temporary writable-directory notice is specific to the restricted local build environment, rather than a website error.

The PDF reached through CV and Instagram's embedded content retain their independent appearance. These checks do not verify the deployed site or live visitor recording. No Cloudflare Worker behavior was changed.

## Final smoke test

- Fresh production build, research-card guard, five preference tests, and whitespace check pass.
- All 38 shared-layout site pages contain the theme assets and both responsive controls. All 43 generated HTML files preserve their text under matching preview settings; the remaining files are redirects, search verification, and the original icon-font preview.
- Nineteen user-facing routes, including the legacy Hobbies and Courses pages, pass a browser load/theme-control sweep in both light and dark mode.
- Homepage and About Me fit at 375px and 1280px with one visible theme control. The final Instagram check explicitly covers the inline `position: absolute` applied by its script: the computed frame stays in normal flow and the document fits at 320, 375, 540, and 1280px.
