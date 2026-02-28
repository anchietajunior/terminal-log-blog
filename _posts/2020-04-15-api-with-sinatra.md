---
title: Criando JSON APIs com Sinatra e manuseando os parâmetros das requisições
author: anchietajunior
date: 2020-04-15 00:00:00 +0800
categories: [Sinatra]
tags: [sinatra, api, rest]
math: true
mermaid: true
layout: post
lang: pt-br
---

## Já ouviu falar no Sinatra?

O [Sinatra](http://sinatrarb.com/) é um framework (ou microframework como alguns gostam de chamar) escrito em Ruby e baseado na interface [Rack](https://thoughtbot.com/upcase/videos/rack), basicamente a mesma base do Rails, porém com uma abordagem bem mais ***"minimalista"***. Pessoalmente é a ferramenta que mais tenho gostado de trabalhar ultimamente por me forçar a criar determinadas coisas que o Rails já me entrega por padrão, como a estrutura/organização dos arquivos, a forma de efetuar os imports e até as rake tasks padrão do Rails como ***console*** e ***db***.

Com todo o contexto de microsserviços de hoje, quando pensamos em criar pequenas partes de um grande sistema, faz todo o sentido utilizar uma ferramenta como o Sinatra, então nesse post vamos criar uma API Rest respondendo e recebendo dados através da notação JSON.

## Requisitos

Se você já possui o Ruby instalado na sua máquina, a probabilidade de já conseguir criar uma app Sinatra é grande. Atualmente estou utilizando a versão ***2.6.2*** do Ruby.

### Instalando o Sinatra

Caso não tenha o sinatra ainda, basta executar o seguinte comando no terminal:

```sh
gem install sinatra
```

### Criando o projeto

Executando apenas alguns comandos no terminal para criar uma nova pasta e um arquivo Ruby:

```sh
mkdir sinatra_api
cd sinatra_api
touch app.rb
```

### Criando a primeira Rota

Para criar uma rota que receba uma requisição e retorne algo no Sinatra vamos utilizar o seguinte código no arquivo ***app.rb***:

```ruby
require 'sinatra'

get '/books' do
  "Livros sobre Sinatra"
end
```

Sim, isso é o suficiente.

### Testando

No terminal execute:

```sh
ruby app.rb
```

O resultado deve ser parecido com esse:

```sh
== Sinatra (v2.0.8.1) has taken the stage on 4567 for development with backup from Puma
Puma starting in single mode...
* Version 4.1.1 (ruby 2.6.2-p47), codename: Fourth and One
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:4567
Use Ctrl-C to stop
```

Agora acesse no seu browser o seu localhost na porta 4567, essa é a porta padrão do Sinatra.

### JSON

E se eu quiser começar a responder minhas requests com JSON? Prepare-se, isso é bem difícil (Ironic Mode On), vamos alterar o arquivo app.rb:

```ruby
require 'sinatra'
require 'json'

get '/books' do
  { message: "Livros sobre Sinatra" }.to_json
end
```

Pare o servidor utilizando o comando CTRL + C e reinicie a app com ***ruby app.rb*** de novo e a "mágica acontecerá".

### Parâmetros

E se eu precisar utilizar os parâmetros recebidos pelo Sinatra e fazer algo depois? Bom, primeiro vamos falar sobre os tipos de parâmetros.

#### Routing Params

Os routing params ou parâmetros de rota são aqueles que passamos geralmente juntos de algum recurso (resource) como users ou posts e são utilizados geralmente em requisições dos tipos ***GET***, ***PUT***, ***PATCH*** e ***DELETE***, exemplo:

```
-> servidor/recurso/:id

ou geralmente assim:

-> http://localhost:4567/books/1500
```

No Sinatra podemos criar uma nova rota aceitando um Routing Param da seguinte forma:

```ruby
get '/books/:id' do |id|
  { message: "Esse é o id do livro: #{id}" }.to_json
end
```

#### Query String Params

As query string params são geralmente utilizadas em requisições ***GET*** para fazer filtros, paginação ou ordenação, é comum vermos parâmetros assim em URLs:

```
-> servidor/recurso?pagina=1

ou geralmente

-> http://localhost:4567/books?page=1
```

No Sinatra, podemos utilizar esses parâmetros utilizando os ***params***, por exemplo:

```ruby
get '/qbooks' do
  { message: "A página atual é: #{params['page']}" }.to_json
end
```

Pode testar no seu browser acessando a seguinte URL, lembrando de reiniciar o servidor web no seu terminal:

```
http://localhost:4567/qbooks?page=2
```

#### Body Params

Por último temos os parâmetros vindos do corpo da requisição, geralmente utilizados em requisições do tipo ***POST***, ***PATCH*** e ***PUT***. Como estamos trabalhando falando de APIs REST que se comunicam via JSON, vamos passar um JSON no corpo de uma nova requisição:

```json
{
  "titulo": "O Framework Sinatra",
  "autor": "Anchieta",
  "ano": "2020"
}
```

No Sinatra, podemos utilizar os parâmetros do corpo da requisição da seguinta forma:

```ruby
post '/books' do
  params = JSON.parse(request.body.read).symbolize_keys
  { book: "Titulo: #{params[:titulo]}, Autor: #{params[:autor]}" }.to_json
end
```

Utilizamos a mesma biblioteca json para fazer o parse dos parâmetros para um hash Ruby e o método symbolize_keys para transformar a chave de acesso do hash 'titulo' em :titulo por exemplo, assim podemos acessar os parâmetros de uma forma bem parecida como acessamos os query params.

Para testar, podemos utilizar uma ferramenta como o Postman ou o Insomnia.

O código final da nossa API REST utilizando JSON feita em Sinatra fica assim:

```ruby
require 'sinatra'
require 'json'

get '/books' do
  { message: "Livros sobre Sinatra" }.to_json
end

get '/books/:id' do |id|
  { message: "Esse é o id do livro: #{id}" }.to_json
end

get '/qbooks' do
  { message: "A página atual é: #{params['page']}" }.to_json
end

post '/books' do
  params = JSON.parse(request.body.read).symbolize_keys
  { book: "Titulo: #{params[:titulo]}, Autor: #{params[:autor]}" }.to_json
end
```

Este é o primeiro post de uma série sobre o Sinatra, em breve veremos mais coisas interessantes.
