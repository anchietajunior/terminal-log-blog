---
title: "Forward Deployed Engineer: o que é, de onde veio e o que o cargo pede hoje"
author: anchietajunior
date: 2026-11-24 00:00:00 -0300
categories: [AI, Engineering]
tags: [ai, career, forward-deployed-engineer, agents, llm, anthropic]
layout: post
lang: pt-br
topic: carreira
---

## O piloto que brilhou na demo e parou na empresa

Imagine um banco que acabou de contratar acesso ao melhor modelo de IA do mercado. Na demonstração, o modelo lê um contrato de cinquenta páginas e responde perguntas difíceis em segundos. A diretoria aprova o projeto na mesma semana.

Três meses depois, o piloto está parado. Os dados que o agente precisa ler estão em um sistema antigo, atrás de permissões que ninguém do projeto consegue liberar. As ferramentas que deram ao agente não combinam com o modo como a equipe trabalha. Ninguém sabe medir se a resposta dele está certa o bastante para um auditor aceitar.

O cenário é inventado, mas cada uma dessas falhas aparece nos relatos de projetos reais. E repare que **o modelo não falhou em nenhuma delas**. Falhou o que fica ao redor dele.

Quem resolve isso? O vendedor não escreve código. O time de produto do fornecedor está longe e atende milhares de clientes. A consultoria entrega um relatório. O banco precisa de alguém que **programe, sente ao lado da equipe e só vá embora quando o sistema estiver rodando**.

Essa pessoa tem um cargo: **Forward Deployed Engineer**, ou FDE. Este post explica o que é o cargo, por que ele nasceu, o que ele pedia no começo e o que ele pede hoje. Para a parte de hoje, eu uso como base a vaga de FDE que a Anthropic mantém aberta.

---

## O que é um Forward Deployed Engineer

**Um Forward Deployed Engineer é um engenheiro de software que trabalha dentro do ambiente do cliente, escreve código de produção para o problema daquele cliente e leva de volta para a própria empresa o que aprendeu em campo.**

O nome vem do vocabulário militar. Uma tropa *forward deployed* fica posicionada à frente, perto de onde as coisas acontecem e longe do quartel-general. O engenheiro segue a mesma lógica: ele sai do escritório da empresa que faz o produto e vai para onde o produto precisa funcionar.

Três marcas separam esse cargo dos cargos vizinhos:

1. **Ele escreve código de verdade.** O papel dele não é apresentar nem recomendar.
2. **Ele trabalha no terreno do cliente.** Usa os sistemas, os dados e as restrições do cliente.
3. **Ele fecha o ciclo com o produto.** O que ele descobre em campo deve mudar o que a empresa constrói depois.

Guarde a terceira marca. Ela volta várias vezes neste post, porque é ela que separa um FDE de um consultor.

### Uma imagem para carregar: a fábrica e o alfaiate

Pense em uma fábrica de roupas. Ela desenha uma camisa e vende a mesma camisa para milhares de pessoas. É eficiente, mas a camisa não serve bem em todo mundo.

Agora pense em um alfaiate que trabalha para essa fábrica. Ele vai até um cliente importante, tira as medidas, ajusta a roupa no corpo e descobre onde o molde padrão erra. Depois ele volta e entrega as medidas para a fábrica, e a próxima coleção já sai melhor para muita gente.

A Palantir, empresa onde o cargo nasceu, descreve essa divisão com duas frases. O engenheiro de produto cuida de *"one capability, many customers"*: uma capacidade, muitos clientes. O FDE cuida de *"one customer, many capabilities"*: um cliente, muitas capacidades. A fábrica e o alfaiate.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Na prática, qual é a diferença entre um FDE e um Solutions Architect? Os dois são técnicos e os dois falam com cliente.</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">A diferença está em <strong>quem escreve o código que vai para produção</strong>. O Solutions Architect costuma provar que o produto <em>pode</em> resolver o problema, com um desenho de solução ou uma prova de conceito. O FDE faz o produto <em>resolver</em>, dentro da infraestrutura do cliente. A newsletter The Pragmatic Engineer descreve assim o time da OpenAI: os FDEs são muito mais mão na massa, escrevem código direto na infraestrutura do cliente e usam as ferramentas do cliente. Um teste rápido para qualquer vaga: pergunte <strong>quem faz o deploy em produção</strong>. Se a resposta for "outra equipe", o cargo é de pré-venda com outro nome.</div>
    </div>
  </div>
