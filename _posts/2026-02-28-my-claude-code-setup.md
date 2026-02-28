---
title: "Meu setup do Claude Code: como uso IA no terminal para programar"
author: anchietajunior
date: 2026-02-28 00:00:00 -0300
categories: [AI, Tools]
tags: [claude-code, ai, productivity, setup]
layout: post
lang: pt-br
---

# Claude Code no meu dia a dia

Nos últimos meses, o **Claude Code** se tornou uma das ferramentas mais presentes no meu fluxo de trabalho como desenvolvedor. Diferente de assistentes que funcionam dentro de IDEs com autocomplete, o Claude Code roda direto no terminal — e isso muda completamente a forma como eu interajo com ele.

Neste post, vou compartilhar como está meu setup atual, quais plugins uso, como configurei permissões e a status line customizada que me ajuda a monitorar o contexto da conversa.

## O que é o Claude Code?

O Claude Code é a CLI oficial da Anthropic para o Claude. Ele funciona como um agente de engenharia de software que pode:

- Ler, criar e editar arquivos no seu projeto
- Executar comandos no terminal
- Pesquisar na web e buscar documentação
- Navegar pelo codebase com ferramentas como Glob e Grep
- Criar commits, abrir PRs e interagir com o GitHub
- Lançar sub-agentes para tarefas paralelas

A versão que estou usando atualmente é a **2.1.61**.

## Minha configuração (`settings.json`)

O coração da configuração fica em `~/.claude/settings.json`. Aqui está o meu:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  },
  "permissions": {
    "allow": [
      "Bash(bin/rails test:*)",
      "Bash(bin/rails db:migrate*)",
      "Bash(bundle exec rubocop*)",
      "Bash(bun:*)",
      "Bash(foreman start)",
      "Bash(git:*)",
      "WebSearch",
      "WebFetch(domain:api.stripe.com)",
      "WebFetch(domain:qbench.net)",
      "WebFetch(domain:github.com)"
    ]
  },
  "enabledPlugins": {
    "compound-engineering@every-marketplace": true,
    "ralph-loop@claude-plugins-official": true
  },
  "skipDangerousModePermissionPrompt": true
}
```

### Permissões

Uma das partes mais importantes do setup são as **permissões pré-aprovadas**. Sem elas, o Claude Code pede confirmação para cada comando executado no terminal, o que pode ser bem lento no fluxo de trabalho. Eu configurei permissões para:

- **Rails**: rodar testes (`bin/rails test:*`) e migrações (`bin/rails db:migrate*`)
- **Rubocop**: executar o linter livremente
- **Bun**: gerenciamento de pacotes JavaScript
- **Foreman**: iniciar o servidor de desenvolvimento
- **Git**: todos os comandos git
- **Web**: pesquisa na web e fetch de domínios específicos (Stripe, GitHub)

Isso me dá um equilíbrio entre produtividade e segurança — o Claude pode executar comandos comuns sem pedir permissão, mas qualquer coisa fora desse escopo ainda precisa da minha aprovação.

### Agent Teams (experimental)

A variável `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` habilita o recurso de times de agentes. Isso permite que o Claude Code lance múltiplos agentes que trabalham em paralelo, se comunicam entre si e dividem tarefas complexas. É útil para projetos maiores onde diferentes partes do trabalho podem ser feitas simultaneamente.

### Agent Teams + tmux: paralelismo real

Uma das combinações mais poderosas que descobri é usar **Agent Teams com tmux**. A ideia é simples: em vez de rodar tudo em um único painel do terminal, eu abro uma sessão tmux com múltiplos painéis e deixo cada agente trabalhando de forma visível.

Na prática, o fluxo funciona assim:

1. Abro uma sessão tmux e divido a tela em painéis
2. No painel principal, inicio o Claude Code como líder do time
3. Quando ele lança sub-agentes, cada um aparece em seu próprio processo
4. Consigo acompanhar visualmente o que cada agente está fazendo em tempo real

```bash
# Criar sessão tmux com layout para agent teams
tmux new-session -s claude -d
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
tmux attach -t claude
```

Com esse layout de 4 painéis, consigo monitorar o agente principal e até 3 sub-agentes simultaneamente. É como ter um time de desenvolvedores trabalhando na sua tela.

O que torna isso prático:

- **Visibilidade**: vejo exatamente o que cada agente está fazendo, sem precisar esperar o resultado final
- **Controle**: se um agente tomar um caminho errado, posso identificar rapidamente
- **Produtividade**: enquanto um agente pesquisa documentação, outro pode estar editando código e um terceiro rodando testes

Um exemplo real: ao importar e traduzir 20 posts para este blog, o Claude Code dividiu o trabalho entre 3 agentes — cada um traduziu um lote de posts em paralelo. O que levaria vários minutos sequencialmente foi resolvido em uma fração do tempo.

Para quem já usa tmux no dia a dia, a integração é natural. E para quem não usa, esse é um ótimo motivo para começar.

## Plugins

Atualmente uso dois plugins:

### Compound Engineering (Every Marketplace)

O plugin `compound-engineering` adiciona uma grande quantidade de agentes especializados e skills ao Claude Code. Alguns que uso com frequência:

- **Agentes de review**: revisão de código com diferentes perspectivas (Rails, segurança, performance, arquitetura)
- **Design Iterator**: para refinar interfaces iterativamente
- **Framework Docs Researcher**: busca documentação atualizada de libraries
- **Context7**: integração com documentação e code examples atualizados de qualquer library

### Ralph Loop

O plugin `ralph-loop` permite criar loops autônomos onde o Claude Code continua trabalhando em uma tarefa sem precisar de input constante. Útil para tarefas mais longas.

## Status Line customizada

Uma das customizações que mais gosto é a **status line** no terminal. Ela mostra em tempo real:

- O **modelo** sendo usado (Opus, Sonnet, Haiku)
- O **diretório** do projeto atual
- O **branch** do git ativo
- Uma **barra de progresso** do contexto utilizado
- O **horário** atual

A configuração fica no `settings.json`, na chave `statusLine`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "<conteúdo do script abaixo>"
  }
}
```

