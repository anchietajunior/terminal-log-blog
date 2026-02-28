---
title: Deploying a Ruby on Rails app to DigitalOcean with a managed Database.
author: joseanchieta
date: 2024-12-08 12:00:00 +0800
categories: [Ruby, Kamal, DigitalOcean, Deploy, PostgreSQL]
tags: [ruby, kamal, deploy, postgresql]
math: true
mermaid: true
image: https://i.ibb.co/WcjMWr2/3c6700b4-2080-4b38-aa87-1f105c2bb47c.webp
layout: post
lang: en
---

![Kamal Managed](https://i.ibb.co/WcjMWr2/3c6700b4-2080-4b38-aa87-1f105c2bb47c.webp)

Exploring Kamal (2) and how to deploy Ruby on Rails applications to DigitalOcean (or any other cloud service) using a managed database service, i started testing some configurations/deploy and my idea now is definitely create more posts about Kamal and share more information here in my personal blog about it.

## What is Kamal?

[The official Kamal website](https://kamal-deploy.org/) says:

"Kamal offers zero-downtime deploys, rolling restarts, asset bridging, remote builds, accessory service management, and everything else you need to deploy and manage your web app in production with Docker. Originally built for Rails apps, Kamal will work with any type of web app that can be containerized."

## Why i like this?

Honestly i used Capistrano for a long time and i liked that. When I first heard Kamal described as a Capistrano-like tool for deploying containerized applications, I got pretty excited about the idea. But in my view, that’s not the best way to define it. For me, Kamal is a great tool for anyone looking to deploy containerized apps without having to rely on Kubernetes—or who just doesn’t need it.

## Things to start understanding Kamal before using it

Kamal is now in version 2, here are some things i think are very important to understand.

- Docker (Containers, Orchestration)
- SSH (SSHKit)
- Reverse proxies (Kamal used Traefik in version 1 but now it uses Kamal-proxy)
- Load balances
- YAML files syntax

### Managed databases vs Database container

Using Kamal you can choose adding accessories (containers) or use a managed database service we can find in multiple cloud services like AWS, GCP or DigitalOcean which i'm using right now for my apps.

I actually choose a managed database service because it's easier to create backups, setup connections and etc, it's all handled by the cloud service you choose. That's the reason for me and my small apps i've being creating.

## The example

When using Ruby on Rails 8, Kamal is by default in your app and you can check some files to see how it works.

- config/deploy.yml
- .kamal/secrets
- .kamal/hooks
- Dockerfile
- bin/docker-entrypoint

And this is my current config/deploy.yml file to deploy an app to Digital Ocean using the Digital Ocean managed database service, off course you need to create the database and droplet first. I added some comments sou you can use the file and understand what's happening out there.

```yaml
# Name of the Project
service: nice_project

# Name of the image, by default it will use DockerHub
image: joseanchieta/nice_project

# IP Servers, you can set just one or how many you want
servers:
  web:
    - 192.168.0.1

# Your DockerHub/Other service username
registry:
  username: joseanchieta
  # You can find this variable inside .kamal/secrets
  password:
    - KAMAL_REGISTRY_PASSWORD

# Secrets come from .kamal/secrets.
env:
  secret:
    - RAILS_MASTER_KEY
    - PRODUCTION_DB_HOST
    - KAMAL_REGISTRY_PASSWORD
  clear:
    SOLID_QUEUE_IN_PUMA: true

    # IP or address of the database service, this is an example using
    # Digital Ocean
    # In database.yml >> production you should have something like this:
    # production:
    #   adapter: postgresql
    #   encoding: unicode
    #   pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
    #   database: production_database_name
    #   url: <%= ENV["PRODUCTION_DB_HOST"] %>
    DB_HOST: db-postgresql-nyc3-something123.ondigitalocean.com

# These commands are helpful, you can type in your terminal:
# kamal console
# kamal shell
# kamal logs
aliases:
  console: app exec --interactive --reuse "bin/rails console"
  shell: app exec --interactive --reuse "bash"
  logs: app logs -f
  dbc: app exec --interactive --reuse "bin/rails dbconsole"

volumes:
  - "nice_project:/rails/storage"

asset_path: /rails/public/assets

builder:
  arch: amd64
```