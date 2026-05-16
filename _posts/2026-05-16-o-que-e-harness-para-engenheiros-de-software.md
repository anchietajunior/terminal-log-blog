---
title: "O que é Harness para engenheiros de software?"
author: anchietajunior
date: 2026-05-16 00:00:00 -0300
categories: [AI, Engineering]
tags: [ai, harness, agents, llm, spec-driven-development, claude-code]
layout: post
lang: pt-br
---

# Harness: o "arnês" que segura o cavalo

Se você acompanha o vocabulário que está se formando ao redor da engenharia de software com IA, provavelmente já esbarrou na palavra **harness**. Ela aparece em posts da Anthropic, na documentação do Claude Code, em artigos sobre Cursor e Cline, e em discussões sobre como construir agentes em produção.

Mas o que **harness** quer dizer, afinal?

A tradução literal — "arnês", "cinto", "atrelagem" — já entrega quase tudo. **Harness é o conjunto de estruturas, regras, ferramentas e contexto que envolve um LLM para fazê-lo trabalhar de forma útil, segura e repetível em um problema real.** O LLM sozinho é um cavalo: forte, rápido e meio caótico. O harness é o que transforma esse cavalo em uma carruagem que chega no destino.

Quando alguém diz "o Claude Code é um *agentic harness*", está dizendo: existe um LLM no centro, e em volta dele existe uma camada de software que decide quais ferramentas ele pode chamar, qual contexto ele recebe, quais regras ele precisa seguir, quando ele para, o que acontece quando ele falha. **Essa camada é o harness.**

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Claude, me dá uma analogia bem concreta. Eu uso você todo dia mas nunca tinha pensado no termo "harness" assim.</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Pensa num piloto de Fórmula 1. O piloto é o LLM — talento bruto, capaz de tomar decisões em milissegundos. Mas ele sozinho não vence corrida nenhuma. Em volta dele tem: o carro (as <strong>tools</strong> que ele pode usar — volante, freio, acelerador), o regulamento da FIA (as <strong>rules</strong>), o engenheiro no rádio (as <strong>skills</strong> ativadas conforme a situação), o briefing pré-corrida (as <strong>specs</strong>) e o telemetry que diz quanto combustível ainda dá (a <strong>janela de contexto</strong>). Tudo isso junto é o harness. Tira qualquer peça e o piloto bate no primeiro S do Senna.</div>
    </div>
  </div>
</div>

---

## Por que esse conceito importa agora?

Até pouco tempo atrás, "usar IA pra programar" significava abrir o ChatGPT, colar código, copiar resposta. O LLM era um oráculo isolado: você pergunta, ele responde, você decide o que fazer.

A geração atual de ferramentas — Claude Code, Cursor, Cline, Aider, Codex — mudou essa equação. O LLM agora age **dentro** do seu projeto: lê arquivos, roda comandos, faz commits, abre PRs. E para que ele aja sem destruir tudo, alguém precisou construir uma camada de contenção e orientação ao redor dele.

Essa camada é o que diferencia uma demo bonita de uma ferramenta que aguenta o dia a dia de uma equipe. **A qualidade do harness importa mais do que a qualidade bruta do modelo.** Um modelo mediano num harness excelente entrega mais valor que um modelo top de linha num harness pobre.

A partir daqui, vamos passar pelos termos que aparecem o tempo todo nesse vocabulário. Cada um é uma peça do arnês.

---

## Janela de contexto (Context window)

A **janela de contexto** é a quantidade máxima de texto (medida em **tokens**) que o LLM consegue "enxergar" de uma vez. Tudo o que importa para a tarefa precisa caber ali dentro: a sua pergunta, o histórico da conversa, os arquivos que o agente leu, as definições das tools, as regras do projeto, as respostas anteriores do modelo.

Modelos recentes oferecem janelas de **200 mil**, **1 milhão** ou até mais tokens — números que parecem astronômicos mas se esgotam rápido quando o agente começa a ler arquivos grandes ou a rodar comandos verbosos.

