---
title: Configurando RSpec no Rails - 2020
author: anchietajunior
date: 2020-03-01 00:00:00 +0800
categories: [Rails, RSpec]
tags: [rails, rspec, tdd]
math: true
mermaid: true
image: https://i.ibb.co/2y8YPrH/rspec.png
layout: post
lang: pt-br
---

Sou um defensor do TDD e recomendo a todos o uso das práticas do TDD em seus projetos, lógico, depende do tamanho do sistema e da complexidade das funcionalidades do mesmo, mas isso é um assunto pra outra hora, aqui vai uma configuração inicial do RSpec, biblioteca mais utilizada para testes no ecossistema Ruby e Rails, então, let's do it!

Supondo que já tenha um projeto Rails criado, acesse o seu arquivo Gemfile e adicione:

```ruby
group :development, :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :test do
  gem 'database_cleaner'
  gem 'shoulda-matchers'
end
```

Agora instale todas as novas dependências com o comando:

```sh
bundle install
```

E instale as dependências do RSpec:

```sh
bundle generate rspec:install
```

Criando alguns arquivos de suporte:

Dentro da pasta spec, na raíz do projeto crie uma outra pasta chamada ***support***.

O primeiro arquivo é para o ***database_cleaner.rb***.

```ruby
RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do

    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
```

O segundo é o ***factory_bot.rb***.

```ruby
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

E o terceiro é o ***shoulda_matchers.rb***.

```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

E descomente a seguinte linha no arquivo no arquivo ***rails_helper.rb***.

```ruby
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].each { |f| require f }
```

Crie uma pasta para as Factories chamada ***factories*** dentro da pasta spec.

Agora crie suas factories utilizando todas as praticidades da Gem Faker, por exemplo ***users.rb***.

```ruby
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    name { 'Kylo Ren' }
    password { 'cometothedarkside' }
    user_category
  end
end
```

Agora vamos escrever nossa primeira spec.

***spec/models/user_spec.rb***

```ruby
require "rails_helper"

RSpec.describe User, type: :model do

  describe 'relationships' do
    it { is_expected.to belong_to :user_category }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :name }

    context 'uniqueness' do
      let!(:user) { create(:user, email: email, password: password) }
      let!(:email) { Faker::Internet.email }
      let!(:password) { "teste123" }

      context 'when exist user with same email' do
        subject { described_class.new(email: email) }

        it 'is error to email' do
          subject.valid?
          expect(subject.valid?).to be_falsy
        end
      end
    end
  end
end
```

Esse é apenas um modelo, você pode criar um teste mais fácil apenas pra verificar se está tudo configurado corretamente:

```ruby
require "rails_helper"

RSpec.describe "Some test" do
  it 'is true' do
    expect(true).to be(true)
  end
end
```

E agora testar no console pra ver se está tudo ok.

```sh
bundle exec rspec .
```

Ou apenas

```sh
rspec .
```

Se estiver tudo verde, então é um ótimo sinal e agora já podemos começar a escrever nossos testes utilizando o RSpec, é isso ai!
