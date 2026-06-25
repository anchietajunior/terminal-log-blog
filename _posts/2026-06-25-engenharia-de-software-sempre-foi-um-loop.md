---
title: "Engenharia de software sempre foi um loop. Só agora vemos isso com clareza."
author: anchietajunior
date: 2026-06-25 00:00:00 -0300
categories: [AI, Engineering]
tags: [ai, software-engineering, agents, llm, loop]
layout: post
lang: pt-br
---

## O que é um loop na ciência da computação

Antes de falar de engenharia de software como um loop, vale ser preciso sobre o que um loop *é* na disciplina que nos deu a palavra.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Antes de a gente entrar em engenharia de software como um loop, me dá a definição sólida, de livro-texto: o que exatamente é um loop na ciência da computação?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">No fundo, um <strong>loop</strong> é uma estrutura de controle que repete um bloco de instruções enquanto uma condição se mantém, e para assim que ela deixa de valer. Não é só um recurso de linguagem, é um dos primitivos da própria computação. O <em>structured program theorem</em> (Böhm e Jacopini, 1966) provou que qualquer função computável pode ser construída a partir de apenas três estruturas de controle: <strong>sequência, seleção e iteração</strong>. O loop é a iteração, tire ele e você não consegue mais expressar computação de forma geral.</div>
    </div>
  </div>
</div>

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">E qual é a ideia mais profunda sobre loops na bibliografia canônica, aquela que eu devo carregar para o resto do post?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Não é como <em>escrever</em> um loop, é como <em>raciocinar</em> sobre um. Em <em>Introduction to Algorithms</em> (Cormen, Leiserson, Rivest e Stein, o texto padrão no MIT, em Stanford e na maioria dos cursos de CC), os loops são entendidos pela ideia de <strong>invariante de loop</strong>: uma propriedade que é verdadeira antes de o loop começar e continua verdadeira no início de cada iteração. Você valida com três perguntas, <strong>Inicialização</strong> (é verdadeira antes da primeira iteração?), <strong>Manutenção</strong> (se vale antes de uma iteração, continua valendo antes da próxima?) e <strong>Terminação</strong> (quando o loop para, a invariante te diz algo útil?).<br><br>A imagem para guardar é esta: um loop não é só repetição, é repetição em torno de algo que permanece constante, a invariante, enquanto o estado avança em direção a um resultado. <strong>A estrutura fica fixa enquanto a posição dentro dela muda.</strong> É exatamente o que está acontecendo com o engenheiro de software.</div>
    </div>
  </div>
</div>

---

## Introdução

A engenharia de software sempre funcionou como um ciclo: requisitos, construção, validação, ajuste e volta ao início. Esse padrão existe desde o começo. O que mudou nos últimos anos não foi o loop em si, mas **a posição do engenheiro dentro dele**. Ele deixou de executar cada etapa à mão, passou a refinar instruções que uma IA executa e agora começa a projetar sistemas que iteram por conta própria. Entender essa mudança é entender o que está acontecendo no desenvolvimento de software hoje.

---

## Fase Um: O Loop Manual

No começo, o engenheiro estava inteiramente dentro do loop. Você levantava requisitos em longas conversas com o cliente, documentava, interpretava. Depois escrevia o código à mão, testava, encontrava as falhas e voltava ao código. O cliente dava feedback, você incorporava, e o ciclo recomeçava.

O loop não era uma metodologia organizada num documento. Era a realidade crua do trabalho: semanas ou meses para fechar uma única volta, muito esforço manual, muito tempo esperando feedback. **O engenheiro respondia por cada elo da corrente**, dos requisitos ao código, dos testes aos ajustes.

---

## Fase Dois: Humano no Loop com IA

A inteligência artificial chegou ao desenvolvimento e encolheu o ciclo de semanas para minutos, sem mudar sua natureza iterativa. O que mudou foi o ponto de contato do engenheiro com o trabalho.

Você não escreve mais o código diretamente. Você escreve uma instrução, um prompt, uma especificação, e a IA gera o código. Quando o resultado não serve, você não conserta o código. **Você conserta a instrução que o produziu.** O engenheiro deixou de ser quem digita cada linha e passou a ser quem refina especificações.

É isso que costumam chamar de *human in the loop*. Controle, validação e direção permanecem com a pessoa. Só a execução foi delegada. O engenheiro segue no centro do processo, mas não carrega mais todo o trabalho manual.

---

## Fase Três: O Humano Saindo do Loop

Agora surge uma visão mais radical. O papel do engenheiro deixa de ser criar software e passa a ser criar aquilo que cria software e, no limite, **sistemas capazes de se refinarem sozinhos**.

Nessa fase, o ciclo instrução-resultado-ajuste não é mais conduzido passo a passo pela pessoa. A IA gera o código, testa, identifica problemas, reformula as próprias instruções e valida de novo. O loop continua sendo um loop, mas roda sem intervenção manual constante.

O humano não sai de cena. Ele sai do interior do ciclo. O trabalho deixa de ser refinar cada iteração e passa a ser definir o arcabouço, os limites e os objetivos dentro dos quais o sistema itera. A pergunta central deixa de ser "o que ajustar agora" e passa a ser **"quem está gerenciando o loop."**

---

## Conclusão

As três fases não são tipos diferentes de engenharia de software. São posições diferentes do engenheiro diante da mesma estrutura: executor manual, refinador de instruções, projetista de sistemas que iteram sozinhos. O loop sempre esteve lá. Cada geração de ferramentas só o tornou mais visível e empurrou a pessoa um degrau acima dele.

Isso redefine o que significa ter habilidade técnica. Quando a execução é delegada, o valor do engenheiro se desloca para onde a máquina ainda não chega: **enquadrar o problema certo, definir os limites certos e julgar quando o resultado é bom o suficiente.** O loop não está desaparecendo. Ele está subindo de nível, e levando a gente junto. Ver isso com clareza é o primeiro passo para trabalhar bem na camada em que o trabalho de fato acontece agora.
