---
title: Criando iOS apps utilizando Rails e Turbo Native
author: joséanchieta
date: 2023-11-30 00:00:00 +0800
categories: [Turbo]
tags: [rails, turbo, ios]
math: true
mermaid: true
layout: post
image: https://i.postimg.cc/V6j7BW08/ios.png
lang: pt-br
---

[![ios.png](https://i.postimg.cc/V6j7BW08/ios.png)](https://postimg.cc/Q9dkj5q4)

## Um novo horizonte para o que pode ser feito com Rails.

Desde o início dos anúncios sobre Hotwire e Turbo, venho acompanhando e formando minhas opiniões a respeito. Confesso que de primeira, fiquei cético e achei que seria apenas mais uma coisa de Javascript para aprender, `eu estava terrivelmente enganado`.

Após assistir as palestras do RailsWorld realizado em Berlim no mês passado, percebi de vez que a forma
como vejo o ecossistema Rails, mudou muito. Hoje existe um horizonte de possibilidades para criação de 
aplicações web com Rails com um cardápio grande de opções: Esbuild, ImportMaps, Hotwire,
Kamal e etc. Estou bem animado com todas as alternativas que temos e que teremos em breve no ecossistema Rails.

## Turbo Native

Há a algum tempo, venho acompanhando o perfil no Twitter (X) do Joe Masilotti, The turbo native guy como ele
se auto proclama. Esse era o ponto no qual eu mais duvidava, "aplicativos de celular com Rails?, não me parece uma boa ideia". Esse pensamento surgiu em mim diante de tantas discussões a respeito de React Native e Flutter, parecem duas torcidas rivais e fervorosas para provar qual a melhor tecnologia.

O Joe foi um dos palestrantes do Rails World e na minha opinião, entregou uma das melhores palestras do evento. Este post basicamente replica e acrescenta algumas considerações ao que foi visto na palestra do Joe. Deixarei o link da palestra ao final deste post e o link para o Twitter do Joe também, vale bastante a pena segui-lo.

## Como funciona isso e por que?

Bom, pra quem conhece o conceito de webview em aplicações mobile, não é nada revolucionário. Resumindo de forma muito simples, é um app mobile que exibe um app web. Ou seja, teremos uma aplicação web Rails sendo exibida dentro de um app mobile, neste caso específico iOS.

Já ouvi várias coisas negativas sobre a abordagem de webview, desde que ouvi pela primeira vez sobre ferramentas como Ionic lá em 2014. Concordo com grande parte dos pontos negativos que ouvi naquela época, porém temos de levar em consideração que não estamos mais em 2014 e os devices mudaram muito, principalmente em capacidade de processamento, memória e etc.

Tendo tudo isso em mente, tenho a impressão que estamos entrando em uma nova era do desenvolvimento de software em que as pessoas estão cada vez mais pragmáticas e simplistas, isso faz parte de um conjunto de teorias, pensamentos e opiniões que venho acompanhando e que faz sentido (para mim). Acredito que muito vem dos resultados falhos de overengineering que obtivemos nos últimos anos com separação de back e front, microservices e etc sem que haja de fato um motivo real para aderir a estas técnicas.

Joe cita na palestra um outro exemplo, empresas/pessoas criando apps nativos visando performance e extrair o máximo dos devices sem que haja a necessidade real disso, ou seja, grande parte dos apps mobile não precisam extrair o máximo do aparelho, elas precisam renderizar algumas views, realizar algumas operações de crud e etc. Mais uma vez, estou de acordo com isso e pra mim o uso do Turbo Native faz sentido neste momento.

## Criando o projeto

Vamos começar criando um projeto simples em Rails, o intuito do post é criar um app rails e fazer com que o mesmo apareça em um iOS simulator (infelizmente apenas para usuários de Mac, mas sinta-se a vontade para fazer o mesmo para apps Android).

```shell
rails new iosapp -T -css tailwind
```
Vamos adicionar apenas um scaffold ao projeto para que possamos ver o resultado no simulador do iOS.

```shell
rails g scaffold Post title body:text
```

Execute as migrações:

```shell
rails db:migrate
```

Adicione um root_path (root_url) no arquivo `routes.rb`:

```ruby
root "posts#index"
```
Execute o app:

```shell
./bin/dev
```

Agora acesse o seu browser em `localhost:3000` e crie alguns posts.

Assim está o meu app no browser após adicionar alguns estilos utilizando Tailwind:

![iosturbo index](https://i.postimg.cc/662TcqFT/Screenshot-2023-11-30-at-13-49-00.png)

## Criando o app iOS


Neste passo é necessário ter o XCode instalado e estar utilizando um Mac. Abra o XCode, no menu principal clique em File, New, Project.


[![Criando o projeto](https://i.postimg.cc/QtMw88gv/Screenshot-2023-11-30-at-14-04-20.png)](https://postimg.cc/Y4Jb8wsx)

Na caixa de seleção "Choose a template for your new project" selecione iOS >> App e clique em Next. Aqui você terá algumas opções para preencher que são obrigatórias, no nosso caso pode desmarcar a opção `Include Tests` e na caixa de Interface, selecione StoryBoard.

[![Configurações](https://i.postimg.cc/3xnzP0m2/Screenshot-2023-11-30-at-14-09-32.png)](https://postimg.cc/rDRh4mhp)

### Acrescentando o Turbo Native como dependência do projeto

Clique no menu File novamente, encontre a opção `Add Package Dependecies`, clique nesta opção e selecione o Turbo Native, caso o Turbo Native não apareça para você, digite a url do github no campo `Enter Package URL`.

URL: `github.com/hotwired/turbo-ios`

[![Dependência Turbo Native](https://i.postimg.cc/wx0Qp53f/Screenshot-2023-11-30-at-14-24-27.png)](https://postimg.cc/G9TyPyFG)

O único passo necessário por agora é alterar o arquivo swift `SceneDelegate` que se encontra na árvore de arquivos exibida no Xcode.

O código ficará da seguinte forma:

```swift
import Turbo
import WebKit
import UIKit

let rootUrl = URL(string: "http://127.0.0.1:3000/")!

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?
    
    private let navigationController = UINavigationController()

    private lazy var session = {
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = "Turbo Native iOS"
        
       let session = Session(webViewConfiguration: config)
       session.delegate = self
       return session
    }()

    // When the app launches
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        window?.rootViewController = navigationController
        
        let proposal = VisitProposal(url: rootUrl, options: VisitOptions())
        visit(proposal: proposal)
    }
    
    // 1. Create Screen
    // 2. Push the Screen
    // 3. Render the HTML
    private func visit(proposal: VisitProposal) {
        let visitable = VisitableViewController(url: proposal.url)
        navigationController.pushViewController(visitable, animated: true)
        session.visit(visitable, options: proposal.options)
    }
 }

extension SceneDelegate: SessionDelegate{
    // Web view dies
    func sessionWebViewProcessDidTerminate(_ session: Session) {
        session.reload()
    }
    
    // Link is clicked
    func session(_ session: Session, didProposeVisit proposal: VisitProposal){
        visit(proposal: proposal)
    }
    
    // Link fails
    func session(_ session: Session, didFailRequestForVisitable visitable: Visitable, error: Error){
        print("Failed to visit: \(error.localizedDescription)")
    }
    
}
```

Aqui, temos algumas coisas relacionadas a navegação do app (que ficam muito bem explicadas pelo Joe no vídeo na Palestra) e logo no começo é possível ver que estamos apontando para algo no endereço `localhost:3000`. Sim, é aqui que indicamos ao app iOS onde buscar o seu `conteúdo`.

Agora vamos executar o simulador, isso pode ser feito com o atalho: `Command + R`

E olha só que maravilha!

[![iOS simulador](https://i.postimg.cc/43G1x5cr/Screenshot-2023-11-30-at-14-31-47.png)](https://postimg.cc/fVHdHYBK)

Nossa aplicação Rails sendo executada como um app mobile iOS. Sensacional!

## Conclusão

Este foi um pequeno exemplo de como é rápido criar um app iOS rodando uma aplicação Rails e isso é só o começo, imagina que para algumas atualizações basta apenas atualizar a aplicação Rails e isso já será refletido no App.

### Considerações

Como eu disse anteriormente, isso não é a solução para todos os problemas. Mas é uma boa solução para vários.
Reitero que é importante assistir a palestra do Joe, onde ele passa mais detalhes e passa até outras coisas como upload de imagens.

É isso, espero que gostem!


## Referências

Palestra: <a href="https://www.youtube.com/watch?v=hAq05KSra2g&t=339s&ab_channel=RubyonRails" target="_blank">Joe Masilotti - Just enough Turbo Native to be dangerous - Rails World 2023</a>

Link para o Workshop do Joe Masilotti: [Workshop](https://masilotti.com/turbo-native-workshop/)

Link para Post no blog do Joe: [Masilotti](https://masilotti.com/hide-web-rendered-content-on-turbo-native-apps/)
