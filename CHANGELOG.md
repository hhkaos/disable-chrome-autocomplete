# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project uses semantic versioning for releases.

## [Unreleased]

### Added

- Release packaging script that creates a ZIP with only the extension files.

### Changed

- Renamed the product to "Disable Form Autocomplete" to better fit demo and recording use cases.

## [1.1.0] - 2026-04-01

### Added

- Initial public release of the extension.
- Browser-level toggle for Chrome saved address autofill using the `chrome.privacy` API.
- Extension icon set for Chrome toolbar and extension management pages.
- Modernized popup UI.

### Changed

- Replaced page-level autocomplete blocking with Chrome's built-in address autofill setting.

### Security

- Reduced privileges to the `privacy` permission only.
- Removed content script and host permissions.
