---
title: "MacOS Catalina: Configurando um novo ambiente de desenvolvimento"
author: anchietajunior
date: 2020-03-08 00:00:00 +0800
categories: [Miscellaneous]
tags: [macos, environment]
math: true
mermaid: true
layout: post
lang: pt-br
---

Não é comum reinstalar o MacOS e reconfigurar todo o ambiente de desenvolvimento,
porém recentemente decidi fazer isso apenas para utilizar a nova versão do MacOs (Catalina)
com uma nova instalação, então deixo aqui o que foi instalado e configurado na minha máquina.

## Homebrew

Definitivamente um dos primeiros ou o primeiro passo é instalar o Homebrew, um gerenciador de
pacotes para o MacOS que facilita demais a vida de quem precisa instalar e gerenciar vários
apps, principalmente se tratando de ambiente de desenvolvimento. Para instalar o Homebrew,
execute esse comando no terminal.

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

E depois dá uma conferida pra ver se tudo está ok.

```sh
brew update
```

## Xcode

Provavelmente será necessária em algum momento a instalação do Xcode, então, caso precise
esse é o comando a ser executado no terminal:

```sh
xcode-select --install
```

## Git

Iniciando a jornada das instalações, penso que o Git é uma das primeiras coisas a serem instaladas, já que muitas outras serão baixadas do Github.

```sh
brew install git
```

Agora configurando algumas informações e adicionando a nova chave SSH que provavelmente será
necessária já que estamos falando de uma nova instalação do MacOS.

```sh
git config --global color.ui true
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR@EMAIL.com"
ssh-keygen -t rsa -C "YOUR@EMAIL.com"
```

Agora copia a nova chave SSH gerada e [manda lá pro Github](https://github.com/settings/ssh).

Dá uma conferida também pra ver se tudo foi configurado corretamente:

```sh
ssh -T git@github.com
Hi anchietajunior! You've successfully authenticated, but GitHub does not provide shell access.
```

## Iterm2 & Oh My Zsh

Agora que o Catalina já vem com o zsh por padrão, ainda gosto muito do Oh my Zsh pra deixar o meu terminal bem
mais customizado, porém antes vamos instalar o iTerm2 que ainda é meu favorito quando se trata de terminal.

```sh
brew cask install iterm2
```

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Google Chrome

Sim, vamos instalar o Chrome via terminal:

```sh
brew cask install google-chrome
```

Caso você utilize algum outro navegador, pode instalar via brew também.

```sh
brew cask install firefox
brew cask install opera
```

## Visual Studio Code e Macvim

Atualmente utilizo o VSCode e o Macvim no meu ambiente de desenvolvimento, além da fonte FiraCode, então, lá vai:

Instalando a fonte Firacode:

```sh
brew tap homebrew/cask-fonts
brew cask install font-fira-code
```

Instalando os VScode e Macvim

```sh
brew cask install visual-studio-code \
macvim
```

Para o Macvim, gosto muito do [Janus](https://github.com/carlhuda/janus), um pack de plugins voltado para o Macvim.

```
curl -L https://bit.ly/janus-bootstrap | bash
```

Essa é uma configuração mínima para o Macvim.

```vim
let NERDTreeShowHidden=1
set macligatures
set guifont=Fira\ Code:h18
color YOUR_THEME
let mapleader=","
nmap <leader>/ :NERDTreeToggle<CR>
nmap <leader>t :tabnew<CR>
nmap <leader>c :ClearCtrlPCache<CR>
nmap <leader>n :nohlsearch<CR>
nmap <Leader>v :vsplit<cr>
nmap <Leader>s :split<cr>
```

A partir daqui você já pode abrir o Macvim no seu terminal através do comando mvim nas pastas dos seus projetos.

Para o VSCode, alguns plugins são não só bons mas até necessários, aqui são alguns dos que eu uso:

- Tema Popping and Locking
- HTML Snippets
- Material Icon Theme
- Prettier
- Slim
- Auto Close Tag
- Git Pull Requests

E essa para o VSCode

```json
{
    "workbench.startupEditor": "newUntitledFile",
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "window.zoomLevel": 2,
    "editor.rulers": [80, 120],
    "editor.renderLineHighlight": "gutter",
    "terminal.integrated.fontSize": 14,
    "javascript.updateImportsOnFileMove.enabled": "never",
    "editor.parameterHints.enabled": false,
    "breadcrumbs.enabled": true,
    "javascript.suggest.autoImports": false,
    "explorer.autoReveal": false,
    "editor.minimap.enabled": false,
    "workbench.colorTheme": "Popping and Locking",
    "workbench.iconTheme": "material-icon-theme",
    "explorer.openEditors.visible": 0,
    "explorer.compactFolders": false
}
```

Uma última coisa é instalar o VSCode no Path do MacOS e permitir que ele seja aberto pelo terminal também, executando o comando ***Command + Shift + P***, digite ***shell***, selecione a opção ***Install 'code' command PATH***, a partir daqui já podemos abrir o VSCode com o comando ***code*** no terminal.

## Node e Yarn

Esses são dois caras mais presentes a cada dia na vida dos programadores e existem várias formas de instalar o Node, porém eu ainda uso o Brew.

```sh
brew install node yarn
```

## RVM, Ruby, Bundler e Rails

Sem muito segredo para instalar o RVM (Ruby Version Manager) e a linguagem Ruby que geralmente
já vem instalada no MacOS, porém sem controle nenhum das versões.

Instalando o RVM:

```sh
\curl -sSL https://get.rvm.io | bash
rvm list
```

Instalando a versão desejada do Ruby, veficando se a versão de fato foi instalada, instalando o bundler e o Rails:

```sh
rvm install 2.6.3
ruby -v
gem install bundler
gem install rails -v 6.0.2.1
```

## PostgreSQL

Para instalar o Postgresql via brew basta executar:

```sh
brew install postgresql
```

Caso precise de um gerenciador gráfico, veja o [PostBird](https://www.electronjs.org/apps/postbird).

## Docker

Vamos instalar o Docker:

```sh
brew cask install docker
```

Pra quem ainda usa o Kitematic igual a mim, lá vai mais um comando:

```sh
brew cask install kitematic
```

## Apps e configurações de sistema

Aqui vou listar algumas ferramentas e configurações interessantes que uso no meu MacOs.

- Rectangule ou Divvy - Gerenciamento de janelas
- Slack - Comunicação
- Spotify - Música
- VLC - Vídeo player

Então, segue um comando pra instalar todo mundo de uma vez:

```sh
brew cask install \
  rectangule \
  slack \
  spotify \
  vlc
```

É isso!
