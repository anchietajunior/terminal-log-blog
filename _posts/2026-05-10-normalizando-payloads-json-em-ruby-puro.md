---
title: "Normalizando payloads JSON heterogêneos em Ruby puro: um estudo de design patterns"
author: anchietajunior
date: 2026-05-10 00:00:00 -0300
categories: [Ruby, Design Patterns]
tags: [ruby, design-patterns, adapter, factory, minitest]
layout: post
lang: pt-br
---

# O problema

Considere o seguinte cenário:

> Você precisa construir uma aplicação em **Ruby puro** (sem Rails, sem Sinatra) que receba payloads JSON de **diversos fornecedores** (cada um com sua própria estrutura de dados) representando o mesmo conceito de domínio — por exemplo, um **ticket de viagem**. A aplicação deve identificar automaticamente de qual fornecedor o payload veio e tratá-lo de forma uniforme dentro do sistema.

Esse tipo de problema é interessante porque ele **não é sobre Ruby idiomático em si**, mas sim sobre escolher abstrações e aplicar **design patterns clássicos** sem cair em overengineering.

---

## Estrutura do projeto

```
ticket_normalizer/
├── lib/
│   ├── entrypoint.rb        # carrega tudo
│   ├── ticket.rb            # value object normalizado
│   ├── parser.rb            # fábrica que escolhe o adapter
│   └── adapters/
│       ├── base.rb          # interface comum
│       ├── alpha.rb         # fornecedor A
│       └── beta.rb          # fornecedor B
├── test/
│   ├── test_helper.rb
│   └── parser_test.rb
├── payloads/
│   ├── alpha.json
│   └── beta.json
└── bin/normalize            # script executável
```

Três pastas, uma responsabilidade cada: `lib/` é o código, `test/` é a verificação, `payloads/` são os exemplos para testar manualmente. O `bin/normalize` mostra como o consumidor usa a biblioteca.

---

## Design patterns aplicados

A solução combina três patterns. Cada um resolve uma responsabilidade específica.

### 1. Adapter Pattern

**O que é:** o Adapter converte a interface de uma classe em outra interface esperada pelo cliente. Ele traduz "dialetos" diferentes para uma linguagem comum.

**Por que aqui:** cada fornecedor envia o ticket com **chaves diferentes** e às vezes **unidades diferentes** (preço em reais vs. centavos, datas em ISO 8601 vs. timestamp). Em vez de espalhar `if vendor == :alpha` pelo código, isolamos cada tradução em uma classe própria.

**Interface base** — define o contrato que todo adapter precisa cumprir:

```ruby
# lib/adapters/base.rb
module Adapters
  class Base
    def self.matches?(payload) = raise NotImplementedError

    def initialize(payload) = @payload = payload

    def to_ticket = raise NotImplementedError

    private attr_reader :payload
  end
end
```

Dois métodos importantes:

- **`.matches?(payload)`** — heurística de detecção: presença de uma chave única, valor de um campo `provider`, formato de um ID etc.
- **`#to_ticket`** — converte o payload bruto em um `Ticket` normalizado.

**Adapters concretos:**

```ruby
# lib/adapters/alpha.rb
module Adapters
  class Alpha < Base
    def self.matches?(payload) = payload.key?("alpha_ticket_id")

    def to_ticket
      Ticket.new(
        external_id:    payload["alpha_ticket_id"],
        passenger_name: payload.dig("passenger", "full_name"),
        origin:         payload.dig("trip", "from"),
        destination:    payload.dig("trip", "to"),
        departure_at:   Time.parse(payload["departure_time"]),
        price_cents:    (payload["price"].to_f * 100).round,
        currency:       payload["currency"],
        vendor:         "alpha"
      )
    end
  end
end
```

```ruby
# lib/adapters/beta.rb
module Adapters
  class Beta < Base
    def self.matches?(payload) = payload["source"] == "beta_rail"

    def to_ticket
      data = payload["data"]
      Ticket.new(
        external_id:    data["id"],
        passenger_name: data["customer_name"],
        origin:         data["origin_station"],
        destination:    data["destination_station"],
        departure_at:   Time.at(data["departs_at_unix"]),
        price_cents:    data["price_in_cents"],
        currency:       data["currency_iso"],
        vendor:         "beta"
      )
    end
  end
end
```

**Toda a complexidade do payload original fica encapsulada** dentro de cada adapter. O resto do sistema só conhece `Ticket`.

### 2. Factory Pattern

**O que é:** a Factory é responsável por **decidir e instanciar** o objeto correto para uma situação. Aqui ela resolve a pergunta: *"dado este payload, qual adapter eu uso?"*

