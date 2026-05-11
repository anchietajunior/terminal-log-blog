---
title: "Criando um agente de IA em Ruby puro: do conceito à primeira execução"
author: anchietajunior
date: 2026-05-11 00:00:00 -0300
categories: [AI, Ruby]
tags: [ai, agents, llm, ruby, claude, anthropic]
layout: post
lang: pt-br
---

# O que é um agente de IA?

Antes de escrever uma linha de código, vale separar dois conceitos que vivem misturados:

- **LLM (Large Language Model)** — uma função pura: recebe texto, devolve texto. Sem memória, sem ações, sem mundo externo. Você manda uma mensagem, ele responde uma vez e acabou.
- **Agente de IA** — um LLM dentro de um **loop**, com acesso a **ferramentas** que ele decide quando chamar. O loop só termina quando o modelo diz "acabei".

A diferença não é técnica, é arquitetural. Um chatbot é um LLM com histórico. Um agente é um LLM com **autonomia para agir**.

## Os quatro componentes de um agente

Praticamente todo agente — do mais simples ao mais sofisticado — combina os mesmos quatro elementos:

1. **Modelo** — o "cérebro" que decide o próximo passo. Hoje, normalmente um LLM (Claude, GPT, Llama).
2. **Ferramentas (tools)** — funções do seu código que o modelo pode chamar: ler arquivo, consultar banco, fazer requisição HTTP, executar SQL.
3. **Loop de execução** — quem orquestra: pergunta ao modelo, executa a ferramenta que ele pediu, devolve o resultado, repete.
4. **Critério de parada** — quando o modelo sinaliza `end_turn`, ou quando o loop atinge um limite de iterações.

É isso. Tudo o que você ouve falar sobre "agentes autônomos", "multi-agentes", "ReAct", "function calling" — são variações em cima dessa estrutura.

---

## A anatomia de uma chamada com tools

A API da Anthropic (e a da OpenAI, com nomes diferentes) expõe esse padrão de forma direta. O fluxo é:

```
Você  →  [mensagens + descrição das tools]  →  Modelo
Modelo  →  responde tool_use(name, input)  →  Você
Você executa a tool  →  manda tool_result  →  Modelo
Modelo  →  responde texto final (end_turn)
```

O modelo nunca executa nada — ele só **descreve** o que quer fazer. Quem executa é o seu código. Isso é fundamental: o agente é seu, o LLM é só o tomador de decisão.

---

## Construindo um agente mínimo em Ruby puro

Vamos construir um agente que sabe duas coisas:

- **`current_time`** — retorna a hora atual.
- **`read_file`** — lê um arquivo do disco.

Sem gem `anthropic`, sem Rails. Para a chamada HTTP, vamos usar a **HTTParty** — uma gem clássica do ecossistema Ruby que deixa o cliente bem mais enxuto que `net/http` puro.

```sh
gem install httparty
```

### Estrutura

```
mini_agent/
├── lib/
│   ├── agent.rb       # o loop
│   ├── client.rb      # cliente HTTP da API
│   └── tools.rb       # implementação das ferramentas
└── bin/agent          # executável
```

### O cliente HTTP

```ruby
# lib/client.rb
require "httparty"

class Client
  include HTTParty

  base_uri "https://api.anthropic.com"
  format   :json

  MODEL = "claude-sonnet-4-6"

  def initialize(api_key: ENV.fetch("ANTHROPIC_API_KEY"))
    @headers = {
      "x-api-key"         => api_key,
      "anthropic-version" => "2023-06-01",
      "content-type"      => "application/json"
    }
  end

  def call(messages, tools)
    body = {
      model:      MODEL,
      max_tokens: 1024,
      tools:      tools,
      messages:   messages
    }

    self.class.post("/v1/messages", headers: @headers, body: body.to_json).parsed_response
  end
end
```

A HTTParty resolve três chatices de uma vez: parseia o JSON da resposta automaticamente (`parsed_response`), aceita `base_uri` para deixar as rotas curtas, e expõe `post`/`get`/`put` como métodos de classe. O cliente inteiro cabe em pouco mais de 20 linhas.

### As ferramentas

```ruby
# lib/tools.rb
module Tools
  DEFINITIONS = [
    {
      name:        "current_time",
      description: "Retorna a data e hora atual no fuso de São Paulo.",
      input_schema: { type: "object", properties: {} }
    },
    {
      name:        "read_file",
      description: "Lê o conteúdo de um arquivo de texto local.",
      input_schema: {
        type: "object",
        properties: {
          path: { type: "string", description: "Caminho do arquivo" }
        },
        required: ["path"]
      }
    }
  ].freeze

  module_function

  def run(name, input)
    case name
    when "current_time" then Time.now.strftime("%Y-%m-%d %H:%M:%S %z")
    when "read_file"    then File.read(input.fetch("path"))
    else                     "tool desconhecida: #{name}"
    end
  rescue => e
    "erro: #{e.message}"
  end
end
```

