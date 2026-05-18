# DESIGN — Novo tema minimalista

## Direção
- Tirar o esqueleto Windows 98 (98.css, desktop, taskbar, ícones).
- Foco em leitura: muito branco, tipografia generosa, único acento.
- Site é um portfólio + diário técnico, não um simulador de SO.

## Estrutura de páginas
- `/` (Home) — **About** com serviços e especialidades.
- `/posts/` — Lista de artigos agrupada por idioma (EN / PT-BR).
- `/posts/:year/:month/:day/:title/` — Post individual.

`about.md` deixa de existir como URL separada (vira a home). Redirect simples não é necessário enquanto o site não está publicado em domínio próprio.

## Navbar
Topo fixo, fundo branco, borda inferior fina:
```
José                                                    Posts   RSS
```
- "José" volta para `/`.
- "Posts" leva para `/posts/`.
- "RSS" leva para `/feed.xml`.

## Home (About)
Estrutura em uma coluna no mobile, duas colunas no desktop:

```
+-----------------------------------------------+
| [foto pequena]   Olá, sou o José Anchieta.    |
|                  Engenheiro de software,      |
|                  professor universitário e    |
|                  mentor em IA.                |
+-----------------------------------------------+
| O que faço                                    |
|   • Engenharia de software (Ruby on Rails)    |
|   • Aulas e formação de devs juniores         |
|   • Mentoria em IA aplicada a produto         |
+-----------------------------------------------+
| Experiência resumida (timeline curta)         |
+-----------------------------------------------+
| Como conversar comigo (e-mail, GitHub, etc.)  |
+-----------------------------------------------+
```

### Posição da foto — recomendação
Recomendo **foto à direita, alinhada ao primeiro bloco de texto** (desktop) e **acima do texto** (mobile). Motivos:
1. O olho ocidental varre da esquerda pra direita; texto importante (quem sou + o que faço) entra primeiro, foto reforça depois.
2. Mantém a navbar como elemento dominante no topo — a foto não compete com ela.
3. No mobile não tem como fugir do empilhamento; ter a foto antes do texto dá identidade imediata.

Alternativa válida: foto à esquerda dentro de um círculo pequeno (~120px) ao lado do nome — mais "cartão de visita". Vou implementar essa, é mais discreta.

A foto em si ainda não existe nos assets. Vou deixar um placeholder com as iniciais "JA" estilizado para que apareça algo até o usuário enviar a imagem real (que deve ir em `assets/images/jose.jpg`).

## Posts (lista)
Layout linha-a-linha, sem grid de "explorer". Por idioma:

```
Posts
─────

🇧🇷 Português
  17 mai 2026   Criando um agente de IA em Ruby
  15 mai 2026   O que é uma harness para engenheiros
  …

🇺🇸 English
  …
```

Filtro EN / PT-BR continua via botões discretos abaixo do título.

## Post individual
- Título grande, data + categoria menores em cima.
- Largura de leitura ~680px (medida confortável: 65-75 caracteres).
- Blocos de código mantêm a vibe terminal escuro (já temos isso e funciona bem para o brand "Terminal Log"). Bordas suaves em vez de pixeladas.
- Chat (mascote) — mantém a metáfora "José à esquerda / Claude à direita", mas com balões arredondados, sombra suave, sem bordas outset.

## Footer
Centralizado, fonte pequena, três linhas:
```
José Anchieta  ·  Paulo Afonso, BA — Brasil
GitHub  ·  YouTube  ·  LinkedIn  ·  santosjr87@gmail.com
© 2026
```

## Tipografia
- Body: **IBM Plex Sans** (já carregado).
- Código: **IBM Plex Mono** (já carregado).
- Tamanhos:
  - body 17px
  - h1 32px (home/post title)
  - h2 22px
  - h3 18px
- Line-height 1.7 em texto corrido.

## Paleta
- `--bg: #fafaf7` (off-white levemente quente)
- `--surface: #ffffff`
- `--text: #1a1a1a`
- `--muted: #6b6b6b`
- `--border: #e5e5e0`
- `--accent: #b85c38` (laranja-terracota — diferencia sem ser agressivo, combina com o "C" do mascote)
- `--accent-soft: #f5e6dc`
- `--code-bg: #1e1e1e`

## Mascote (chat-interaction)
O skill `chat-interaction` continua válido — as classes `.chat`, `.chat-message.jose`, `.chat-message.claude`, `.chat-avatar`, `.chat-bubble`, `.chat-name` são mantidas. Só muda o visual:
- Avatares em círculo cheio, sem borda 3D.
- Balões com `border-radius` arredondado e sombra fina em vez de borda outset.
- José: fundo cinza claro, avatar com cor neutra escura.
- Claude: fundo `--accent-soft`, avatar `--accent` — reforça que é o mascote da casa.

Nenhuma mudança no HTML que o skill insere; só CSS.

## Itens explicitamente removidos
- `_includes/desktop-icons.html`
- `_includes/taskbar.html`
- `_includes/toolbar.html`
- 98.css (CDN)
- Filtro de janela / clock / start menu

## O que fica para depois
- Foto real do José (substituir placeholder).
- Tema escuro (não pedido, fácil de adicionar via `prefers-color-scheme`).
- URL do YouTube real (placeholder por enquanto).
