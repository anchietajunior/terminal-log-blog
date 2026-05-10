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

Esse tipo de problema é interessante porque ele **não é sobre Ruby idiomático em si**, mas sim sobre como organizar um pequeno projeto, escolher abstrações e aplicar **design patterns clássicos** sem cair em overengineering.

Neste post quero compartilhar como eu estruturaria essa solução, focando em três coisas:

1. Estrutura de pastas e arquivos
2. Design patterns aplicados (com explicação de cada um)
3. Como executar e testar o código com **Minitest**

---

## Estrutura do projeto

Mesmo sem Bundler ou Rails, vale a pena adotar uma estrutura próxima da convenção de gems Ruby. Isso deixa o projeto familiar para qualquer desenvolvedor Ruby e facilita evolução futura.

```
ticket_normalizer/
├── lib/
│   ├── ticket_normalizer.rb          # entry point que carrega tudo
│   ├── ticket.rb                     # value object normalizado
│   ├── parser.rb                     # orquestra a identificação + parsing
│   └── adapters/
│       ├── base_adapter.rb           # interface comum
│       ├── alpha_adapter.rb          # fornecedor A
│       ├── beta_adapter.rb           # fornecedor B
│       └── gamma_adapter.rb          # fornecedor C
├── test/
│   ├── test_helper.rb
│   ├── parser_test.rb
│   └── adapters/
│       ├── alpha_adapter_test.rb
│       ├── beta_adapter_test.rb
│       └── gamma_adapter_test.rb
├── examples/
│   ├── alpha.json
│   ├── beta.json
│   └── gamma.json
├── bin/
│   └── normalize                     # script executável de exemplo
├── Gemfile
└── README.md
```

Pontos importantes da estrutura:

- **`lib/`** contém o código de domínio. A regra é: tudo que `lib/ticket_normalizer.rb` precisa carregar fica aqui dentro.
- **`adapters/`** é uma subpasta dedicada porque cada novo fornecedor adiciona um arquivo aqui — é o ponto de extensão do projeto.
- **`examples/`** com payloads reais facilita testes manuais e demonstrações.
- **`bin/normalize`** representa o ponto de consumo da biblioteca pelo mundo externo.

---

## Design patterns aplicados

A solução usa três patterns complementares. Cada um resolve uma responsabilidade específica.

### 1. Adapter Pattern

**O que é:** o Adapter converte a interface de uma classe em outra interface esperada pelo cliente. Em outras palavras, ele traduz "dialetos" diferentes para uma linguagem comum.

**Por que aqui:** cada fornecedor envia o ticket com **chaves diferentes**, **estruturas aninhadas diferentes** e às vezes **unidades diferentes** (preço em centavos vs. reais, datas em ISO 8601 vs. timestamp). Em vez de espalhar `if vendor == :alpha` pelo código, isolamos cada tradução em uma classe própria.

**Interface base:**

```ruby
# lib/adapters/base_adapter.rb
module Adapters
  class BaseAdapter
    def self.matches?(payload)
      raise NotImplementedError, "#{name} must implement .matches?"
    end

    def initialize(payload)
      @payload = payload
    end

    def to_ticket
      raise NotImplementedError, "#{self.class.name} must implement #to_ticket"
    end

    private

    attr_reader :payload
  end
end
```

Dois métodos importantes:

- **`.matches?(payload)`** — método de classe que responde se aquele adapter sabe lidar com aquele payload. É a heurística de detecção (presença de uma chave única, valor de um campo `provider`, formato de um ID etc.).
- **`#to_ticket`** — converte o payload bruto em um `Ticket` normalizado.

**Implementação concreta:**

```ruby
# lib/adapters/alpha_adapter.rb
require_relative "base_adapter"
require_relative "../ticket"

module Adapters
  class AlphaAdapter < BaseAdapter
    def self.matches?(payload)
      payload.key?("alpha_ticket_id")
    end

    def to_ticket
      Ticket.new(
        external_id: payload.fetch("alpha_ticket_id"),
        passenger_name: payload.dig("passenger", "full_name"),
        origin: payload.dig("trip", "from"),
        destination: payload.dig("trip", "to"),
        departure_at: Time.parse(payload.fetch("departure_time")),
        price_cents: (payload.fetch("price").to_f * 100).round,
        currency: payload.fetch("currency", "EUR"),
        vendor: "alpha"
      )
    end
  end
end
```

