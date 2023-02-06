# hospital

## Sumário

- [hospital](#hospital)
  - [Sumário](#sumário)
  - [Motivação](#motivação)
  - [Base de dados relacional](#base-de-dados-relacional)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## Motivação

O presente repositório consiste em um app para gerenciar dados de consultas e exames de beneficiários de um plano de saúde. Ele reúne todos os conteúdos explicados pelo professor durante o quarto bimestre letivo, desde transações SQL até reflexão e tipos genéricos.

Este foi o quarto repositório de código apresentado no [Curso Superior de TSI do IFMS](https://www.ifms.edu.br/campi/campus-aquidauana/cursos/graduacao/sistemas-para-internet/sistemas-para-internet) como requisito para obtenção da nota parcial das atividades da unidade curricular Linguagem de Programação II.

## Base de dados relacional

Eis as tabelas do banco de dados desta atividade:

| Beneficiário |
|-|
| ID |
| Nome |
| Endereço |
| Data de nascimento |
| Endereço eletrônico |
| Telefone celular |

| Consulta |
|-|
| ID |
| Especialidade |
| Nome do(a) doutor(a) |
| Data e hora |
| ID do beneficiário |

| Exame |
|-|
| ID |
| Especialidade |
| Profissional responsável |
| Data e hora |
| ID do beneficiário |
| Caráter de urgência |

## Pilha de tecnologia

As seguintes tecnologias foram utilizadas para desenvolver este app:

| Papel | Tecnologia |
|-|-|
| Ambiente de execução | [Node](https://nodejs.org/en/) |
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |
| Framework de teste | [Jest](https://jestjs.io/pt-BR/) |
| Virtualização de banco de dados | [Docker](https://www.docker.com/) |
| Banco de dados | [PostgreSQL](postgresql.org) |

## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional);
- [Docker](https://docs.docker.com/engine/install/).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);

3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Com o Docker instalado, execute o comando abaixo para levantar o _container_ Docker com o respectivo banco de dados virtualizado. Certifique-se de estar no diretório do arquivo `docker-compose.yml`;

```console
$ docker-compose up -d
```

O parâmetro `-d` serve para desocupar o shell de comando logo após a execução do comando. É uma boa convenção, ao encerrar a execução do app, derrubar o _container_ levantado através do comando:

```console
$ docker-compose down
```

Mas, não se preocupe. As tuplas inseridas no banco de dados não serão deletadas com a derrubada do _container_.

5. Finalmente, execute o seguinte comando para iniciar o app:

Para npm:

```console
$ npm run test
```

Para Yarn:

```console
$ yarn test
```