O harness é quem **gerencia a janela**: decide o que entra, o que sai, o que vira resumo, o que é jogado fora. Sem essa gerência, em três interações você teria estourado o limite.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Como é que eu "vejo" o quanto da janela já foi consumido enquanto estou trabalhando com você?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">No Claude Code você consegue ligar uma <strong>status line</strong> que mostra a porcentagem de tokens usados em tempo real — é um dos primeiros ajustes que vale fazer no seu <code>settings.json</code>. Exercício prático: abre uma sessão nova, pede pra eu ler três arquivos grandes do seu projeto e observa o número subir. Vai ver que um único <code>cat</code> de um log de 5MB consome mais janela do que dez perguntas técnicas seguidas. Isso muda a forma como você delega tarefas: leituras pesadas viram trabalho de <strong>subagentes</strong>, que devolvem só o resumo pra janela principal.</div>
    </div>
  </div>
</div>

---

## Spec-Driven Development (SDD)

**Spec-Driven Development** é a prática de escrever uma **especificação clara antes de pedir ao agente para implementar**. Em vez de mandar "cria um endpoint de login", você produz um documento que descreve o comportamento esperado, os casos de borda, os contratos de entrada e saída, e só depois entrega ao agente para implementar.

A ideia não é nova — é basicamente engenharia de software como sempre foi feita, só que com um detalhe novo: **o agente é um leitor literal**. Ele faz exatamente o que está escrito, e omissões viram suposições. Uma spec bem feita reduz o "telefone sem fio" entre o que você quis dizer e o que o modelo entendeu.

O fluxo típico do SDD com agentes é:

1. **Brainstorm** — uma conversa com o agente para esclarecer requisitos.
2. **Spec** — documento curto que captura decisões e critérios de aceitação.
3. **Plan** — desdobramento da spec em passos implementáveis.
4. **Work** — o agente executa o plano.
5. **Review** — você (ou outro agente) revisa o resultado contra a spec.

Cada uma dessas etapas tende a virar um *slash command* ou um *skill* dentro do harness.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Eu sou meio resistente a escrever spec — sempre dá vontade de ir direto pro código. Como você me convenceria a gastar 20 minutos numa spec antes de te pedir pra implementar?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Pensa assim: sem spec, eu vou inferir os requisitos do nada e você vai gastar 40 minutos depois corrigindo as inferências erradas. Com spec, você gasta 20 minutos na frente e os outros 40 viram zero. Faz esse teste no próximo CRUD: numa janela, me pede direto "<em>cria um endpoint de cadastro de cliente</em>". Em outra, escreve uma spec de 15 linhas (campos obrigatórios, validações, formato da resposta, código HTTP de erro) e me entrega. Compara as duas saídas. Boa leitura sobre o tema: o post <strong>"Spec-driven AI coding"</strong> do Sean Grove (oai.com/blog) e os experimentos que a comunidade Claude Code tem documentado em torno do comando <code>/plan</code>.</div>
    </div>
  </div>
</div>

---

## Specs

Uma **spec** (de *specification*) é o documento curto que descreve **o que** deve ser construído e **por quê** — sem entrar em **como**. Ela vive próxima do código (geralmente em `docs/specs/` ou `specs/`) e é tratada como artefato versionado.

Uma spec útil costuma ter:

- **Objetivo** — uma frase explicando a intenção.
- **Contexto** — por que isso é necessário agora.
- **Comportamento esperado** — bullets descritivos, em linguagem natural.
- **Casos de borda** — o que acontece quando dá errado.
- **Critérios de aceitação** — como saber que está pronto.
- **Não-objetivos** — o que explicitamente fica de fora.

A última seção é a que mais economiza tempo com agentes: declarar explicitamente o que *não* fazer evita que o modelo invente features que ninguém pediu.

---

## ADRs (Architecture Decision Records)

**ADR** significa *Architecture Decision Record*. É um documento curto que registra **uma decisão arquitetural relevante**, junto com o contexto que a motivou e as consequências esperadas. O formato foi popularizado por Michael Nygard e virou padrão em muitos times.

