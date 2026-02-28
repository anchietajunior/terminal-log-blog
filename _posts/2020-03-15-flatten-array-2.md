---
title: Flatten Array com Ruby - Versão 2
author: anchietajunior
date: 2020-03-15 11:33:00 +0800
categories: [Algorithms]
tags: [algorithm, ruby, flatten-array]
math: true
mermaid: true
layout: post
image: https://i.ibb.co/BrqwTJL/ruby-algorithm.png
lang: pt-br
---

![Algorith](https://i.ibb.co/BrqwTJL/ruby-algorithm.png)

Ontem, dia 14/03/2020 [publiquei um post sobre o algoritmo FlattenArray em Ruby](https://www.anchietajunior.com/blog/flatten_array), porém não fiquei satisfeito com o código resultado da primeira vez que fiz. Então hoje, dia 15/03/2020 (isso mesmo, um dia depois :D) resolvi fazer uma nova versão desse algoritmo e analisar o que eu poderia ter feito melhor na primeira vez.

## Problemas com a primeira versão

Listando os problemas encontrados na primeira versão

### Legibilidade

Quanto mais linhas de código, mais tempo leva para se ler, isso é fato.

### Função dentro de outra função

Para executar a recursividade, criei uma função dentro da função principal responsável por executar a recursividade do algoritmo.

### Variável de instância

Para não perder a referência durante a recursividade, tive de apelar para uma variável de instância ***@new_array***, o que piora ainda mais o tempo de execução e a legibilidade.

## Reescrevendo

Versão atual.

```ruby
def flatten2(array, flattened_array = [])
  for i in array do
    if i.is_a?(Array)
      flatten2(i, flattened_array)
    else
      flattened_array << i
    end
  end
  flattened_array
end
```

## Benchmarking

Podemos fazer alguns testes de tempo de execução utilizando uma lib nativa do Ruby chamada Benchmark.

```sh
# Versão 1
require 'benchmark'

puts Benchmark.measure {
  10000.times do
    flatten([1, [2, [3, [4, [5]]]], [6, [7], [8]]])
  end
}

# Resultado

0.036546   0.000184   0.036730 (  0.036857)
 => nil
```

```sh
# Versão 2
require 'benchmark'

puts Benchmark.measure {
  10000.times do
    flatten2([1, [2, [3, [4, [5]]]], [6, [7], [8]]])
  end
}

# Resultado

0.030918   0.000242   0.031160 (  0.031432)
 => nil
```

Diferença pequena hein? Só que não, imagine isso sendo executado milhões de vezes por minuto, faria total diferença.

## Conclusão

A versão atual, instancia um novo array chamado ***flattened_array*** quando executada direto nos parâmetros, removendo a necessidade de uma variável interna e pior ainda, uma variável de instância interna.

Além disso, posso remover a função interna e executar a recursão fazendo referência ao array ***flattened_array*** nos parâmetros.

Convenhamos, ***@new_array*** também não diz nada sobre o que está sendo retornado nessa variável, portanto, nomenclatura é outra coisa que foi resolvida.

Bem mais legível e faz mais sentido que a versão anterior, essa é a maior vantagem que temos ao nosso favor, a autocrítica.

Isso nos tempos modernos de desenvolvimento é chamado de débito técnico que podemos ir pagando com o tempo, é provável que eu faça um post sobre isso em breve, mas de forma resumida, o poder de escrever um código, critica-lo e reescrevê-lo de uma forma melhorada, é muito massa.

Então, é isso. Let's code and let's refactor that code!