O comando em si é um shell script. Para facilitar a leitura, aqui está ele formatado:

```bash
input=$(cat)

# Extrai informações do JSON de input
model=$(echo "$input" | jq -r '.model.display_name')
cwd=$(echo "$input" | jq -r '.workspace.current_dir')
dir_name=$(basename "$cwd")

# Detecta branch do git
git_info=""
if git -C "$cwd" rev-parse --git-dir > /dev/null 2>&1; then
  branch=$(git -C "$cwd" --no-optional-locks branch --show-current 2>/dev/null || echo "detached")
  git_info=" - 🌿 ${branch}"
fi

# Monta barra de progresso do contexto
progress_bar=""
remaining=$(echo "$input" | jq -r '.context_window.remaining_percentage // empty')
if [ -n "$remaining" ]; then
  used=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
  used_int=${used%.*}
  bar_length=20
  filled=$((used_int * bar_length / 100))
  empty=$((bar_length - filled))
  bar=""
  for ((i=0; i<filled; i++)); do bar="${bar}█"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  progress_bar=$(printf "[\033[32m%s\033[0m] %d%%" "$bar" "$used_int")
fi

time=$(date +%H:%M:%S)

# Output: linha 1 = modelo + diretório + branch
#         linha 2 = barra de contexto + horário
printf "%s - 📁 %s%s\n%s - %s" \
  "$model" "$dir_name" "$git_info" "$progress_bar" "$time"
```

O Claude Code passa um JSON via stdin com informações sobre o modelo, diretório e uso de contexto. O script lê esse JSON com `jq`, monta uma barra visual e exibe tudo na status line.

A barra de contexto é especialmente útil: conforme a conversa cresce, o Claude Code consome mais da janela de contexto. Quando a barra está quase cheia, sei que é hora de iniciar uma nova conversa ou comprimir o contexto.

## Como uso no dia a dia

Meu fluxo típico com o Claude Code:

1. **Abro o terminal no diretório do projeto** e digito `claude`
2. **Descrevo a tarefa** em linguagem natural — pode ser em português ou inglês
3. **Reviso as mudanças** que ele propõe antes de aprovar
4. **Peço commits e PRs** quando estou satisfeito com o resultado
5. **Uso `/help`** quando preciso lembrar de funcionalidades

### Dicas práticas

- **Seja específico**: quanto mais contexto você der, melhor o resultado
- **Use o modo plan** para tarefas complexas — ele analisa o codebase antes de fazer mudanças
- **Aproveite os sub-agentes**: para pesquisa ou tarefas paralelas, o Claude Code pode lançar agentes especializados
- **Configure permissões**: poupa muito tempo não ter que aprovar cada `git status`
- **Monitore o contexto**: conversas muito longas perdem qualidade. Comece uma nova quando necessário

## Conclusão

O Claude Code mudou significativamente como eu trabalho. A combinação de acesso ao terminal, leitura do codebase e capacidade de executar comandos faz dele muito mais do que um chatbot — é um par de programação que realmente entende o projeto.

Se você é desenvolvedor e ainda não experimentou, recomendo fortemente. E se já usa, invista tempo configurando as permissões e a status line — faz toda a diferença na produtividade.
