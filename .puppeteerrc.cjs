/**
 * Disable Puppeteer's bundled `postinstall` so it doesn't race with the
 * project-managed Chrome install (see `postinstall` script in `package.json`).
 *
 * Without this, `puppeteer`'s own `install.mjs` downloads Chrome,
 * `chrome-headless-shell`, and Firefox in parallel during `npm install`,
 * which races with our explicit `puppeteer browsers install chrome` call
 * and leaves the cache in a broken "folder exists, executable missing" state.
 */
module.exports = {
  skipDownload: true,
};
