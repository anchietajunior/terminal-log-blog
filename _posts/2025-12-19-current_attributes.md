---
title: Mergulho profundo no CurrentAttributes do Rails
author: anchietajunior
date: 2025-12-19 00:00:00 +0800
categories: [Rails, ActiveSupport]
tags: [rails, activesupport]
math: true
mermaid: true
layout: post
lang: pt-br
---

# Entendendo Contexto de Execução no Rails

Estou criando alguns posts de estudos particulares com ajuda de IA e decidi começar a compartlhar um pouco do que tenho aprendido utilizando IA.

## Processos, Threads, Fibers e ActiveSupport::CurrentAttributes

Quem trabalha com Rails há algum tempo inevitavelmente esbarra em conceitos como Current.user, concorrência, vazamento de contexto e comportamentos estranhos que só aparecem em produção. Muitas vezes esses problemas são atribuídos a “Rails magic”, quando na verdade eles nascem de um entendimento incompleto sobre como o código Rails é executado em tempo de execução.

Este texto tem um objetivo simples: explicar, de forma progressiva e conectada, como processos, threads e fibers se relacionam no Rails moderno e como o framework usa essa estrutura para compartilhar contexto com segurança através do ActiveSupport::CurrentAttributes.

## Processos: o primeiro nível de isolamento

Um processo é a unidade mais isolada de execução fornecida pelo sistema operacional. Quando um processo é criado, ele recebe seu próprio espaço de memória, seu próprio identificador (PID) e não compartilha variáveis, objetos ou estado com outros processos.

No contexto de Rails, isso significa que cada worker de um servidor web em modo cluster (como Puma) ou cada processo do Sidekiq roda em um processo separado. Mesmo que dois processos estejam executando o mesmo código Rails, eles não enxergam a memória um do outro. Se um processo altera um objeto em memória, os demais processos não sabem que isso aconteceu.

Uma boa analogia é pensar no processo como uma casa: tudo o que está dentro dela pertence apenas àquela casa. Outras casas podem ser idênticas, mas não compartilham móveis.

Essa característica é o motivo pelo qual nenhum estado em memória — incluindo CurrentAttributes — pode atravessar processos. Se algo precisa ser compartilhado entre processos, ele precisa ser persistido em um banco, cache externo ou fila.

## Threads: concorrência dentro do mesmo processo

Dentro de um processo, o sistema operacional permite a criação de threads. Uma thread é um fluxo de execução independente, mas que compartilha a mesma memória do processo que a criou.

No Rails, cada request é atribuído a uma thread do servidor web. Em um processo Puma com múltiplas threads, vários requests podem estar sendo processados simultaneamente, todos compartilhando as mesmas classes, constantes e heap de memória.

A grande diferença entre processo e thread é que threads compartilham memória, mas não compartilham execução. Cada thread tem sua própria stack, seu próprio contador de instruções e seu próprio Thread.current. Além disso, threads são preemptivas: o sistema operacional pode interromper uma thread a qualquer momento para dar espaço a outra.

Uma analogia útil é pensar na thread como pessoas andando dentro da mesma casa. Elas compartilham os mesmos móveis, mas cada uma tem sua própria linha de pensamento e pode ser interrompida no meio de uma ação.

Essa característica é essencial para entender por que o Rails não pode usar variáveis globais simples para armazenar dados como current_user. Em um ambiente multi-thread, isso causaria vazamento de dados entre requests.

## Fibers: concorrência cooperativa e previsível

Fibers são frequentemente confundidas com threads, mas elas resolvem um problema diferente. Uma fiber é uma unidade leve de execução gerenciada pelo próprio Ruby, não pelo sistema operacional. Diferente das threads, fibers não são preemptivas: elas só pausam quando o código explicitamente permite.

Fibers vivem dentro de uma thread e nunca executam em paralelo. O que elas permitem é que múltiplas operações façam progresso enquanto aguardam I/O, sem bloquear a thread inteira. Isso é especialmente útil para servidores web e sistemas que lidam com muitas operações de rede.

No Rails moderno, fibers são usadas para suportar I/O assíncrono, ActionCable, Turbo Streams e outras formas de concorrência cooperativa. O modelo real de execução passa a ser: um processo contendo várias threads, e cada thread podendo alternar entre múltiplas fibers.

Uma boa analogia é imaginar uma thread como um trilho de trem e fibers como vagões. Apenas um vagão anda por vez, mas vários podem se revezar no mesmo trilho de forma organizada e previsível.

## O ciclo de vida de um request no Rails

```
Sistema Operacional
 └── Processo (PID)
      ├── Thread 1
      ├── Thread 2
      ├── Thread 3
      └── ...
```

Com esses conceitos em mente, fica mais fácil entender o request lifecycle no Rails. Quando um request chega ao servidor web, ele é atribuído a uma thread específica. Todo o código do Rails — middlewares, controllers, models, services e callbacks — executa dentro dessa thread.

Durante a execução, o Rails pode suspender e retomar a execução usando fibers, especialmente quando há operações de I/O. Mesmo assim, o contexto do request permanece associado à execução correta.

Esse detalhe é fundamental: todo request Rails sempre tem uma thread associada, mesmo quando fibers entram em cena. Fibers não eliminam threads; elas apenas permitem um uso mais eficiente delas.

## ActiveSupport::CurrentAttributes: contexto atrelado à execução

O ActiveSupport::CurrentAttributes existe para resolver um problema prático: como disponibilizar dados de contexto — como usuário atual, conta, fuso horário ou request ID — em qualquer camada da aplicação sem passar parâmetros por toda parte e sem usar variáveis globais perigosas?

A solução do Rails é tratar contexto como algo associado à execução, não a objetos específicos. Internamente, o Rails armazena esses dados em um storage ligado à thread e, no Rails moderno, também integrado ao contexto de fibers por meio do ActiveSupport::ExecutionContext.

Quando você define Current.user = current_user no início do request, esse valor fica disponível em qualquer ponto do código que esteja executando naquele mesmo contexto. Models, services e callbacks conseguem acessá-lo porque estão rodando dentro da mesma thread (e fibers associadas).

Esse contexto é automaticamente limpo ao final do request. Isso é essencial porque threads são reutilizadas. Sem esse reset, dados de um request poderiam vazar para o próximo.

## Até onde vai o contexto

É importante entender os limites desse mecanismo. CurrentAttributes não atravessa processos. Ele também não sobrevive a background jobs, filas ou qualquer fronteira temporal. Quando um job começa, ele roda em outro processo ou thread, com um contexto completamente novo.

Por isso, qualquer dado necessário fora do request lifecycle deve ser passado explicitamente. O Current é uma ferramenta poderosa, mas apenas dentro do escopo correto.

## Leituras

O ciclo de vida de uma request por exemplo vive dentro de uma thread. O contexto é preservado no Rails através de [ExecutionContext](https://github.com/rails/rails/blob/3d2510359c37b2d84a8b33b0b3964ae60f6653f0/activesupport/lib/active_support/execution_context.rb)

## Conclusão

Entender processos, threads e fibers não é um detalhe acadêmico: é o que permite escrever aplicações Rails previsíveis, seguras e escaláveis. ActiveSupport::CurrentAttributes funciona porque o Rails trata contexto como parte do fluxo de execução, respeitando os limites impostos pelo sistema operacional e pelo Ruby.

Quando esses conceitos estão claros, desaparecem os mistérios do tipo “funciona local, quebra em produção”. O que sobra é arquitetura, concorrência e decisões conscientes — exatamente o tipo de entendimento que diferencia quem apenas usa Rails de quem realmente o domina.

