---
title: Recursividade com Ruby
author: anchietajunior
date: 2020-05-30 11:33:00 +0800
categories: [Algorithms]
tags: [algorithm, ruby, recursion]
math: true
mermaid: true
layout: post
image: https://i.ibb.co/BrqwTJL/ruby-algorithm.png
lang: pt-br
---

![Algorith](https://i.ibb.co/BrqwTJL/ruby-algorithm.png)

Voltando a ler algumas coisas da época da faculdade e tentando aprender coisas novas sobre algoritmos e estruturas de dados, me deparo com um dos primeiros conceitos que vemos ao entrar na área de programação: Recursividade.

Traduzindo de uma forma bem grosseira e comum, Recursividade é quando uma função chama a si própria. Alguns exemplos bem comuns são os algoritmos da Sequência de Fibonacci e Cálculo Fatorial. Mas vai um pouco além disso, também é importante conhecer sobre a Pilha de chamada e como o computador aloca valores através das chamadas de funções na memória.

Particularmente, sempre vi Recursividade como um bom exercício para estudar algoritmos, mesmo que em alguns casos um simples loop seja suficiente pra resolver um problema, porém utilizando Recursividade uma nova carta na sua manga é adicionada ao entender bem esse conceito, pra isso vamos a alguns exemplos:

## 1 - Somar todos os números de um array utilizando Recursividade.

Dado um array de números inteiros, vamos somar todos os itens e retornar o valor da soma.

```ruby
def soma_array(arr)
  if arr.size <= 1
    return arr[0]
  else
    return arr.slice!(0) + soma_array(arr)
  end
end
```

Aqui fiz apenas uma verificação pra saber se o tamanho do array recebido é menor ou igual a 1, caso seja, retorne o primeiro e único item do array. Caso o tamanho do array seja maior que 1, retorne uma soma do primeiro item do array mais uma nova chamada da função. Dessa forma, temos o nosso primeiro exemplo de recursividade.

Então, pra entender melhor, vamos analisar o que acontece aqui utilizando um exemplo de um array [1, 2].

```ruby
arr = [1, 2]

soma_array(arr)

# => 3
```

Na primeira vez que a função for executada, o array possui 2 itens, 1 e 2. Então cai na condição do Else por ter mais de um item. Nessa condição eu executo um slice!(0), ou seja, removo o primeiro item do array, no caso o número 1 e chamo novamente a função soma_array, então algo como:

```ruby
1 + soma_array([2])
```

E agora ao ser executada novamente o array possui apenas um item, então a função retorna o número 2, voltando ao contexto da primeira chamada da função:

```ruby
1 + 2

# => 3
```

A mesma coisa acontece caso o array possua vários itens.

## 2 - Fatorial (n!)

***Fatorial é um número natural inteiro positivo, o qual é representado por n!***

***O fatorial de um número é calculado pela multiplicação desse número por todos os seus antecessores até chegar ao número 1. Note que nesses produtos, o zero (0) é excluído.***

***O fatorial é representado por:***

***n! = n . (n – 1) . (n – 2) . (n – 3)!***

[Referência](https://www.todamateria.com.br/fatorial/)

Sabendo agora um pouco sobre fatorial, vamos escrever uma função que execute isso de forma recursiva.

```ruby
def fatorial(number)
  if number == 1
    return 1
  else
    return number * fatorial(number - 1)
  end
end
```

Então se utilizarmos o número 3 como parâmetro, teremos o seguinte:

```ruby
fatorial(3)

# => 6
```

Como nosso argumento é 3, faremos uma multiplicação 3 x (3-1) através da primeira chamada recursiva da função e em seguinda uma outra multiplicação na segunda chamada recursiva, ficando um cálculo parecido com esse na visão do computador:

```
(3 * (3-1)) * (2-1)
```

Lendo o livro ***Entendendo algoritmos***, pude analisar as chamadas de uma função recursiva como uma pilha de caixas, conhecida como Pilha de chamadas. No caso a primeira chamada com o número 3 é guardada em memória, em seguida a chamada com o número 2 e por ultimo com o número 1, dessa forma as caixas vão sendo removidas até voltar ao contexto original da primeira chamada da função.

## 3 - Sequência de Fibonacci

Talvez o exemplo mais comum quando o assunto é recursividade, principalmente em faculdades.

***Sequência de Fibonacci é a sequência numérica proposta pelo matemático Leonardo Pisa, mais conhecido como Fibonacci:***

***1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...***

***Foi a partir de um problema criado por ele que o mesmo detectou a existência de uma regularidade matemática.***

***Trata-se do exemplo clássico dos coelhos, em que Fibonacci descreve o crescimento de uma população desses animais.***

***A sequência é definida mediante a seguinte fórmula:***

***Fn = Fn - 1 + Fn - 2***

[Referência](https://www.todamateria.com.br/sequencia-de-fibonacci/)

Então, vamos criar esse ultimo exemplo em Ruby, lembrando que existem várias maneiras de transformar esses conceitos em código.

```ruby
def fib(number)
  number <= 1 ? number : fib(number - 1) + fib(number - 2)
end
```

Aqui decidi utilizar a praticidade do Ruby em retornar a ultima expressão de um escopo pra fazer a função fib. Podemos ver que a condicional analisa se o número recebido é menor ou igual a 1, caso seja retorne o número, caso não, faça uma soma utilizando a mesma função duas vezes, a primeira parte utilizando o ***number - 1*** e a segunda o ***number - 2*** como descrito na fórmula da sequência de Fibonnaci.

É isso, até a próxima.
