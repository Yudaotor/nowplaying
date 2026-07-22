# Now Playing — Fork Template

[中文](README.zh-CN.md)

A single self-contained HTML file that shows what you're currently (or most recently)
listening to on Apple Music, pulled from [ListenBrainz](https://listenbrainz.org/).
Bilingual out of the box — it auto-detects the visitor's browser language (Chinese /
English) and lets them switch manually with the 🌐 button; the choice is remembered
across visits.

This `demo/` folder is a separate, genericized copy of the page this repo's own
maintainer runs in production (`../index.html`) — it has no personal relay URL,
account, or social-preview metadata baked in. Fork it, reskin it, do whatever you want
with it; changes here never affect the maintainer's own deployment and vice versa.

## Quick start (zero backend)

1. You need a ListenBrainz account that's actually receiving your Apple Music listens.
   ListenBrainz doesn't scrobble Apple Music directly — you'll need a bridge (e.g. a
   Last.fm-to-ListenBrainz import, or your own scrobbler) to get listens flowing in.
   Setting that up is outside the scope of this template.
2. Open `index.html?user=<your ListenBrainz username>` in a browser. That's it — no
   server, no build step, no deployment required. The page polls ListenBrainz directly.
3. To publish it: copy `index.html` into the root of your own repo (or a brand new
   empty one) and turn on GitHub Pages for it (Settings → Pages → Deploy from branch →
   `main` → `/ (root)`). Then share `https://<you>.github.io/<repo>/?user=<name>`.

## Language

Language is auto-detected from `navigator.language` on first visit (falls back to
English) and can be switched manually at any time via the 🌐 button in the toolbar.
The choice is saved in `localStorage` and persists across reloads.

## Advanced features (optional relay)

The maintainer's own page (`../index.html`) additionally supports a comment wall,
emoji reactions, a visitor counter, a "top artists" panel, and lower-latency now-playing
updates — all powered by a small Cloudflare Worker relay (the `?relay=` parameter).
The relay is open source at
[Yudaotor/nowplaying-workers](https://github.com/Yudaotor/nowplaying-workers#readme),
and its README is a complete from-scratch deployment walkthrough (the Cloudflare free
tier is plenty). Once yours is up, point this page at it with
`?relay=https://your-worker.workers.dev`, or make it the default by editing the `RELAY`
constant near the top of the `<script>` block.

One honest caveat: the companion macOS app whose collector pushes *live* state
(instant track changes, playback progress, resolved lyrics/covers) isn't open-source
yet. A relay without it still adds the guestbook, reactions, and visitor counter —
those are driven entirely by your visitors — and proxies ListenBrainz server-side,
but now-playing data stays at ListenBrainz-level detail until the app is released.

## Customizing

Everything lives in the one `index.html` file — HTML skeleton, CSS, and JS are all
inline, no build tooling involved. Search for `STRINGS` near the top of the `<script>`
block to edit translations, or the `<style>` block to restyle.
