# Disable Chrome Address Autofill

A lightweight Chrome extension that turns Chrome's saved address autofill on or off from the toolbar.

It uses Chrome's own privacy setting instead of trying to override form fields on every page, which makes it both more reliable and more privacy-friendly.

## Features

- Toggles Chrome's saved address autofill at the browser level
- Does not inject scripts into websites
- Does not require `<all_urls>` host permissions
- Includes a simple popup UI with clear status messaging

## Why this extension exists

For saved addresses, Chrome may ignore `autocomplete="off"` on page fields because autofill is managed by the browser, not only by the page. This extension uses `chrome.privacy.services.autofillAddressEnabled`, which is the proper browser-level control for that setting.

## Limitations

- It affects saved address suggestions, not omnibox suggestions.
- It does not disable site-specific autocomplete widgets implemented by the website itself.
- It does not currently manage saved credit card autofill.

## Project Structure

- `manifest.json`: extension manifest and icon wiring
- `popup.html`: popup markup
- `popup.css`: popup styling
- `popup.js`: Chrome privacy API integration
- `icons/`: extension icons used by Chrome
- `logo.svg`: editable source artwork
- `CHANGELOG.md`: release history

## Local Development

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this directory.
5. Open the extension popup and toggle the setting.

## Releases

This project keeps a human-readable changelog in [CHANGELOG.md](./CHANGELOG.md).

Recommended release flow:

1. Update `manifest.json` version.
2. Add release notes to `CHANGELOG.md`.
3. Commit the changes.
4. Create and push a Git tag such as `v1.1.0`.
5. Create the GitHub release from that tag, using the matching changelog section as the release body.

## Security

The extension requests only the `privacy` permission and does not read or modify page contents.
