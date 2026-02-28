---
title: Pub/Sub com Ruby e Redis
author: anchietajunior
date: 2020-03-27 11:33:00 +0800
categories: [Ruby, Redis]
tags: [ruby, redis, pubsub]
math: true
mermaid: true
image: https://i.ibb.co/0Y6RqSr/ruby-pubsub.png
layout: post
lang: pt-br
---

![PubSub](https://i.ibb.co/0Y6RqSr/ruby-pubsub.png)

O padrão de arquitetura ou comunicação Pub/Sub pra mim é uma daquelas coisas que muito ouvimos mas pouco vemos, neste post vou tentar explicar o seu conceito e criar um pequeno exemplo de chat utilizando Ruby e Redis.

## Conceito

Basicamente Pub/Sub ou Publisher/Subscriber é uma arquitetura de comunicação através de mensagens prima dos sistemas de fila (mensageria) como AMQP (Advanced Message Queuing Protocol), por exemplo o RabbitMQ, Apache Kafka ou Amazon SQS.

O pub/sub geralmente tem uma característica parecida com um broadcast, onde todos os inscritos (subscribers) de um canal recebem as mensagens emitidas pelos remetentes (publishers).

## Redis

Uma das ferramentas mais conhecidas para se criar um pub/sub é o Redis. O Redis é um banco de dados no modelo chave valor que trabalha em memória, mas que também pode ser armazenado em disco através de snapshots e é muito famoso pela sua performance, talvez justamente por esse motivo é uma das ferramentas mais escolhidas quando é implementado um pub/sub.

## Criando um novo projeto

Caso você tenha uma instância do Redis na sua máquina sendo executada em localhost na porta 6379 que é a porta default do Redis, não é necessária nenhuma configuração para seguir esse tutorial.

### Criando pasta do projeto e arquivos

```sh
mkdir pubsub
cd pubsub
touch pub.rb
touch sub.rb
```

## Publisher

Primeiro vamos trabalhar no nosso publisher dentro do nosso arquivo pub.rb. Pra esse arquivo vamos precisar importar duas libs (gems) a própria gem do Redis e a gem Json pra transformar a nossa mensagem que será publicada no formato correto para o Redis.

Obs: Caso você não possua, pode instalar as duas gems através do comando:

```sh
gem install redis
gem install json
```

O nosso publisher ao ser iniciado receberá dois parâmetros, o nome do canal que a mensagem será enviada e o nome do usuário que enviará a mensagem através de argumentos da linha de comando (ARGV).

```ruby
require 'redis'
require 'json'

# Nova conexão com o Redis
$redis = Redis.new

# Nova variável que recebe um hash com uma chave user
# e o nome do usuário recebido através da linha de comando
# quando o arquivo é executado: ruby pub.rb canal user
data = { "user" => ARGV[1] }

# Loop que aguarda por novas mensagens
loop do
  # Captura o texto digitado no terminal e o adiciona
  # a uma variável chamada msg
  message = STDIN.gets

  # Agora de fato a mensagem é publicada através do comando
  # publish do Redis passando o nome do canal recebido
  # através da linha de comando (ARGV[0]) e faz um merge
  # da mensagem dentro da variável data que contém o user
  $redis.publish(ARGV[0], data.merge('message' => message.strip).to_json)
end
```

Detalhe, o método ***.strip*** é utilizado para remover os "\n\n" que strings podem receber, tanto no começo quanto no fim.

## Subscriber

O nosso subscriber vai ser o responsável por estar inscrito em um canal, receber as mensagens e executar alguma coisa com essas mensagens, nesse caso vamos apenas exibi-las no próprio terminal.

```ruby
require 'redis'
require 'json'

# Nova conexão com o Redis, dessa vez utilizando o parâmetro
# timeout => 0, isso força o Redis a nunca dar um timeout
# quanto estamos estamos esperando que ele estiver esperando uma
# resposta
$redis = Redis.new(:timeout => 0)

# O método subscribe do Redis, recebe um ou vários nomes de canais
# a serem vefificados para quanto chegarem novas mensagens, nesse
# caso vamos apenas passar um, o nome do nosso canal será ruby
$redis.subscribe('ruby') do |on|

  # Quando uma nova mensagem chegar nesse canal, execute algo
  on.message do |channel, message|

    # Fazemos um parse da mensagem que salvamos com o método .to_json
    data = JSON.parse(message)

    # Exibe o nome do canal, usuário e mensagem
    puts "#{channel} - User: #{data['user']} - Message: #{data['message']}"
  end
end
```

## Exemplo

Vejam como funcionou comigo abrindo 3 abas no terminal, duas com o publisher e uma com o subscriber, simulando uma espécie de chat.

![Pub/Sub Ruby](https://i.ibb.co/F0P0KT9/terminal.png)

Todo o código pode ser encontrado [nesse repositório](https://github.com/anchietajunior/pubsubruby), é isso e divirtam-se.