```ruby
# lib/adapters/beta_adapter.rb
require_relative "base_adapter"
require_relative "../ticket"

module Adapters
  class BetaAdapter < BaseAdapter
    def self.matches?(payload)
      payload["source"] == "beta_rail"
    end

    def to_ticket
      data = payload.fetch("data")
      Ticket.new(
        external_id: data.fetch("id"),
        passenger_name: data.fetch("customer_name"),
        origin: data.fetch("origin_station"),
        destination: data.fetch("destination_station"),
        departure_at: Time.at(data.fetch("departs_at_unix")),
        price_cents: data.fetch("price_in_cents"),
        currency: data.fetch("currency_iso"),
        vendor: "beta"
      )
    end
  end
end
```

Repare como **toda a complexidade do payload original fica encapsulada** dentro de cada adapter. O resto do sistema só conhece `Ticket`.

### 2. Factory Pattern (mais especificamente, Strategy Selection)

**O que é:** o Factory é responsável por **decidir e instanciar** o objeto correto para uma situação. Aqui ele resolve a pergunta: *"dado este payload, qual adapter eu uso?"*

**Por que aqui:** centralizar a lógica de seleção em um único lugar evita que o cliente da biblioteca precise conhecer todos os adapters. Se amanhã chega um fornecedor novo, basta adicionar a classe e registrá-la — **nenhum código existente muda**. Isso é o **Open/Closed Principle** na prática.

```ruby
# lib/parser.rb
require "json"
require_relative "adapters/alpha_adapter"
require_relative "adapters/beta_adapter"
require_relative "adapters/gamma_adapter"

class Parser
  ADAPTERS = [
    Adapters::AlphaAdapter,
    Adapters::BetaAdapter,
    Adapters::GammaAdapter
  ].freeze

  UnknownVendorError = Class.new(StandardError)

  def self.parse(json_string)
    payload = JSON.parse(json_string)
    adapter = ADAPTERS.find { |a| a.matches?(payload) }

    raise UnknownVendorError, "No adapter matches payload" unless adapter

    adapter.new(payload).to_ticket
  end
end
```

Detalhes que valem destacar:

- **`ADAPTERS` é uma constante congelada (`.freeze`)**. Comunica que aquela lista é o ponto de configuração do sistema.
- **`find` em vez de `select`**: o primeiro adapter que casa vence. A ordem da lista importa quando há heurísticas sobrepostas.
- **Erro tipado (`UnknownVendorError`)** em vez de `raise "..."` genérico. Permite ao chamador fazer `rescue` específico.

### 3. Value Object Pattern

**O que é:** um Value Object é um objeto **imutável** definido pelos seus atributos, não por uma identidade. Dois `Ticket` com os mesmos atributos são considerados iguais.

**Por que aqui:** o `Ticket` normalizado não tem comportamento de domínio rico — ele é **dado**. Usar uma `Struct` (ou `Data` no Ruby 3.2+) deixa isso explícito e bloqueia mutação acidental.

```ruby
# lib/ticket.rb
Ticket = Data.define(
  :external_id,
  :passenger_name,
  :origin,
  :destination,
  :departure_at,
  :price_cents,
  :currency,
  :vendor
) do
  def price
    price_cents / 100.0
  end

  def to_h
    super.merge(price: price)
  end
end
```

`Data.define` (Ruby 3.2+) já entrega:

- Construtor com argumentos nomeados
- Imutabilidade real (não tem setters)
- `==`, `hash` e `eql?` baseados em atributos
- `to_h` automático

Em versões mais antigas do Ruby, a alternativa é `Struct.new(..., keyword_init: true)` — vale documentar a escolha no README do projeto.

---

## Entry point e script executável

O arquivo principal só carrega as dependências:

```ruby
# lib/ticket_normalizer.rb
require_relative "ticket"
require_relative "parser"
```

E o `bin/normalize` mostra como o consumidor usa a biblioteca:

```ruby
#!/usr/bin/env ruby
# bin/normalize
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "ticket_normalizer"

json = ARGF.read
ticket = Parser.parse(json)
puts ticket.to_h.inspect
```

Uso:

```sh
chmod +x bin/normalize
cat examples/alpha.json | bin/normalize
# ou
bin/normalize < examples/beta.json
```

---

## Testes com Minitest (estilo spec)

Quando o objetivo é manter o projeto em **Ruby puro**, o Minitest é a escolha natural — ele vem com a stdlib desde o Ruby 1.9 e não exige dependências externas. O estilo spec deixa os testes com leitura próxima do RSpec.

```ruby
# test/test_helper.rb
$LOAD_PATH.unshift(File.expand_path("../lib", __dir__))
require "minitest/autorun"
require "minitest/spec"
require "ticket_normalizer"
```