A estrutura clássica de um ADR tem quatro seções:

1. **Contexto** — qual era o problema ou a situação na época.
2. **Decisão** — o que foi escolhido.
3. **Status** — proposto / aceito / substituído.
4. **Consequências** — o que ganhamos e o que perdemos com essa escolha.

Em um projeto que trabalha com agentes, ADRs cumprem um papel duplo: orientam o time humano *e* alimentam o contexto do agente. Quando você abre uma sessão pedindo "implemente o cache de sessão usando Redis", o agente que leu o ADR-007 sabe que o projeto já decidiu padronizar TTL em 24h e usar a estratégia de *cache-aside*.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Tenho preguiça de escrever ADR porque parece burocracia. Tem um jeito prático de começar?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Começa pequeno e barato: cria um diretório <code>docs/adr/</code> e um arquivo <code>0001-record-architecture-decisions.md</code> que decide... usar ADRs. Cada novo ADR vira um arquivo numerado sequencialmente. Use o template do <strong>adr-tools</strong> (github.com/npryce/adr-tools) — são quatro seções e três parágrafos cada uma. Exercício: pega a última decisão técnica não-óbvia do seu projeto (escolha de banco, formato de fila, estratégia de auth) e escreve o ADR retroativo. Bônus: na próxima sessão comigo, me pede pra ler <code>docs/adr/</code> antes de implementar qualquer coisa nova — você vai ver a diferença na primeira sugestão.</div>
    </div>
  </div>
</div>

---

## RFCs (Request for Comments)

**RFC** vem de *Request for Comments* — formato cunhado pela IETF nos anos 70 para discutir mudanças em padrões da internet. No contexto de empresas de software (Rust, Stripe, Squarespace, Basecamp), virou o nome do **documento de proposta que precede uma mudança grande**.

A diferença prática entre RFC, spec e ADR:

| Documento | Quando | O que captura |
|-----------|--------|----------------|
| **RFC**   | Antes de decidir | A proposta, alternativas consideradas, discussão aberta |
| **ADR**   | Depois de decidir | A decisão tomada e o porquê |
| **Spec**  | Antes de implementar | O comportamento esperado da feature |

Em um time saudável, um RFC vira um (ou vários) ADRs depois da discussão, e cada ADR pode gerar uma ou mais specs de implementação. **O harness se beneficia de todos esses artefatos**: quanto mais texto bem-organizado existir no repositório descrevendo intenção e racionalidade, melhor o agente consegue navegar e decidir.

---

## Rules (regras)

**Rules** são instruções permanentes que você dá ao agente — preferências, convenções e proibições que devem valer em **todas** as sessões. No Claude Code elas moram em arquivos `CLAUDE.md` (no projeto e/ou globais), no Cursor moram em `.cursorrules`, no Cline em `.clinerules`, e assim por diante.

Boas rules são **específicas e acionáveis**. Compare:

- ❌ "escreva código de boa qualidade"
- ✅ "no diretório `lib/`, use `attr_reader` em vez de definir getters manualmente"

A diferença é que a segunda **pode ser verificada**. Rules genéricas viram ruído; rules concretas viram comportamento.

Em projetos maiores, as rules costumam declarar:

- Stack e versões em uso (Ruby 3.3, Rails 7.2, Postgres 16).
- Convenções de nomenclatura e estilo.
- Comandos de teste, lint e build.
- O que **não** fazer (não mexer em migrations antigas, não rodar `db:reset` sem confirmar).

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Tem um limite saudável pra quantas rules colocar no <code>CLAUDE.md</code>? Sinto que quanto mais eu escrevo, menos você obedece.</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Sua intuição está correta — e tem dois motivos. Primeiro: cada token de rule consome janela de contexto, então rules infinitas competem com o código que eu preciso ler. Segundo: quando há muita regra, eu tenho que escolher quais priorizar, e nem sempre acerto. Regra prática que funciona bem: mantenha o <code>CLAUDE.md</code> abaixo de <strong>150 linhas</strong>, foco em convenções não-óbvias do <em>seu</em> projeto (o que difere do padrão da comunidade) e em comandos de verificação. O resto — tutoriais, exemplos longos, instruções de tarefas específicas — empurra pra <strong>skills</strong>, que carregam só quando relevantes. Faz um experimento: corta seu <code>CLAUDE.md</code> pela metade por uma semana e veja se a obediência melhora.</div>
    </div>
  </div>
