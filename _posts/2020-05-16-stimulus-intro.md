---
title: Instalando e testando o Stimulus em uma aplicação Rails
author: anchietajunior
date: 2020-05-16 00:00:00 +0800
categories: [Rails, StimulusJS]
tags: [rails, stimulusjs]
math: true
mermaid: true
image: https://i.ibb.co/6nJYNyS/Group-4.png
layout: post
lang: pt-br
---

O [Stimulus](https://stimulusjs.org/) já não é mais nenhuma novidade na comunidade Ruby e Rails. De fato a cada dia se prova uma ferramenta muito útil e principalmente fácil e divertida de se utilizar quando precisamos de "reatividade" nas páginas dos nossos projetos mas não queremos/precisamos da complexidade adicionada por um React, Angular ou VueJS da vida. Como a própria descrição no site oficial diz: "Um framework Javascript modesto para o HTML que você já tem".

Neste exemplo vamos apenas configurar o [Stimulus](https://stimulusjs.org/) em uma aplicação Rails (versão 6) e criar alguns eventos para testarmos em uma página do nosso projeto.

## Criando um novo projeto

```sh
rails new stimulus-test
cd stimulus-test
bundle install
```

## Instalando o Stimulus

```sh
rails webpacker:install:stimulus
```

Apenas com esse comando o nosso projeto já está apto a utilizar as vantagens que o Stimulus nos oferece.

## Criando uma nova página e definindo rota principal

```sh
rails g controller pages home
```

No arquivo routes.rb, adicione o seguinte:

```ruby
root 'pages#home'
```

Agora execute a aplicação:

```sh
rails server
```

A página home criada anteriormente fica assim:

```erb
<h1>Click Counter</h1>
<div data-controller="counter">
  <span data-target="counter.number">0</span>
  <br/>
  <button data-action="click->counter#incrementCounter">Click</button>
</div>
```

## Criando controller Stimulus

Precisamos criar um controller Stimulus pra executar as ações que vamos criar na nossa página.

Na pasta app/javascript/controllers adicione um arquivo chamado counter_controller.js com o seguinte conteúdo:

```js
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["number"]

  incrementCounter() {
    this.numberTarget.innerHTML = parseInt(this.numberTarget.innerHTML) + 1
  }
}
```

![Counter](https://thumbs.gfycat.com/NauticalRegularBonobo-size_restricted.gif)

Opa! Temos um click counter bem simples, porém utilizando o Stimulus e de forma muito prática.

Praticamente linkamos o nosso counter_controller na div que exibe o número e botão para click através do atributo ***data-controller="counter"***. Linkamos também o nosso number ao target do counter controller através do atributo ***data-target="counter.number"***, ou seja, o nome do nosso controller e o target.

Por último, adicionamos o atributo ***data-action="click->counter#incrementCounter"*** ao nosso button pra que ele seja o responsável por executar a nossa função incrementCounter através do evento click.

## That's it!


É isso, uma forma muito simples de começar a criar páginas reativas no Rails utilizando o Stimulus, um framework JS muito simples e menos burocrático em relação as opções mais famosas do mercado.