```ruby
# test/parser_test.rb
require_relative "test_helper"

describe Parser do
  describe ".parse" do
    it "normaliza um payload do fornecedor alpha" do
      json = File.read("examples/alpha.json")
      ticket = Parser.parse(json)

      _(ticket).must_be_kind_of Ticket
      _(ticket.vendor).must_equal "alpha"
      _(ticket.price_cents).must_be_kind_of Integer
    end

    it "normaliza um payload do fornecedor beta" do
      json = File.read("examples/beta.json")
      ticket = Parser.parse(json)

      _(ticket.vendor).must_equal "beta"
    end

    it "lança UnknownVendorError para payloads não reconhecidos" do
      json = '{"foo":"bar"}'

      _ { Parser.parse(json) }.must_raise Parser::UnknownVendorError
    end

    it "lança JSON::ParserError para JSON inválido" do
      _ { Parser.parse("not json") }.must_raise JSON::ParserError
    end
  end
end
```

```ruby
# test/adapters/alpha_adapter_test.rb
require_relative "../test_helper"

describe Adapters::AlphaAdapter do
  let(:payload) do
    {
      "alpha_ticket_id" => "A-123",
      "passenger" => { "full_name" => "José Anchieta" },
      "trip" => { "from" => "Lisboa", "to" => "Porto" },
      "departure_time" => "2026-06-01T08:30:00Z",
      "price" => 49.90,
      "currency" => "EUR"
    }
  end

  it "reconhece o payload pelo campo alpha_ticket_id" do
    _(Adapters::AlphaAdapter.matches?(payload)).must_equal true
  end

  it "ignora payloads sem o campo alpha_ticket_id" do
    _(Adapters::AlphaAdapter.matches?({})).must_equal false
  end

  it "converte preço de float para centavos" do
    ticket = Adapters::AlphaAdapter.new(payload).to_ticket

    _(ticket.price_cents).must_equal 4990
    _(ticket.currency).must_equal "EUR"
  end
end
```

### Executando os testes

Sem Rake, basta um comando:

```sh
ruby -Ilib -Itest -e "Dir.glob('./test/**/*_test.rb').each { |f| require f }"
```

Ou, mais elegante, criar um `Rakefile` mínimo:

```ruby
# Rakefile
require "rake/testtask"

Rake::TestTask.new do |t|
  t.libs << "lib"
  t.libs << "test"
  t.test_files = FileList["test/**/*_test.rb"]
end

task default: :test
```

E rodar:

```sh
rake
```

---

## Como executar localmente para validar

Roteiro mínimo para garantir que a aplicação está funcionando ponta a ponta:

```sh
# 1. Versão do Ruby
ruby --version    # 3.2+ recomendado por causa de Data.define

# 2. Rodar os testes
rake

# 3. Testar a CLI com cada exemplo
bin/normalize < examples/alpha.json
bin/normalize < examples/beta.json
bin/normalize < examples/gamma.json

# 4. Testar caso de erro
echo '{"foo":"bar"}' | bin/normalize
```

---

## Decisões de projeto e trade-offs

Algumas escolhas da solução são **deliberadamente simples**. Vale registrar o raciocínio por trás de cada uma:

- **Por que `matches?` em vez de um campo `vendor` no payload?** Porque nem sempre o fornecedor envia esse campo. A heurística de detecção é responsabilidade do adapter.
- **E se duas heurísticas casarem para o mesmo payload?** A ordem do `ADAPTERS` define precedência. Em produção, vale adicionar um teste que garante que payloads de exemplo só casam com um adapter.
- **Como adicionar um novo fornecedor?** Cria a classe em `lib/adapters/`, adiciona o `require_relative` e inclui na constante `ADAPTERS`. Zero alteração no código existente — Open/Closed.
- **Por que não usar `dry-struct`, `ActiveModel`, etc.?** O foco é Ruby puro. A stdlib já oferece `Data`, `Struct`, `JSON`, `Minitest` — usar mais que isso seria overengineering para o escopo do problema.
- **Validação de payload?** Em uma versão de produção, eu adicionaria uma camada de validação por adapter (chaves obrigatórias, tipos esperados). Para o estudo conceitual, deixei de fora intencionalmente.

---

## Resumo

Os três patterns trabalhando juntos:

| Pattern | Responsabilidade | Onde mora |
|---------|-----------------|-----------|
| **Adapter** | Traduzir o payload de cada fornecedor para o modelo interno | `lib/adapters/*.rb` |
| **Factory** | Escolher o adapter certo para um payload | `Parser.parse` |
| **Value Object** | Representar o ticket normalizado de forma imutável | `lib/ticket.rb` |

Essa combinação resolve o problema com **baixa complexidade ciclomática**, **alta coesão** (cada classe tem um propósito) e **alta extensibilidade** (novos fornecedores não tocam código existente).

Mais importante do que o código em si é **conseguir explicar por que cada peça existe** e **quais alternativas foram consideradas e descartadas**. A elegância da solução não está em ser sofisticada — está em ser **proporcional ao problema**.
