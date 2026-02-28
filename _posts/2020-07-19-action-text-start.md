---
title: Rails 6 e ActionText
author: anchietajunior
date: 2020-07-19 00:00:00 +0800
categories: [Rails, ActionText]
tags: [rails, actiontext]
math: true
mermaid: true
layout: post
image: https://i.ibb.co/vDZ2CPM/action-text.png
lang: pt-br
---

![ActionText](https://i.ibb.co/vDZ2CPM/action-text.png)

Uma das ultimas novidades acrescentadas ao ecossistema do Rails é o framework [ActionText](https://guiarails.com.br/action_text_overview.html), e nesse post vou falar um pouco sobre o meu primeiro contato com essa nova ferramenta que trás uma boa alternativa na edição e criação de textos ricos, além de upload de conteúdo direto para o [ActiveStorage](https://edgeguides.rubyonrails.org/active_storage_overview.html) no melhor estilo WYSIWYG. Nesse caso utilizando o [Trix editor](https://github.com/basecamp/trix), ferramenta desenvolvida pela Basecamp, empresa do DHH.

#### Versões

- Ruby 2.7.1
- Rails 6

## Novo Projeto Rails 6

```sh
rails new texts -T
cd texts
bundle install
rails db:create
```

## Gerando um novo Posts scaffold


```sh
rails g scaffold Post title
rails db:migrate
```
Talvez soe estranho adicionar apenas o título aqui, mas o conteúdo do post virá através do ActionText que terá sua prṍpria estrutura de dados. Também vou definir a index/posts como rota padrão no arquivo ***routes.rb***

```ruby
Rails.application.routes.draw do
  resources :posts
  root "posts#index"
end
```

## Instalando ActionText

```sh
rails action_text:install
```

## Adicionando Rich Text aos posts

Depois de instalado o action_text, agora de volta ao código do projeto, basta adicionar a referência de um novo campo com "texto rico" ao ***models/post.rb***, vou chamar esse campo de ***body***, mas poderia ser ***content*** ou qualquer outro nome apropriado.


```ruby
class Post < ApplicationRecord
  has_rich_text :body
end
```

Pra conseguir passar os valores do campo ***body*** é necessário permitir esse valor no ***controllers/posts_controller.rb***

```ruby
class PostsController < ApplicationController
  # implementation

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
```

Consequentemente será necessário acrescentar o novo campo também no formulário dos posts em ***views/posts/_form.html.erb***...

```erb
<div class="field">
  <%= form.label :body %>
  <%= form.rich_text_area :body %>
</div>
```

...e no arquivo ***views/posts/show.html.erb*** pra exibir o conteúdo do campo body.

```erb
<div class="body">
  <%= @post.body %>
</div>
```

## Migrando

É necessária uma nova migração, já que o model Post agora terá um novo rich_text field.

```sh
rails db:migrate
```

## Testando

```sh
rails server
```

## Extra

Para fazer uploads de imagem pra dentro do editor, pode ser necessário instalar o [Image Magick](https://imagemagick.org/index.php) na sua máquina pra que tudo funcione corretamente.

Além disso, descomente a seguinte linha no seu Gemfile:

```ruby
gem 'image_processing', '~> 1.2'
```

e depois instale a biblioteca caso ainda não tenha feito:

```sh
bundle install
```

That's it!

Pra quem conheceu o Rails com aquela jogada de "Crie um blog em n minutos", a introdução do ActionText dá a impressão que a ideia agora é criar um blog em segundos, rs.
