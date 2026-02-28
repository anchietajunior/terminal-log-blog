---
title: Configurando Jest e Enzyme em apps React
author: anchietajunior
date: 2020-03-06 00:00:00 +0800
categories: [React, Jest, Enzyme]
tags: [react, jest, enzyme]
math: true
mermaid: true
layout: post
lang: pt-br
---

Caso esteja buscando alguma ferramenta de testes para iniciar sua trajetória no TDD em aplicações React, aqui vai uma ótima dupla, Jest + Enzyme. Nesse post, vamos criar uma app React simples utilizando o ***create-react-app*** e criar nosso primeiro teste utilizando essas duas libs.

## Criando novo projeto React

Para agilizar nossa vida e irmos direto ao ponto, utilize o ***npx*** para criar um novo projeto React, lembrando que você precisa do ***NodeJS*** instalado na sua máquina para que isso funcione:

```sh
npx create-react-app jetest
```

Agora acesse a pasta e execute o projeto pra conferir se tudo está ok. Detalhe, nesse post utilizo o ***yarn*** porém você pode utilizar o ***npm*** sem problema algum.

```sh
cd jetest
yarn start
```

Nesse ponto, se tudo ocorreu bem, a seguinte mensagem deve aparecer no seu console:

```sh
Compiled successfully!

You can now view jetest in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.27:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Então agora podemos partir para a configuração do Jest + Enzyme.

## Instalando e configurando o Enzyme

Calma, não se surpreenda por eu ter pulado direto para o Enzyme, o motivo disso é que o Jest já vem por padrão instalado e configurado quando criamos um novo projeto React utilizando o ***create-react-app***, então podemos partir para a instalação do Enzyme:

No terminal e dentro da pasta do seu projeto recém criado execute:

```sh
yarn add enzyme jest-enzyme enzyme-adapter-react-16
```

Detalhe, nesse link você pode ver [todas as versões disponíveis](https://enzymejs.github.io/enzyme/) de adapters para o Enzyme, para este projeto estou utilizando a versão 16.

Caso apareça algum WARN no seu terminal durante a instalação, não precisa se preocupar, isso não deveria ser problema e atrapalhar a criação dos nossos testes.

Dentro do projeto recém criado, existe um arquivo chamado ***App.test.js*** dentro da pasta ***src*** que contém o seguinte código:


```jsx
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Vamos atualizar esse arquivo com alguns passos:

- Remover a importação do @testing-library/react
- Importar o Enzyme e shallow (daqui a pouco comento sobre isso)
- Importar o Enzyme Adapter
- Criar a configuração do Enzyme + EnzymeAdapter
- Remover o teste existente e criar um novo utilizando o Enzyme

Então, nosso teste deve ficar assim:

```jsx
import React from 'react';
// Importa Enzyme e o módulo Shallow
import Enzyme, { shallow } from 'enzyme';
// Importa o Enzyme adapter
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Importa o App component
import App from './App';

// Configura o Enzyme para utilizar o EnzymeAdapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Cria o primeiro teste
test('renders without error', () => {
  // Cria uma variável utilizando o Shallow e passando o App component como parâmetro
  const wrapper = shallow(<App />);
  // Assert para verificar se o App component renderizado pelo Shallow está vazio, nulo ou undefined
  expect(wrapper).toBeTruthy();
});
```

Essa é a descrição oficial do shallow no site do Enzyme:

"A renderização via Shallow é útil para restringir o teste de um componente como uma unidade e para garantir que seus testes não estejam indiretamente afirmando o comportamento de componentes filho."

Ou seja, o Shallow utiliza a virtual DOM do React para renderizar o componente durante o teste, mas não depende diretamente da renderização dos componentes filhos, nesse caso se eu tivesse mais um componente sendo renderizado dentro do componente App, não afeta o nosso teste e eu posso criar meus testes focados no componente App e não nos seus componentes filhos. [Leia mais aqui](https://enzymejs.github.io/enzyme/docs/api/shallow.html).

Esse é um teste bem simples que apenas verifica se o componente App que é o componente pai do nosso projeto React não está vazio, null ou undefined.

## Executando testes

Agora voltando ao terminal, execute o seguinte comando:

```sh
yarn test
```

Agora temos nosso primeiro teste com Jest e Enzyme sendo executado de forma correta:

```sh
 PASS  src/App.test.js
  ✓ renders without error (5ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.406s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

## Conclusão

Temos um projeto React com o Jest e Enzyme instalados e configurados, a ideia a partir daqui é criar testes mais específicos e mais robustos dependendo da complexidade de cada projeto. Então, é isso!