</div>

---

## Como o cargo surgiu

A Palantir foi fundada em 2003 e vende software de análise de dados para agências de governo, forças de segurança e militares. Esse tipo de cliente tem três características que quebram o jeito comum de vender software:

- **Os dados são sensíveis e não saem de lá.** Parte das redes nem tem conexão com a internet.
- **Cada cliente guarda os dados de um jeito diferente**, em sistemas antigos e pouco documentados.
- **A organização é grande e lenta**, e não tem engenheiros para adaptar um produto novo sozinha.

Mandar um instalador e um manual não funcionava. A saída foi mandar os engenheiros.

O crédito pela ideia vai para Shyam Sankar, que está na Palantir há cerca de vinte anos e hoje é o CTO da empresa. Em uma entrevista de outubro de 2026, ele contou que a ideia foi mal recebida por muito tempo: *"For 17 years I was maligned as the person ruining Palantir because I created this horrible concept of the FDE, and then it became the coolest thing ever."* Em tradução livre: por 17 anos ele foi apontado como a pessoa que estava arruinando a Palantir por ter criado esse conceito horrível, e depois o conceito virou a coisa mais legal do mundo. A conta dos 17 anos coloca a origem perto de 2009.

Dentro da Palantir, o cargo ganhou o apelido **Delta**, e o engenheiro de produto tradicional era o **Dev**. A newsletter The Pragmatic Engineer data o cargo, com esse nome, do início dos anos 2010. A mesma fonte dá uma proporção que mostra o tamanho da aposta: até por volta de 2016, a Palantir tinha mais Deltas do que engenheiros de software "normais".

### A ideia por trás: do específico para o geral

Sankar insiste em um ponto que muda como se lê o cargo. Para ele, forward deployed engineering é *"a product strategy, not a role"*: uma estratégia de produto, e o cargo é só a consequência dela.

Essa estratégia serve para um tipo de mercado. Se os seus clientes são parecidos entre si, você pode ouvir milhares deles, tirar a média e decidir o que construir. Nesse caso, mandar engenheiros a campo é desperdício. Mas, se poucos clientes têm a versão mais difícil do problema e resolver essa versão abre o resto do mercado, você precisa ir até eles. Nas palavras dele, é preciso *"go from specific to general"*: sair do específico e chegar ao geral.

Foi o que aconteceu. Em 2016 a Palantir lançou o Foundry, e muitos Deltas voltaram para a engenharia de produto levando a experiência de campo. As medidas do alfaiate viraram o molde da fábrica.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Engenheiro é caro. Não sai mais barato melhorar o produto de dentro do escritório, com pesquisa e ticket de suporte, do que mandar gente para o cliente?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Sai mais barato quando você <strong>já sabe o que construir</strong>. Em mercado novo, o requisito não está escrito em lugar nenhum. Ele mora na planilha que o analista mantém escondida, na permissão que ninguém consegue liberar e na etapa manual que todo mundo esqueceu de contar. Um ticket chega depois de passar por quatro pessoas, e cada uma remove um pedaço do contexto. Faça o teste com o seu próprio trabalho: pegue a última funcionalidade que você construiu a partir de um ticket e passe uma hora vendo um usuário real usar. Conte quantas coisas você teria feito diferente. O FDE existe para que essa hora aconteça <em>antes</em> do código. Mas o seu ponto vale como limite: se o que o engenheiro aprende não volta para o produto, a empresa virou uma consultoria cara.</div>
    </div>
  </div>
</div>

---

## Que problemas o cargo resolve

Dá para resumir o cargo como um jeito de fechar três distâncias.

**1. A distância entre o produto genérico e a realidade de um cliente.** Todo produto é feito para um cliente médio que não existe. O cliente real tem dados bagunçados, sistemas legados e regras próprias. Alguém precisa fazer o encaixe.

