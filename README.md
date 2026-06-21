# GRINDWAVE Jukebox

Static GitHub Pages version of the GRINDWAVE generative radio player.

Live site: https://salinator513.github.io/grindwave-jukebox/

## Offline ZIP use

1. Download the ZIP from GitHub.
2. Extract the ZIP folder.
3. Open `index.html` in a browser.
4. Tap/click play; browsers require a user gesture before audio can start.

This copy is intended to be offline-safe. The Google font files for `Press Start 2P` and `VT323` are vendored in `fonts/`, so the browser can render the pixel typography offline.

## Offline phone use

Open the public site once while online: https://salinator513.github.io/grindwave-jukebox/

After it loads, the browser caches the app with a service worker. For the cleanest phone workflow, use your browser menu to Add to Home Screen or Install, then reopen it later even without internet.

If you download the ZIP instead, extract the ZIP first and open the extracted `index.html` in a real browser. Do not open the preview inside the ZIP app/file viewer.

## Font files

The local font files in `fonts/` are downloaded from Google Fonts for the same families used by the live GRINDWAVE page: `Press Start 2P` and `VT323`. Their OFL license files are included beside the font files.
