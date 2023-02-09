# Curso de Performance de Aplicações com K6
## Este repositório contém o projeto desenvolvido durante o curso de performance de aplicações, que aborda o uso de K6 para testar a performance de aplicações.

> Para monitoramente foi utilizado Grafana e InfluxDB

### Pré-requisitos
- Docker

### Instalação

> Clone este repositório:

- Clone este repositório para sua máquina local usando http ou ssh, por exemplo:

`git clone git@github.com:DouglasWillamis/teste_de_perfomance_com_k6.git`

- Entre na pasta do projeto:

`cd teste_de_perfomance_com_k6`

- Execute o comando abaixo para criar os containers com Grafana e InfluxDB:

`docker-compose up -d influxdb grafana`

![run docker-compose](https://i.imgur.com/R4uRa1B.gif)

- Acesse o painel do Grafana em http://localhost:3000 com usuário admin e senha admin.

- Importe o dashboard fornecido no repositório como modelo para visualização dos dados coletados pelo K6.

- Execute o script de teste K6 com o comando abaixo:

`docker-compose run --rm k6 run /scripts/test.js` ou `./run-load-test.sh test`

> Notas
- Para utilizar a K6 cloud é necessário adicionar o seu token no arquivo .env para ser carregado na criação do container, existe um arquivo .env de exemplo no repositório e no arquivo run-load-test.sh existem exemplos de como executar na K6 cloud 
### Licença
#### Este projeto é disponibilizado sob a licença MIT. Veja o arquivo LICENSE para mais informações.