A `DEFINITIONS` é o que o modelo enxerga — ele lê o `description` para decidir quando usar cada tool. O `run` é o despachante: recebe o nome e os argumentos que o modelo pediu, executa, devolve uma string.

O `rescue` é proposital: se a tool falhar, o erro vira input para o modelo, que normalmente consegue se recuperar (tentar outro caminho, pedir mais informação, desistir educadamente).

### O loop

O coração do agente. Com comentários explicando cada passo:

```ruby
# lib/agent.rb
require_relative "client"
require_relative "tools"

class Agent
  MAX_ITERATIONS = 10

  def initialize
    @client   = Client.new
    @messages = []
  end

  def ask(prompt)
    @messages << { role: "user", content: prompt }

    MAX_ITERATIONS.times do
      response = @client.call(@messages, Tools::DEFINITIONS)
      @messages << { role: "assistant", content: response["content"] }

      return final_text(response) if response["stop_reason"] == "end_turn"

      tool_results = response["content"]
        .select { |block| block["type"] == "tool_use" }
        .map    { |block| execute(block) }

      @messages << { role: "user", content: tool_results }
    end

    "[limite de iterações atingido]"
  end

  private

  def execute(block)
    output = Tools.run(block["name"], block["input"])
    {
      type:        "tool_result",
      tool_use_id: block["id"],
      content:     output.to_s
    }
  end

  def final_text(response)
    response["content"]
      .select { |block| block["type"] == "text" }
      .map    { |block| block["text"] }
      .join("\n")
  end
end
```

Três coisas merecem atenção aqui:

- **O histórico inteiro vai junto a cada chamada.** O LLM não tem memória; quem mantém o estado é o array `@messages`.
- **`tool_use_id` precisa bater.** Cada `tool_use` que o modelo emite tem um ID único, e o `tool_result` correspondente precisa referenciar esse mesmo ID — é assim que o modelo associa pergunta e resposta.
- **`MAX_ITERATIONS` é um cinto de segurança.** Sem ele, um modelo confuso pode te custar caro. Sempre tenha um teto.

### O executável

```ruby
#!/usr/bin/env ruby
# bin/agent
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "agent"

agent = Agent.new
puts agent.ask(ARGV.join(" "))
```

```sh
chmod +x bin/agent
export ANTHROPIC_API_KEY="sk-ant-..."
bin/agent "Que horas são agora? E me diga o que tem no Gemfile."
```

Saída esperada (algo nessa linha):

```
Agora são 2026-05-11 14:23:07 -0300.

O Gemfile contém as dependências do projeto: jekyll na versão 4.4.1,
o tema minima, e plugins como jekyll-feed e jekyll-seo-tag.
```

Por baixo dos panos, o que aconteceu:

1. O modelo recebeu a pergunta e decidiu chamar `current_time`.
2. Você executou e devolveu o resultado.
3. O modelo decidiu chamar `read_file` com `path: "Gemfile"`.
4. Você leu o arquivo e devolveu o conteúdo.
5. O modelo escreveu a resposta final em texto e marcou `end_turn`.

Tudo isso em uma única chamada `agent.ask`.

---

## O que esse exemplo deixa de fora (de propósito)

Para manter o foco, o agente acima ignora algumas coisas que você vai querer em produção:

- **Streaming** — a resposta vem inteira, em vez de chegar token a token.
- **Persistência de conversa** — o histórico mora em memória e morre com o processo.
- **Validação de input das tools** — o modelo pode mandar argumentos malformados; aqui só confiamos.
- **Custo e tokens** — não há contagem nem limite de gasto.
- **Permissões** — o `read_file` lê qualquer arquivo do sistema. Em um agente real, você precisa de um sandbox.

Cada um desses itens vira um post separado. O ponto aqui é mostrar que **um agente de IA, em sua forma mais essencial, cabe em umas 60 linhas de Ruby**.

---

## Resumo

| Componente | Responsabilidade | No exemplo |
|------------|------------------|------------|
| **Modelo** | Decidir o próximo passo | Claude via API HTTP |
| **Tools** | Executar ações no mundo | `current_time`, `read_file` |
| **Loop** | Orquestrar pergunta → ação → resultado | `Agent#ask` |
| **Parada** | Saber quando terminar | `stop_reason == "end_turn"` + teto de iterações |

Agente de IA não é mágica — é um padrão arquitetural simples em volta de um LLM. Uma vez que o loop está claro na sua cabeça, o resto (memória de longo prazo, multi-agentes, MCP, RAG) são camadas que você adiciona conforme o problema pede. Mas tudo começa aqui: **um modelo, algumas ferramentas, um loop**.
