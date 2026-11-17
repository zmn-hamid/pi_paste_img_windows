# Pi clipboard cleanup

A small, dependency-free [Pi](https://github.com/earendil-works/pi) extension
that adds a manual cleanup command for temporary clipboard images.

## Why this exists

Pi 1.5.0 and later already handle image pasting in the core interactive editor.
On Windows, the default shortcut is **Alt+V**; Pi reads the native Windows
clipboard and writes the image to a temporary file named like
`pi-clipboard-<uuid>.png` before inserting that path into the editor.

If your terminal or configuration does not expose the Windows default, assign it
explicitly in Pi's `keybindings.json`:

```json
{
  "app.clipboard.pasteImage": "alt+v"
}
```

This extension does not replace Pi's paste implementation and does not require
`xclip`, `wl-paste`, or another Unix clipboard utility. It adds a safe manual
way to remove those temporary files after they are no longer needed.

## Command

```text
/clipboard-cleanup
```

The command scans the operating system's temporary directory and deletes only
regular files matching Pi's generated clipboard-image names and supported image
extensions (`.png`, `.jpg`, `.jpeg`, `.webp`, and `.gif`). It never recursively
scans directories or removes unrelated temporary files.

Cleanup is intentionally manual: keep the files until Pi has finished using the
attached images, then run the command when convenient.

## Installation

Install the package using Pi's normal extension/package mechanism, or place the
extension directory in the user extension directory:

```text
~/.pi/agent/extensions/pi-clipboard-cleanup/
```

The directory must contain `index.ts`, `cleanup.ts`, and `package.json`. Restart
Pi or run `/reload`, then use `/clipboard-cleanup`.

For a one-off test from a checkout:

```text
pi --extension ./index.ts
```

## Development

The cleanup logic is covered by the built-in Node test runner:

```text
npm test
```

## License

MIT
