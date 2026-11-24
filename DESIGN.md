# DESIGN — Plataforma de ensino, tema monoespaçado

## Direção
- O site é uma plataforma de ensino: tecnologia, engenharia de software, IA e arquitetura.
- Referência visual: flaviocopes.com. Texto primeiro, listas densas de links, uma só fonte monoespaçada, cantos retos, sem sombras.
- Usar a largura da tela: página de 1180px com barra lateral, em vez da coluna única de 720px.
- Sem JavaScript.

## Estrutura de páginas
- `/` — frase de abertura, tópicos na barra lateral, últimos 15 posts.
- `/posts/` — todos os posts agrupados por tópico, com filtro de idioma.
- `/:year/:month/:day/:title/` — post, com o índice "Neste post" na barra lateral.
- `/sobre/` — serviços, stack, experiência e contato (a antiga home).

## Layout
```
JA José Anchieta                              POSTS  SOBRE  RSS

TÓPICOS / NESTE POST   |  conteúdo principal
(260px, fixa ao rolar) |  (o resto da largura)
```
- Abaixo de 860px a barra lateral sobe para cima do conteúdo e o índice do post some.

## Tópicos
- O tópico é o eixo de ensino. A lista e a ordem ficam em `_data/topics.yml`.
- Cada post tem um `topic`. O link do tópico leva para `/posts/#slug`.

## Tipografia
- IBM Plex Mono em tudo.
- Corpo 15px, texto do post 16px, barra lateral e metadados 13px.
- Títulos em maiúsculas: página 24px, h1 do post 22px, h2 19px, h3 16px.

## Paleta
- `--background: #fcfcf9`
- `--surface: #f2f2ec`
- `--text: #111111`
- `--muted: #66665f`
- `--border: #d6d6ce`
- `--link: #9a4a2c` (terracota escuro, contraste 6:1 sobre o fundo)
- `--accent: #b85c38`, `--accent-soft: #f5e6dc`
- `--code-background: #1e1e1e`

## Mascote (chat-interaction)
- As classes e o HTML do skill `chat-interaction` não mudam; só o CSS.
- Avatares e balões quadrados. José à esquerda em `--surface`; Claude à direita em `--accent-soft`.

## O que fica para depois
- Busca de posts.
- Trilhas ou séries (posts em sequência dentro de um tópico).
- Uma página por tópico, se `/posts/` ficar longa demais.
- Tema escuro.
- Foto real do José.
