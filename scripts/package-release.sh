#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
DIST_DIR="$ROOT_DIR/dist"
STAGE_DIR="$DIST_DIR/package"
VERSION=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' "$ROOT_DIR/manifest.json" | head -n 1)
ARCHIVE_NAME="disable-form-autocomplete-v$VERSION.zip"
ARCHIVE_PATH="$DIST_DIR/$ARCHIVE_NAME"

rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR/icons" "$DIST_DIR"

cp "$ROOT_DIR/manifest.json" "$STAGE_DIR/"
cp "$ROOT_DIR/popup.html" "$STAGE_DIR/"
cp "$ROOT_DIR/popup.css" "$STAGE_DIR/"
cp "$ROOT_DIR/popup.js" "$STAGE_DIR/"
cp "$ROOT_DIR/icons/icon-16.png" "$STAGE_DIR/icons/"
cp "$ROOT_DIR/icons/icon-32.png" "$STAGE_DIR/icons/"
cp "$ROOT_DIR/icons/icon-48.png" "$STAGE_DIR/icons/"
cp "$ROOT_DIR/icons/icon-128.png" "$STAGE_DIR/icons/"

rm -f "$ARCHIVE_PATH"
(
  cd "$STAGE_DIR"
  zip -rq "$ARCHIVE_PATH" .
)

echo "Created $ARCHIVE_PATH"