**Por que aqui:** centralizar a lógica de seleção em um único lugar evita que o cliente da biblioteca conheça todos os adapters. Adicionar um novo fornecedor não toca código existente — é o **Open/Closed Principle** na prática.

```ruby
# lib/parser.rb
require "json"

class Parser
  ADAPTERS = [Adapters::Alpha, Adapters::Beta].freeze
  UnknownVendorError = Class.new(StandardError)

  def self.parse(json)
    payload = JSON.parse(json)
    adapter = ADAPTERS.find { |a| a.matches?(payload) }
    raise UnknownVendorError unless adapter

    adapter.new(payload).to_ticket
  end
end
```

Detalhes que valem destacar:

- **`ADAPTERS.freeze`** comunica que aquela lista é o ponto de configuração do sistema.
- **`find` em vez de `select`**: o primeiro adapter que casa vence. A ordem da lista importa quando há heurísticas sobrepostas.
- **Erro tipado** permite ao chamador fazer `rescue UnknownVendorError` específico.

### 3. Value Object Pattern

**O que é:** um Value Object é um objeto **imutável** definido pelos seus atributos, não por uma identidade. Dois `Ticket` com os mesmos atributos são considerados iguais.

**Por que aqui:** o `Ticket` normalizado é **dado**, não comportamento. Usar `Data.define` deixa isso explícito e bloqueia mutação acidental.

```ruby
# lib/ticket.rb
Ticket = Data.define(
  :external_id, :passenger_name, :origin, :destination,
  :departure_at, :price_cents, :currency, :vendor
) do
  def price = price_cents / 100.0
end
```

`Data.define` (Ruby 3.2+) entrega de graça: construtor com argumentos nomeados, imutabilidade real, igualdade por atributos e `to_h`. Em versões anteriores, a alternativa é `Struct.new(..., keyword_init: true)`.

---

## Entrypoint e execução

O entry point só carrega as dependências na ordem certa:

```ruby
# lib/entrypoint.rb
require_relative "ticket"
require_relative "adapters/base"
require_relative "adapters/alpha"
require_relative "adapters/beta"
require_relative "parser"
```

O `bin/normalize` consome a biblioteca via stdin:

```ruby
#!/usr/bin/env ruby
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "entrypoint"

puts Parser.parse(ARGF.read).to_h.inspect
```

```sh
chmod +x bin/normalize
bin/normalize < payloads/alpha.json
bin/normalize < payloads/beta.json
```

---

## Testes com Minitest

Minitest está na stdlib desde o Ruby 1.9 — zero dependências externas. O estilo spec deixa a leitura próxima do RSpec.

```ruby
# test/test_helper.rb
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "minitest/autorun"
require "minitest/spec"
require "entrypoint"
```

```ruby
# test/parser_test.rb
require_relative "test_helper"

describe Parser do
  it "normaliza payload alpha" do
    ticket = Parser.parse(File.read("payloads/alpha.json"))
    _(ticket.vendor).must_equal "alpha"
    _(ticket.price_cents).must_be_kind_of Integer
  end

  it "normaliza payload beta" do
    ticket = Parser.parse(File.read("payloads/beta.json"))
    _(ticket.vendor).must_equal "beta"
  end

  it "rejeita payload desconhecido" do
    _ { Parser.parse('{"foo":"bar"}') }.must_raise Parser::UnknownVendorError
  end
end
```

Rodar os testes sem nenhuma ferramenta extra:

```sh
ruby -Ilib -Itest test/parser_test.rb
```

---

## Decisões de projeto

- **Por que `matches?` em vez de um campo `vendor` no payload?** Porque nem sempre o fornecedor envia esse campo. A heurística de detecção é responsabilidade do adapter.
- **Como adicionar um novo fornecedor?** Cria a classe em `lib/adapters/`, adiciona o `require_relative` no entrypoint e inclui na constante `ADAPTERS`. Zero alteração no código existente.
- **Por que não usar `dry-struct`, `ActiveModel`?** O foco é Ruby puro. A stdlib já oferece `Data`, `JSON` e `Minitest` — o suficiente para o escopo.

---

## Resumo

| Pattern | Responsabilidade | Onde mora |
|---------|-----------------|-----------|
| **Adapter** | Traduzir o payload de cada fornecedor para o modelo interno | `lib/adapters/*.rb` |
| **Factory** | Escolher o adapter certo para um payload | `Parser.parse` |
| **Value Object** | Representar o ticket normalizado de forma imutável | `lib/ticket.rb` |

Essa combinação resolve o problema com **alta coesão** (cada classe tem um propósito) e **alta extensibilidade** (novos fornecedores não tocam código existente). A elegância da solução não está em ser sofisticada — está em ser **proporcional ao problema**.
