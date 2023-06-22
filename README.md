# Projeto NestJS com In Memory Database (TypeORM) - API de Heróis da Marvel

Este é um projeto em NestJS que utiliza TypeScript e um banco de dados em memória com o TypeORM. O objetivo do projeto é conectar-se à API da Marvel, carregar os dados dos heróis e disponibilizá-los através de uma API. Além disso, o projeto permite favoritar os heróis, salvando essas informações no banco de dados em memória.

## Escolha da tecnologia
Motivação
A escolha do NestJS como framework para este projeto foi baseada em vários fatores. O NestJS é um framework Node.js que utiliza a arquitetura modular e é inspirado no Angular. Ele fornece uma estrutura robusta e escalável para o desenvolvimento de aplicativos backend. Alguns motivos para utilizar o NestJS neste projeto são:

1. Arquitetura modular: O NestJS utiliza a arquitetura de módulos, permitindo uma organização clara e modularizada do código. Isso facilita a manutenção, testabilidade e escalabilidade do projeto.
2. Suporte TypeScript: O NestJS é construído com TypeScript, o que traz recursos avançados de tipagem estática e facilita o desenvolvimento, depuração e refatoração do código.
3. Injeção de dependência: O NestJS possui um poderoso sistema de injeção de dependência embutido, que facilita a implementação de padrões como Inversão de Controle (IoC) e Injeção de Dependência (DI). Isso torna o código mais modular, reutilizável e testável.

A escolha do TypeORM para o banco de dados em memória foi feita considerando a simplicidade e flexibilidade que ele oferece. Algumas vantagens de utilizar o TypeORM com um banco de dados em memória são:

1. Facilidade de uso: O TypeORM oferece uma API simples e intuitiva para interagir com o banco de dados, permitindo criar, atualizar, consultar e excluir registros de forma fácil e eficiente.
2. Banco de dados em memória: O uso de um banco de dados em memória é útil em cenários de desenvolvimento e testes, onde não é necessário manter dados persistentes. Isso agiliza o ciclo de desenvolvimento e permite executar testes de forma isolada e rápida.
3. Suporte a diversos bancos de dados: O TypeORM é compatível com uma ampla variedade de bancos de dados, incluindo bancos de dados em memória, como SQLite e MySQL em memória. Isso oferece flexibilidade para migrar facilmente para um banco de dados persistente quando necessário.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js
- NestJS CLI

## Instalação

1. Clone o repositório do projeto:

```shell
    git clone https://github.com/jeffev/test-backend-marvel.git
```
 
2. Acesse o diretório do projeto:
```shell
cd nestjs-marvel-heroes-api
```

3. Instale as dependências do projeto:
```shell
npm install
```

## Configuração

Antes de executar o projeto, é necessário configurar as chaves de acesso à API da Marvel. Siga as etapas abaixo:

1. Acesse o site Marvel Developer Portal e crie uma conta (caso ainda não tenha).
2. Após criar a conta, acesse o Dashboard e obtenha as chaves de acesso (public key e private key).
3. No diretório do projeto, crie um arquivo .env e adicione as seguintes linhas:

PUBLIC_KEY=SUA_PUBLIC_KEY
PRIVATE_KEY=SUA_PRIVATE_KEY

Substitua SUA_PUBLIC_KEY e SUA_PRIVATE_KEY pelas chaves de acesso obtidas no passo anterior.

## Executando o projeto

Após a configuração, você pode executar o projeto com o seguinte comando:
npm run start

Isso iniciará o servidor localmente e a API estará disponível em http://localhost:3000.

# Uso da API

A API possui os seguintes endpoints:

## GET /heros/heros-local

Retorna a lista de heróis locais (somente os que foram salvos em memória).

- Parâmetro opcional: `name` (filtra heróis que contenham o nome informado)

Exemplo de uso: `/heros/heros-local?name=super`

## GET /heros/heros-marvel

Retorna a lista de heróis da API da Marvel.

- Parâmetro opcional: `name` (filtra heróis que contenham o nome informado)

Exemplo de uso: `/heros/heros-marvel?name=super`

## POST /heroes/save-heros

Busca os heróis na API da Marvel e os salva em memória. Retorna os heróis criados e salvos no formato JSON.

- Parâmetro opcional: `name` (filtra heróis que contenham o nome informado)

Exemplo de uso: `/heros/save-heros?name=super`

## POST /favorites

Favorita um herói, salvando essa informação no banco de dados em memória e salvando o herói. Retorna o favorito criado no formato JSON.

- Informação deve ser enviada no corpo da requisição. Exemplo do corpo da requisição:

```json
{
  "heroId": 1009639
}
```

## Validações

- Se o herói já existe como favorito, retorna: `"error": "Favorite already exists"` (status code 409)
- Se o herói não existe na base da Marvel, retorna: `"error": "Hero not found"` (status code 404)
- Se o ID do herói for inválido, retorna: `"error": "Invalid hero ID"` (status code 400)

## GET /favorites

Retorna a lista de heróis favoritos.

## DELETE /favorites

Deleta todos os favoritos.