</div>

---

## Skills

**Skills** são pacotes de conhecimento e procedimento que o agente **carrega sob demanda** — só quando a tarefa pede. Diferente das rules (que estão sempre presentes), uma skill fica adormecida até ser invocada por contexto ou por nome.

Uma skill típica é uma pasta com um `SKILL.md` na raiz, descrevendo:

- **Quando ativar** (triggers em linguagem natural).
- **O passo a passo** que o agente deve seguir.
- **Arquivos de apoio** (templates, snippets, exemplos).

Exemplos de skills no ecossistema Claude Code: `tdd` (faz red-green-refactor disciplinado), `diagnose` (loop de debug com hipótese-instrumentação-teste), `to-issues` (quebra um plano em tickets), `grill-me` (entrevista você para validar uma proposta).

A grande sacada das skills é a **disclosure progressiva**: o agente lê o nome e a descrição de todas as skills (barato), mas só lê o conteúdo completo da skill que vai usar (caro). Isso permite ter dezenas de procedimentos disponíveis sem pagar o custo de janela por todos eles.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Como eu sei quando algo deveria ser rule, skill ou só uma instrução solta na conversa?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Heurística rápida: <strong>rule</strong> se vale pra todo trabalho neste projeto ("use 2 espaços de indentação"); <strong>skill</strong> se é um procedimento de várias etapas que vale só em certas situações ("revisar um PR", "escrever um post de blog", "depurar uma race condition"); <strong>conversa</strong> se é só pra esta tarefa específica ("nesse refactor, mantém o nome do método antigo como alias"). Sintoma de que algo virou skill: você está repetindo as mesmas 5 instruções toda vez que pede uma coisa. Sintoma de rule mal-colocada: ela é gigante e só ativa em 10% das sessões — provavelmente é skill disfarçada. O próprio Claude Code tem um comando <code>/write-a-skill</code> que entrevista você e gera a skill formatada.</div>
    </div>
  </div>
</div>

---

## Tools (ferramentas) e MCP

**Tools** são as funções que o agente pode chamar — leitura de arquivo, execução de shell, busca na web, query em banco. Cada tool é declarada no harness com nome, descrição e schema de entrada; o LLM lê essas descrições e decide quando invocar cada uma.

O **MCP (Model Context Protocol)** é um padrão aberto criado pela Anthropic para **expor tools de forma reutilizável** entre diferentes clientes de IA. Em vez de cada agente reimplementar "ler email do Gmail" ou "consultar Jira", você sobe um servidor MCP uma vez e qualquer cliente compatível (Claude Code, Cursor, etc.) passa a usar.

Pense no MCP como o "USB-C dos agentes": um conector padronizado entre o cérebro e o mundo.

---

## Subagentes

**Subagentes** (ou *sub-agents*) são agentes que o agente principal pode lançar para tarefas específicas, geralmente em paralelo. Cada subagente tem **a sua própria janela de contexto**, executa o seu trabalho isoladamente, e devolve um resumo curto para o agente que o lançou.

A vantagem é dupla: paraleliza trabalho independente e **protege a janela principal** de leituras pesadas. Se você precisa que cinco arquivos enormes sejam analisados, fazer isso no agente principal queima toda a janela; delegar a cinco subagentes resolve o problema gastando contexto apenas com o resumo final.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Tem algum sinal claro de "agora é hora de delegar pra subagente"?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Três sinais bem práticos: (1) <strong>busca exploratória</strong> — você quer saber "<em>onde no codebase a gente lida com X</em>" e a resposta vai envolver ler dezenas de arquivos; (2) <strong>trabalho independente em paralelo</strong> — três features pequenas que não se cruzam, lança três subagentes em paralelo e ganha tempo de parede; (3) <strong>tarefa de leitura pesada com saída pequena</strong> — analisar um log de 10MB pra extrair três linhas relevantes. Antipadrão clássico: usar subagente pra escrever código que o agente principal precisa entender em detalhe depois — aí você só perde contexto. Regra de bolso: <strong>delegue leituras, faça as decisões no agente principal</strong>.</div>
    </div>
  </div>
