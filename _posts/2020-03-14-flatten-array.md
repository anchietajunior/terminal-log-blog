---
title: Flatten Array com Ruby
author: anchietajunior
date: 2020-03-14 11:33:00 +0800
categories: [Algorithms]
tags: [algorithm, ruby, flatten-array]
math: true
mermaid: true
image: https://i.ibb.co/BrqwTJL/ruby-algorithm.png
layout: post
lang: pt-br
---

![Algorith](https://i.ibb.co/BrqwTJL/ruby-algorithm.png)

Um algoritmo bem conhecido, tanto entre desenvolvedores quanto entre empresas que estão em processo de contratação, é o Flatten Array, traduzindo do inglês seria algo como nivelar um array, ou seja, transformar um array contendo outros arrays em um só do mesmo nível.

Imagine o seguinte array:

```ruby
arr = [1, 2, 3, [4, 5], [6]]
```

Então, devemos transformar em:

```ruby
arr = [1, 2, 3, 4, 5, 6]
```

## Definindo função

Primeiro, vamos definir nossa função ***flatten*** que vai receber um array como parâmetro, para isso vou criar um arquivo chamado flatten.rb com o seguinte código:

```ruby
def flatten array
  # implementação
end
```

Podemos chamar a função passando um array pra garantir que está tudo ok até agora.

```ruby
def flatten array
  p array
end

flatten [1, 2, 3]
```

```sh
ruby flatten.rb

> [1, 2, 3]
```

## Novo Array

Como descrito anteriormente, precisamos retornar um novo array "nivelado" nessa função, portanto vamos defini-lo.

```ruby
def flatten array
  @new_array = []
end
```

## Iterando

Precisamos iterar dentro do array recebido, porém faremos isso dentro de outra função para podermos aplicar um conceito bem legal chamado Recursão ou Recursividade.

### Recursão / Recursividade

[Uma explicação legal sobre recursividade](https://panda.ime.usp.br/pensepy/static/pensepy/12-Recursao/recursionsimple-ptbr.html):

"Recursão é um método de resolução de problemas que envolve quebrar um problema em subproblemas menores e menores até chegar a um problema pequeno o suficiente para que ele possa ser resolvido trivialmente. Normalmente recursão envolve uma função que chama a si mesma. Embora possa não parecer muito, a recursão nos permite escrever soluções elegantes para problemas que, de outra forma, podem ser muito difíceis de programar."

Portanto, vou definir uma nova função que será a responsável pela recursividade.

```ruby
def flatten array
  @new_array = []

  def iterate_array arr
    for i in arr do
        # A função chama a si própria caso
        # o item atual seja um array.
        # Adiciona o item ao @new_array
        # caso não seja um array.
      if i.is_a?(Array)
        iterate_array i
      else
        @new_array << i
      end
    end
  end
end
```

Nossa função está pronta, porém não retorna nada, vamos resolver isso.

## Retornando o novo Array

Até aqui, nós temos uma função que cria um novo array e cria também uma nova função interna para iterar pelo array, caso o array possua outros arrays internos, essa função chama a si própria setando os valores dentro do novo array criado. Agora precisamos apenas chamar a função interva ***iterate_array*** e retornar o novo array.

```ruby
def flatten array
  @new_array = []

  def iterate_array arr
    for i in arr do
        # A função chama a si própria caso
        # o item atual seja um array (is_a?(Array)).
        # Adiciona o item ao @new_array
        # caso não seja um array.
      if i.is_a?(Array)
        iterate_array i
      else
        @new_array << i
      end
    end
  end

  # Executa a função interna iterate_array
  # passando o array recebido pela função principal
  iterate_array array
  # Retorna o novo array, preenchido a partir
  # da iteração da função iterate_array
  @new_array
end
```

## Testando

Testando de forma simples o nosso código, vamos passar alguns arrays pra ver se tudo funciona como esperado, execute no irb:

```sh
# Defina a função flatten e depois execute
flatten [1, 2, 3, [4, 5], [6]]

=> [1, 2, 3, 4, 5, 6]

flatten [1, [2, [3, [4]]]]

=> [1, 2, 3, 4]
```

É isso, conhece alguma forma melhor de implementar? Comenta comigo no email: santosjr87@gmail.com.

Valeu!