**2. A distância entre quem tem o problema e quem escreve o código.** No modelo comum, o problema passa do usuário para o gestor, do gestor para o vendedor, do vendedor para o time de produto e do time de produto para o engenheiro. É um telefone sem fio. O FDE corta o caminho: quem ouve o problema é quem programa a solução.

**3. A distância entre o que o campo aprende e o que o produto vira.** Sem um canal, cada implantação ensina a mesma lição de novo. O FDE é esse canal.

As duas primeiras distâncias são um problema do cliente. A terceira é um problema de quem vende o produto. Um bom FDE fecha as três ao mesmo tempo, e é isso que torna o cargo difícil.

---

## O que o cargo pedia quando surgiu

Eu não achei um anúncio de vaga daquela época. O retrato abaixo vem de relatos de FDEs da Palantir e do modo como a própria empresa descreve o trabalho, reunidos pela Pragmatic Engineer e pela Fortune.

- **Engenharia generalista.** Um anúncio da Palantir compara as responsabilidades do FDE às de um CTO de startup. Em uma semana a pessoa mexe em um pipeline de dados, na outra programa uma aplicação web sob medida.
- **Integração de dados em grande escala.** O trabalho central era fazer dados de fontes diferentes conversarem. A empresa fala em *"wrangling massive-scale data"*, domar dados em escala massiva.
- **Operação em ambiente restrito.** Um FDE de Abu Dhabi contou que passava alguns dias por semana no prédio do cliente monitorando, depurando, implantando e configurando o software. Em alguns clientes a rede era isolada da internet.
- **Conversa com todo nível da organização.** A mesma pessoa falava com o analista que usa a tela e com o executivo que assina o contrato.
- **Autonomia e julgamento.** Saber dizer "não" fazia parte do trabalho. O cliente pede muita coisa, e nem tudo vale a pena construir.

Sankar descreve o perfil com uma caricatura que ajuda. De um lado está o **hacker**, o "MacGyver", a pessoa cuja recompensa é ver o problema resolvido no mundo real. Do outro está o **artista**, cuja recompensa é a beleza do que foi construído. O FDE é o hacker, e o talento principal dele é descobrir **quais problemas valem a pena resolver**.

Um detalhe conta muito: a Palantir contrata para esse cargo gente com apenas um ano de experiência depois da faculdade. A régua é o perfil, e não a senioridade.

---

## O que o cargo pede hoje: a vaga da Anthropic

Por mais de uma década, o cargo foi coisa da Palantir e de algumas startups. Então os modelos de linguagem chegaram às grandes empresas, e a história do banco no começo deste post começou a se repetir em todo lugar.

Os números mostram o salto. As vagas de FDE subiram mais de 800% entre janeiro e setembro de 2025, segundo uma análise do Indeed com o Financial Times citada pela KDnuggets. A Lightcast mediu um aumento de mais de 1.000% entre janeiro e agosto de 2026 contra o mesmo período do ano anterior, enquanto as vagas de tecnologia em geral cresceram 13%. A mesma Lightcast registra salário mediano anunciado acima de US$ 188 mil, contra cerca de US$ 145 mil para engenheiros de software tradicionais. Leia esses percentuais com cuidado: a base era muito pequena, e um aumento enorme sobre uma base pequena ainda pode descrever um mercado pequeno.

