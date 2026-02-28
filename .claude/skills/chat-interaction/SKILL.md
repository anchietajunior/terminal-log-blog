# Chat Interaction Skill

## Description

This skill adds chat-style interactions between José and Claude directly into blog post content. When the user asks a question about a post's topic, the skill appends the conversation as a styled chat block at the relevant position in the post.

## Trigger

Activate this skill when:
- The user asks a question about the content of a blog post in `_posts/`
- The user wants to add a conversation/interaction to a post
- The user says something like "adicione isso no post", "coloca essa pergunta no post", "add this to the post"

## Chat HTML Format

Use this exact HTML structure for every interaction. José is always on the left (gray bubble), Claude is always on the right (yellow bubble):

```html
<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">USER'S QUESTION HERE</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">CLAUDE'S RESPONSE HERE</div>
    </div>
  </div>
</div>
```

## Rules

1. **José's message**: Use the user's question as-is (in the language they wrote it). If they paraphrased, clean it up slightly but keep the natural tone.
2. **Claude's response**: Write a helpful, practical answer. Include one or more of:
   - A simple exercise or problem to solve
   - A bibliographic reference (book, paper, video)
   - A real-world analogy or practical example
   - A code snippet using `<code>` tags (NOT markdown backticks — this is raw HTML)
3. **Placement**: Insert the chat block after the most relevant section in the post. If the user specifies where, follow their instruction.
4. **Tone**: Conversational and friendly, but technically accurate. Claude speaks as a knowledgeable pair programmer, not a professor.
5. **Language**: Match the language of the post (`lang` front matter). If `pt-br`, write in Portuguese. If `en`, write in English.
6. **HTML inside bubbles**: Use `<strong>`, `<code>`, `<em>` for formatting inside bubbles. Do NOT use markdown syntax inside the HTML blocks.
7. **No nested divs**: Keep bubble content as simple inline HTML. Avoid block elements like `<p>`, `<ul>`, `<pre>` inside bubbles — use `<br>` for line breaks if needed.

## Workflow

1. Read the target post to understand context and find the right insertion point
2. Compose José's question and Claude's response
3. Insert the chat HTML block at the appropriate location in the post
4. Confirm to the user what was added and where

## Example

User says: "No post de matemática, como eu pratico autovalores?"

Action: Read the math post, find the "Autovalores e Autovetores" section, and append after it:

```html
<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Como eu pratico autovalores na prática?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Pegue uma matriz 2x2 simples como [[2, 1], [1, 3]] e calcule os autovalores na mão resolvendo det(A - λI) = 0. Depois confira com <code>numpy.linalg.eig()</code>. Os autovalores indicam as direções de maior variância nos dados — é exatamente isso que o PCA usa para reduzir dimensionalidade.</div>
    </div>
  </div>
</div>
```

## CSS Dependencies

The chat styles are defined in `assets/css/main.css` under the section `/* --- Chat Interaction (José + Claude) --- */`. The styles include:
- `.chat` — container with flex column layout
- `.chat-message.jose` — left-aligned, gray bubble, blue avatar with "JA"
- `.chat-message.claude` — right-aligned, yellow bubble, beige avatar with "C"
- Responsive styles for mobile at 768px breakpoint
