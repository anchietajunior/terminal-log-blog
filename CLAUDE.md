# Terminal Log Blog

Jekyll teaching blog: wide, monospace, text-first pages with a sidebar, organized by topic.

## Stack
- Jekyll 4.4.1 with kramdown/rouge
- IBM Plex Mono (Google Fonts) is the only typeface
- The site ships no JavaScript: build behavior with Liquid and CSS
- Deployed on Cloudflare Pages

## Posts
- Every post sets `topic:` to a slug from `_data/topics.yml`. A post with a missing or unknown topic shows under "Sem tópico" on `/posts/`.
- Every post sets `lang: en` or `lang: pt-br`. The language filter on `/posts/` is CSS `:has()` keyed on the `lang` attribute that `_includes/post-list.html` writes.
- Write section headings as Markdown `#` / `##`. `_includes/table-of-contents.html` builds the "Neste post" index from the heading ids kramdown generates.
- To add a topic, add an entry to `_data/topics.yml`; its position there is its display order.

## Pages
- Site UI text is pt-BR.
- `assets/css/main.css` holds all styles.
- Home, `/posts/` and each post share the `.with-sidebar` grid: `.sidebar` on the left, `.main-column` on the right.

## Chat interactions
- Posts can include chat-style conversations between José (JA) and Claude (C)
- Use the chat-interaction skill to add new interactions to posts
- See `.claude/skills/chat-interaction/SKILL.md` for the HTML format and rules