Para ver o que o mercado pede hoje, vale ler uma vaga inteira. Eu escolhi a de [Forward Deployed Engineer da Anthropic](https://job-boards.greenhouse.io/anthropic/jobs/5423029008), do time de Applied AI em Londres, que estava aberta quando escrevi este post. Os itens abaixo são um resumo meu em português, e não o texto literal do anúncio.

### O que a pessoa faz

A vaga lista oito responsabilidades:

1. Trabalhar **dentro dos sistemas do cliente** para construir aplicações de produção com os modelos Claude.
2. Entregar artefatos técnicos como **MCP servers, sub-agentes e agent skills**, usados em fluxos de trabalho de produção.
3. Dar suporte de implantação de alto nível em ambientes corporativos.
4. **Identificar e codificar padrões de implantação repetíveis** e levar o aprendizado para os times de Produto e Engenharia.
5. Manter-se atual sobre as capacidades dos LLMs, os padrões de implementação e as ferramentas de desenvolvimento de produtos de IA.
6. Construir relacionamentos de longo prazo e encontrar novas oportunidades de uso de IA no cliente.
7. **Viajar com frequência, de 25% a 50% do tempo**, para construir presencialmente com o cliente.
8. Defender a missão da Anthropic em campo.

Se MCP, sub-agentes e skills são termos novos para você, eu expliquei cada um no post [O que é Harness para engenheiros de software?]({% post_url 2026-05-16-o-que-e-harness-para-engenheiros-de-software %}).

Repare no item 4. É a terceira marca do cargo, a que fecha o ciclo com o produto, escrita em uma vaga de 2026.

### O que a vaga pede

- **4 anos ou mais** em função técnica com contato direto com cliente, como FDE ou como engenheiro de software com experiência em consultoria ou em produto. Ex-fundadores técnicos são incentivados a se candidatar.
- **Experiência com LLMs em produção**: engenharia de prompt avançada, desenvolvimento de agentes, frameworks de avaliação e implantação em escala.
- **Programação forte**, com Python e de preferência mais uma linguagem, como TypeScript ou Java, e histórico de aplicações entregues em produção.
- **Alta autonomia** para navegar ambiguidade em organizações complexas.
- **Postura de cooperação** para trabalhar entre áreas e equilibrar prioridades que competem.
- **Interesse real em IA segura e benéfica.**
- **Comunicação forte** para fazer descoberta com o cliente e explicar conceitos técnicos a públicos diferentes, com pouco ego.
- Contam como diferencial: vivência em **serviços financeiros ou em saúde e ciências da vida**, e experiência com sistemas corporativos de TI.

A Anthropic também mantém aberta uma vaga de [Staff Forward Deployed Engineer](https://job-boards.greenhouse.io/anthropic/jobs/5449229008), um nível acima. Ela mostra para onde a carreira cresce: definir a estratégia técnica de uma conta ou de um setor, liderar a fase de descoberta, revisar o design de outros FDEs, conversar com a diretoria do cliente e **entregar um sistema que o cliente consiga operar sozinho**. Essa vaga diz ainda uma coisa útil para quem está começando: projetos pessoais e protótipos contam como experiência com LLMs e agentes.

### Antes e hoje, lado a lado

A tabela é a minha leitura das fontes.

| Dimensão | Quando surgiu (Palantir) | Hoje (vaga da Anthropic) |
|----------|--------------------------|--------------------------|
| **Matéria-prima** | Dados espalhados do cliente | Um modelo de linguagem, mais os dados e os sistemas do cliente |
| **O que se entrega** | Integrações de dados e aplicações sob medida | Aplicações com LLM em produção, MCP servers, sub-agentes e skills |
| **Como se prova que funciona** | Software comum: o teste passa ou falha | Software probabilístico: é preciso construir avaliações |
| **Experiência pedida** | Perfil generalista, mesmo com pouca experiência | 4 anos ou mais com cliente e LLM em produção |
| **Onde se trabalha** | No prédio do cliente, às vezes em rede isolada | Nos sistemas do cliente, com 25% a 50% de viagem |
| **O que volta para a empresa** | Lições de campo que viraram produto | Padrões repetíveis e sinais para Produto e Engenharia |

**O que não mudou:** código, cliente, ambiguidade e o ciclo de volta para o produto.

**O que é novo** cabe em três pontos:

- **O material de trabalho mudou de natureza.** Um modelo de linguagem pode dar respostas diferentes para a mesma pergunta. Por isso a vaga pede *evaluation frameworks*: o FDE precisa criar a régua que mede se o sistema está bom o bastante para aquele cliente.
- **O alvo se move.** Um modelo novo sai a cada poucos meses e muda o que é possível fazer. "Manter-se atual" virou responsabilidade escrita.
- **A senioridade subiu.** A Palantir aposta em gente nova com o perfil certo. A vaga da Anthropic pede anos de estrada com cliente, porque o FDE representa a empresa sozinho na sala.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Você foi criado pela Anthropic, então eu desconfio do seu entusiasmo com essa vaga. Lendo com frieza: o que nela é difícil de verdade?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Desconfie mesmo, e trate a vaga como dado. O texto é público e você pode conferir cada item sem depender da minha opinião. Lendo com frieza, eu vejo dois itens difíceis de verdade. O primeiro é <strong>evaluation frameworks</strong>. Muita gente sabe montar uma demo com LLM; pouca gente sabe provar, com casos reais do cliente, que o sistema acerta o suficiente para entrar em produção. O segundo é <strong>customer discovery</strong>: descobrir o problema que vale resolver, que raramente é o que o cliente pediu na primeira reunião. Python e prompt você treina sozinho em casa. Esses dois só se aprendem com um cliente real na frente. O item menos verificável é "defender a missão em campo". Ele ganha sentido prático em banco e hospital, onde dizer não a um uso inseguro faz parte da entrega. Exercício: copie os itens da vaga e marque cada um como <em>código</em>, <em>cliente</em> ou <em>produto</em>. A categoria com menos marcas no seu currículo mostra onde estudar.</div>
    </div>
  </div>
</div>

---

## Que soluções um FDE constrói hoje

Juntando a vaga com os relatos do mercado, as entregas caem em seis tipos:

1. **Agentes ligados aos sistemas internos.** O agente só é útil quando lê e escreve onde o trabalho acontece. O FDE constrói os **MCP servers** que expõem ao modelo o sistema de chamados, o ERP ou o banco de dados, respeitando as permissões do cliente.
2. **Sub-agentes e skills para fluxos específicos.** O procedimento que uma analista sênior segue de cabeça vira uma skill. Uma tarefa pesada de leitura vira um sub-agente.
3. **Sistemas de recuperação (RAG)** sobre documentos e bases do cliente, para o modelo responder com a informação da empresa.
4. **Avaliações sob medida.** Um conjunto de casos reais com a resposta esperada, usado para medir cada mudança de prompt, de ferramenta ou de modelo.
5. **O encanamento.** Autenticação, permissões, APIs, implantação em nuvem e observabilidade. É a parte menos charmosa e a que mais trava projeto.
6. **Padrões reutilizáveis.** O que funcionou em um cliente vira modelo para o próximo, e às vezes vira produto.

O sexto tipo tem exemplos públicos. Segundo a Pragmatic Engineer, o time de FDEs da OpenAI levou dados de um projeto de voz de volta para a área de pesquisa da empresa, e esse trabalho melhorou a Realtime API. O mesmo time contribuiu bastante para o Agents SDK.

### Um exemplo para visualizar

O caso abaixo é inventado. Ele serve para mostrar a ordem do trabalho.

Uma operadora de saúde quer acelerar a análise de pedidos de autorização de procedimentos. Um FDE passaria por estas etapas:

1. **Sentar com as analistas.** Ele descobre que a parte lenta é juntar o histórico do paciente, espalhado em três sistemas. A decisão em si é rápida.
2. **Construir o acesso.** Um MCP server para cada sistema, com as mesmas permissões que a analista tem.
3. **Codificar o procedimento.** Uma skill com as regras de análise, escrita junto com a analista mais experiente.
4. **Criar a régua.** Duzentos pedidos antigos, já decididos por pessoas, viram a avaliação. O agente só avança quando concorda com as pessoas na taxa combinada com o cliente.
5. **Colocar em produção com supervisão.** O agente monta o dossiê e sugere a decisão. A analista aprova.
6. **Levar o padrão de volta.** "Juntar histórico espalhado antes de uma decisão regulada" é um problema que outros clientes também têm.

Repare em quanto dessa lista é descoberta, integração e medição. Escolher o modelo nem aparece como etapa.

---

## Que problemas empresas como a Anthropic precisam resolver

Vista do lado de quem faz o modelo, a pergunta muda. Por que um laboratório de IA, que poderia só vender acesso à API, contrata engenheiros para trabalhar dentro dos clientes?

**A última milha.** A KDnuggets resume assim: *"AI's bottleneck has moved from building models to deploying them"*. O gargalo da IA saiu da construção dos modelos e foi para a implantação. E a implantação raramente falha no modelo: *"It fails on the plumbing around it"*, ela falha no encanamento ao redor.

**A velocidade de difusão.** Sankar diz que se dá pouca atenção a como acelerar a difusão da tecnologia. Um modelo melhor que ninguém consegue colocar em uso não muda o trabalho de ninguém, e também não vira receita.

**A confiança em setores regulados.** A vaga cita serviços financeiros e saúde pelo nome. Nesses setores, "funciona na demo" não basta. É preciso provar com avaliação, registrar o que o agente fez e manter uma pessoa responsável pela decisão.

**A escolha do problema certo.** Sankar aponta que há muito valor em acertar a decomposição do problema. O cliente chega com "queremos usar IA". Alguém precisa transformar isso em um fluxo específico, com dono, métrica e limite.

**Escalar sem virar consultoria.** Mandar engenheiros para cada cliente não escala sozinho. Por isso a vaga pede padrões repetíveis, e por isso as empresas estão criando estruturas inteiras para esse trabalho. Em maio de 2026, a Anthropic anunciou uma empresa de serviços de IA com Blackstone, Hellman & Friedman e Goldman Sachs, voltada a empresas de médio porte, em que engenheiros de Applied AI da Anthropic trabalham ao lado do time da nova empresa. Segundo a KDnuggets, a OpenAI lançou no mesmo mês uma empresa de implantação organizada em torno de FDEs, e a Salesforce se comprometeu a montar um time de mil FDEs.

**O sinal de campo.** Um benchmark diz como o modelo se sai em um teste. O FDE diz onde o modelo falha no trabalho de verdade. Esse sinal orienta o produto e a pesquisa.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Continuo achando que isso é consultoria com crachá de engenharia. Me convence do contrário.</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Não vou tentar, porque em muitas empresas você está certo. O próprio criador do conceito concorda: Shyam Sankar diz que, sem um caminho para transformar a dor do campo em produto, o que sobra é <em>"sparkling sales engineering"</em>, algo como "engenharia de vendas gourmet". E a Pragmatic Engineer registrou em 2026 que, na prática, a maioria dos FDEs não contribui de volta para a plataforma. O nome do cargo, então, não prova nada. O que separa os dois é o <strong>destino do aprendizado</strong>. O consultor entrega o projeto e o conhecimento fica no cliente. O FDE entrega o projeto e o conhecimento <em>também</em> volta para o produto. Leve três perguntas para uma entrevista: <strong>(1)</strong> o FDE responde para Produto ou para Vendas? <strong>(2)</strong> você me dá um exemplo de algo que nasceu em um cliente e virou funcionalidade? <strong>(3)</strong> quem mantém o código depois que eu saio? Se ninguém souber responder a segunda, é consultoria. Pode ser um bom emprego mesmo assim, mas é outro emprego.</div>
    </div>
  </div>
</div>

---

## O lado difícil do cargo

Um post introdutório também precisa mostrar o custo.

- **Viagem.** A vaga da Anthropic fala em 25% a 50% do tempo. A KDnuggets cita uma vaga da OpenAI com até 50%.
- **Dois empregos em um.** Atender o cliente e melhorar o produto competem pela mesma semana. A KDnuggets trata o esgotamento como um risco estrutural do cargo.
- **Pressão para dizer sim.** O cliente estratégico pede, a área comercial quer agradar, e o FDE é quem sabe que aquilo não deveria ser construído.
- **Um título instável.** A KDnuggets fecha a análise dela com uma boa frase: o título pode se fragmentar ou sumir, mas o conjunto de habilidades que ele nomeia não vai.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">E os próprios agentes? Se a IA já escreve a integração, o FDE não é o primeiro cargo que ela substitui?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">A Palantir já tem um produto chamado <strong>AI FDE</strong>, e Sankar conta que a maior parte do trabalho na plataforma dela passa por ele. Só que ele conta também um tropeço: quando novos contratados aprenderam a plataforma apenas através do AI FDE, o aprendizado deles piorou, porque não conheceram os blocos básicos. E ele diz que há muito valor em decompor bem o problema, coisa que acontece antes de qualquer código. Minha leitura: o agente tira horas do item "encanamento" e aumenta o peso de "descoberta" e de "avaliação". Sobra para a pessoa a parte que exige estar na sala: sentar com a analista, escolher o problema, ganhar a confiança do cliente e decidir o que <em>não</em> construir. É o movimento de toda ferramenta nova: a habilidade não some, ela se desloca.</div>
    </div>
  </div>
</div>

---

## Por onde começar

O título de FDE é raro, mas as habilidades dele podem ser treinadas em qualquer emprego de engenharia.

<div class="chat">
  <div class="chat-message jose">
    <div class="chat-avatar">JA</div>
    <div>
      <div class="chat-name">José</div>
      <div class="chat-bubble">Sou engenheiro de produto há anos e nunca tive o título de FDE. Por onde eu começo a me aproximar desse perfil?</div>
    </div>
  </div>
  <div class="chat-message claude">
    <div class="chat-avatar">C</div>
    <div>
      <div class="chat-name">Claude</div>
      <div class="chat-bubble">Você já tem a parte mais demorada, que é entregar software em produção. Faltam três músculos, e dá para treinar os três sem trocar de emprego. <strong>(1) Agente ligado a um sistema real:</strong> construa um MCP server para um sistema que você usa no trabalho e faça um agente resolver uma tarefa de ponta a ponta com ele. <strong>(2) Avaliação antes de melhoria:</strong> junte vinte casos reais com a resposta certa e meça o agente <em>antes</em> de mexer no prompt. Sem essa régua, você não sabe se melhorou. <strong>(3) Descoberta:</strong> passe uma hora ao lado de quem usa o seu sistema e escreva o problema com as palavras da pessoa, sem propor solução. Depois use a vaga da Anthropic como lista de conferência e veja o que ainda falta. Leitura para seguir: o artigo da The Pragmatic Engineer sobre Forward Deployed Engineers, que está nas fontes.</div>
    </div>
  </div>
</div>

---

## Resumo em uma tela

- **O que é:** um engenheiro que programa dentro do ambiente do cliente e leva o aprendizado de volta para o produto.
- **De onde veio:** da Palantir, entre o fim dos anos 2000 e o início dos anos 2010, para atender clientes de governo com dados sensíveis e sistemas únicos.
- **Que problema resolve:** a distância entre o produto genérico e a realidade do cliente, entre quem tem o problema e quem programa, e entre o campo e o produto.
- **O que pedia:** engenharia generalista, integração de dados, autonomia e conversa com o cliente.
- **O que pede hoje:** tudo isso, mais LLM em produção, agentes, avaliações e alguns anos de estrada.
- **O que constrói:** agentes ligados aos sistemas do cliente, MCP servers, sub-agentes, skills, RAG, avaliações e o encanamento que sustenta tudo.
- **O teste do cargo:** o que se aprende no cliente muda o que a empresa constrói depois? Se não muda, é consultoria.

---

## Fontes

Consultadas em 24 de novembro de 2026.

- Anthropic: vaga [Forward Deployed Engineer](https://job-boards.greenhouse.io/anthropic/jobs/5423029008) (Londres) e vaga [Staff Forward Deployed Engineer](https://job-boards.greenhouse.io/anthropic/jobs/5449229008).
- Anthropic: [anúncio da empresa de serviços de IA para empresas](https://www.anthropic.com/news/enterprise-ai-services-company) (maio de 2026).
- The Pragmatic Engineer: [artigo sobre Forward Deployed Engineers](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers), com a história na Palantir, os relatos de FDEs e o time da OpenAI.
- Stratechery: [entrevista com Shyam Sankar, CTO da Palantir](https://stratechery.com/2026/an-interview-with-palantir-cto-shyam-sankar-about-the-ai-religious-war/) (outubro de 2026).
- KDnuggets: [Forward Deployed Engineer: AI's Hottest New Career, or Consulting With a Better Title?](https://kdnuggets.com/forward-deployed-engineer-ais-hottest-new-career-or-consulting-with-a-better-title) (outubro de 2026).
- Fortune: [reportagem sobre o crescimento das vagas de FDE](https://fortune.com/2026/09/03/forward-deployed-engineers-fast-growing-six-figure-silicon-valley-job-integrate-ai-with-customers-tech-careers-palantir/), com dados da Lightcast (setembro de 2026).
