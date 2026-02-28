---
title: BinaryGap com Ruby
author: anchietajunior
date: 2020-03-11 11:33:00 +0800
categories: [Algorithms]
tags: [algorithm, ruby, binarygap]
math: true
layout: post
mermaid: true
image: https://i.ibb.co/BrqwTJL/ruby-algorithm.png
lang: pt-br
---

![Algorith](https://i.ibb.co/BrqwTJL/ruby-algorithm.png)

Recentemente criei minha conta no [Codility](https://www.codility.com/), uma plataforma que ajuda recrutadores a encontrarem programadores e que possui vários algoritmos e exercícios para programadores treinarem suas habilidades.

O primeiro algoritmo que pratiquei na plataforma foi um algoritmo até então desconhecido por mim chamado ***BinaryGap***, resumindo, devemos encontrar a maior sequência de zeros em uma representação binária de um número inteiro.

Atenção! Caso esteja fazendo o desafio, não copie o código e cole na plataforma, tente entender o problema e entender o que cada linha de código.

## Entendendo o problema

O número 9, tem a representação binária = 1001 e possui um espaço binário de tamanho 2, ou seja, possui uma sequência de dois zeros entre dois uns.

O número 1041 é representado através do número binário 10000010001, então possui 2 gaps binários, o primeiro de 5 e o segundo de 3 zeros.

Então o problema pede o seguinte:

Dado um número N, escreva uma função que retorne o maior gap binário desse número, no caso do número acima 1041, o maior gap é 5.

## Transformando um número em binário

A primeira coisa que devemos saber é como transformar um número em binário usando Ruby. Nesse caso, baseado em pesquisas que fiz na internet sobre algumas formas de fazer isso, decidi utilizar uma que transforma o número em binário, porém dentro de uma String, utilizando o ***irb*** podemos comprovar esse método.

```sh
number = 33.to_s(2)
=> "100001"
```

Então, o método ***to_s(2)*** refere-se a base 2, e retorna a representação binária de um número.

Sabendo disso, podemos criar a função ***solution***.

## Criando função Solution

A função ***Solution*** é quem irá receber o número inteiro (N), transformar esse número em binário e daí em diante executar nosso algorítmo.

Então já podemos começar a representa-la e transformar o parâmetro N em binário.

```ruby
def solution n
  bin = n.to_s(2)
  p bin
end
```

Se executarmos essa função, já podemos ver o parâmetro N sendo representado de forma binária, utilizando o IRB:

```sh
solution(9)
"1001"
 => "1001"
```

## Criando arrays para guardar os valores

Bom, nessa abordagem utilizarei dois arrays, um para guardar temporariamente as sequências de zeros e outro para guardar a contagem de cada sequência de zeros vindo do array temp quando a sequência de zeros terminar, ou seja, sempre que um 0 aparecer depois de um 1, começaremos a injetar dentro do tempo cada zero e quando aparecer outro 1, adicionamos dentro do arrays gaps um novo elemento contendo a quantidade de elementos de temp e depois zeramos o array temp para caso ocorra outro binary gap.

Então, nosso código fica assim:

```ruby
def solution n
  # Transforma o número/parâmetro N em binário e guarda
  # o valor dentro de uma String
  bin = n.to_s(2)

  # Cria um array para guardar as sequências temporárias de zeros
  temp = []
  # Cria um array para guardar a quantidade de zeros de cada sequência
  gaps = []
end
```

## Iterando

"Algoritmo que se preze, tem de iterar", já ouvi isso em algum lugar e aqui não seria diferente. Vamos iterar na String guardada no valor bin, no Ruby temos uma funcão chamada ***each_char*** específica para iterarmos nos caracteres de uma String.

A partir daqui podemos adicionar uma pequena verificação pra saber se o elemento atual é ***"1"*** ou ***"0"***.

```ruby
def solution n
  # Transforma o número/parâmetro N em binário e guarda
  # o valor dentro de uma String
  bin = n.to_s(2)

  # Cria um array para guardar as sequências temporárias de zeros
  temp = []
  # Cria um array para guardar a quantidade de zeros de cada sequência
  gaps = []

  # Itera nos caracteres dentro de bin
  bin.each_char do |char|
    if char == "1"
      # Faça alguma coisa caso char seja "1"
    else
      # Faça alguma coisa caso char seja "0"
    end
  end
end
```

## Caso o caractere seja "1"

Se a variável char dentro do nosso ***each_char*** for "1", primeiro, criamos uma outra verificação, pra saber se o array temp não está vazio, ou seja, se o array temp estiver vazio significa que não possuímos nenhum 0 ainda e não quereremos fazer nada com essa condição.

Caso o array temp não esteja vazio, adicionamos ao array gaps a quantidade de elementos contidos em temp, ou seja, a quantidade de zeros guardada em temp e depois resetamos o valor de temp.


```ruby
def solution n
  # Transforma o número/parâmetro N em binário e guarda
  # o valor dentro de uma String
  bin = n.to_s(2)

  # Cria um array para guardar as sequências temporárias de zeros
  temp = []
  # Cria um array para guardar a quantidade de zeros de cada sequência
  gaps = []

  # Itera nos caracteres dentro de bin
  bin.each_char do |char|
    if char == "1"
      unless temp.empty?
        # Adiciona a quantidade de elementos (zeros) dentro de gaps,
        # ou seja, a quantidade de elementos representa o nosso binary gap
        # ou a quantidade de zeros em sequência arrodeados por 1
        gaps << temp.length
        # Resetamos o array temp
        temp = []
      end
    else
      # Faça alguma coisa caso char seja "0"
    end
  end
end
```

## Caso o caractere seja "0"

Aqui é o passo mais simples, caso o char seja "0", apenas devemos adiciona-lo ao array temp pra que seja entendido como parte de uma sequência de zeros, ou seja, faz parte de um binary gap.

```ruby
def solution n
  # Transforma o número/parâmetro N em binário e guarda
  # o valor dentro de uma String
  bin = n.to_s(2)

  # Cria um array para guardar as sequências temporárias de zeros
  temp = []
  # Cria um array para guardar a quantidade de zeros de cada sequência
  gaps = []

  # Itera nos caracteres dentro de bin
  bin.each_char do |char|
    if char == "1"
      unless temp.empty?
        # Adiciona a quantidade de elementos (zeros) dentro de gaps,
        # ou seja, a quantidade de elementos representa o nosso binary gap
        # ou a quantidade de zeros em sequência arrodeados por 1
        gaps << temp.length
        # Resetamos o array temp
        temp = []
      end
    else
      # Faça alguma coisa caso char seja "0"
      temp << char
    end
  end
end
```

## Retornando os valores corretos

Como descrito no problema, caso não exista nenhum binary gap no número binário devemos retornar 0, lembrando que para existir um gap binário, deve exisitir uma sequência de zeros entre dois números 1, por exemplo: 1001, 000100001, 1001000001. Não são reconhecidos como gap binários casos por exemplo: 10000, 1111111.

Então, podemos deixar explícito o retorno do 0 caso o nosso array gaps esteja vazio e por último retornamos o maior número dentro do array gaps, indicando a maior sequência de gaps encontrados dentro do nosso número binário (N), para isso, o Ruby também possui uma função chamada ***max***, que retorna o maior valor de um array.

Então, o código fica dessa forma:

```ruby
def solution n
  # Transforma o número/parâmetro N em binário e guarda
  # o valor dentro de uma String
  bin = n.to_s(2)

  # Cria um array para guardar as sequências temporárias de zeros
  temp = []
  # Cria um array para guardar a quantidade de zeros de cada sequência
  gaps = []

  # Itera nos caracteres dentro de bin
  bin.each_char do |char|
    if char == "1"
      unless temp.empty?
        # Adiciona a quantidade de elementos (zeros) dentro de gaps,
        # ou seja, a quantidade de elementos representa o nosso binary gap
        # ou a quantidade de zeros em sequência arrodeados por 1
        gaps << temp.length
        # Resetamos o array temp
        temp = []
      end
    else
      # Faça alguma coisa caso char seja "0"
      temp << char
    end
  end

  # Retorna 0 caso não exista nenhum gap binário
  # e encerra a execução da função
  return 0 if gaps.empty?
  # Retorna o maior número dentro do array gaps
  gaps.max
end
```

## Testes unitários

Podemos criar alguns testes unitários sem precisar de nenhuma biblioteca nesse caso, sabendo por exemplo que o número 1041 deve retornar 5, podemos criar uma função para validar os valores:

```ruby
def binary_gaps_equal(n1, n2)
  puts "Binary Gaps Equal"
  solution(n1) == n2 ? "OK" : "Error"
end
```

## Executando alguns testes

Definindo a função ***solution*** e ***binary_gaps_equal*** no irb, podemos executar alguns testes como esses:

### Testando o número 1041 com o retorno 5

```sh
binary_gaps_equal(1041, 5)

Binary Gaps Equal
 => "OK"
```

### Testando o número 15 com o retorno 0

```sh
binary_gaps_equal(15, 0)

Binary Gaps Equal
 => "OK"
```

Então, é isso, caso tenha encontrado uma forma melhor? [Fala comigo](www.anchietajunior.com/contact) por
e-mail e vamos conversar mais a respeito.