</div>

---

## Hooks

**Hooks** são scripts que o harness dispara automaticamente em momentos específicos do ciclo de vida do agente: antes de uma tool rodar, depois de um arquivo ser editado, ao receber um prompt, ao terminar uma sessão. Eles transformam regras estáticas em **comportamento ativo**.

Exemplos comuns:

- Rodar `prettier` automaticamente depois de cada `Edit` em arquivos `.ts`.
- Bloquear comandos perigosos (`rm -rf`, `git push --force`) antes que executem.
- Notificar via Slack quando o agente terminar uma sessão longa.
- Logar todas as tools usadas para auditoria.

Hooks são onde o harness deixa de ser passivo e começa a ter **opinião sobre o trabalho do agente em tempo real**.

---

## Slash Commands

**Slash commands** (comandos `/foo`) são atalhos para acionar fluxos do harness ou skills específicas. No Claude Code, comandos como `/plan`, `/work`, `/review`, `/init` empacotam workflows inteiros — o usuário digita uma palavra, o harness expande para uma sequência de prompts, leituras de arquivos e invocações de tools.

A diferença prática entre **slash command** e **skill** é sutil: o slash command é a *interface*, a skill é o *conteúdo*. Muitos slash commands chamam skills por baixo dos panos.

---

## Permissões e sandbox

Toda essa máquina precisa de **limites**. Permissões definem o que o agente pode fazer sem perguntar, o que ele precisa pedir aprovação e o que está terminantemente proibido. Em projetos sérios, o agente roda dentro de um **sandbox** (container, máquina virtual leve, devbox isolado) para que mesmo um comando errado não consiga estragar nada importante.

O harness é quem aplica essas permissões: intercepta a tool antes da execução, checa contra a lista de regras, decide se executa, pede confirmação ou recusa.

---

## Juntando tudo: o harness como sistema

Repare na lista do que percorremos:

- **Janela de contexto** — quanto cabe.
- **Specs, ADRs, RFCs** — o que precisa ser construído e por quê.
- **Rules** — convenções sempre ativas.
- **Skills** — procedimentos sob demanda.
- **Tools e MCP** — ações no mundo.
- **Subagentes** — paralelismo e proteção de contexto.
- **Hooks** — automação reativa.
- **Slash commands** — interface ergonômica.
- **Permissões e sandbox** — limites de segurança.

Cada item, isolado, é simples. **O harness é a montagem deles num sistema coerente** que pega um LLM e o transforma em um colaborador de engenharia.

Quando você escolhe (ou constrói) um harness, está escolhendo opiniões sobre cada uma dessas dimensões: o quanto delegar ao modelo, o quanto escrever em texto, o quanto automatizar, o quanto travar.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Pra fechar: por onde eu começo a melhorar o "harness" da minha rotina de hoje pra amanhã?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Três passos pequenos com retorno alto: <strong>(1)</strong> escreve ou enxuga o <code>CLAUDE.md</code> do seu projeto principal — 100 linhas focadas em convenções não-óbvias e comandos de verificação; <strong>(2)</strong> cria <code>docs/adr/</code> e registra retroativamente as três decisões arquiteturais mais importantes do projeto; <strong>(3)</strong> da próxima feature em diante, faz Spec-Driven: 15 minutos de spec antes de me pedir pra implementar. Em uma semana você já vai sentir a diferença na qualidade do que sai da nossa colaboração — não porque eu mudei, mas porque o harness ao meu redor ficou melhor. E lembra: <strong>harness não é uma compra única, é um músculo</strong>. Cada projeto bom tem o seu, e ele evolui junto com o time.</div>
    </div>
  </div>
</div>
