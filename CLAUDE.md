# Terminal Log Blog

Jekyll blog with Windows 98 desktop theme using 98.css.

## Stack
- Jekyll 4.4.1 with kramdown/rouge
- 98.css (CDN) for Windows 98 UI
- IBM Plex Sans (body) + IBM Plex Mono (code) from Google Fonts
- Deployed on Cloudflare Pages

## Key files
- `assets/css/main.css` — all custom styles (98.css overrides, chat bubbles, terminal code blocks)
- `assets/js/desktop.js` — clock, start menu, language filter, code block language detection
- `_includes/chat.html` — reusable chat component (not currently used via include, HTML is inline)
- `_layouts/default.html` — main layout with desktop environment
- `_config.yml` — site config with `lang` default for posts

## Posts
- Posts use `lang: en` or `lang: pt-br` in front matter
- Home page groups posts by language with section dividers
- Toolbar has EN/PT-BR filter buttons

## Chat interactions
- Posts can include chat-style conversations between José (JA) and Claude (C)
- Use the chat-interaction skill to add new interactions to posts
- See `.claude/skills/chat-interaction/SKILL.md` for the HTML format and rules
