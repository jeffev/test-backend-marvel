Projeto NestJS com In Memory Database (TypeORM) - API de Heróis da Marvel

Este é um projeto em NestJS que utiliza TypeScript e um banco de dados em memória com o TypeORM. O objetivo do projeto é conectar-se à API da Marvel, carregar os dados dos heróis e disponibilizá-los através de uma API. Além disso, o projeto permite favoritar os heróis, salvando essas informações no banco de dados em memória.

Pré-requisitos:
Antes de executar o projeto, certifique-se de ter o seguinte instalado em sua máquina:
    Node.js
    NestJS CLI

Instalação
Clone o repositório do projeto:
git clone https://github.com/jeffev/nestjs-marvel-heroes-api.git

Acesse o diretório do projeto:
cd nestjs-marvel-heroes-api

Instale as dependências do projeto:
npm install

Configuração
Antes de executar o projeto, é necessário configurar as chaves de acesso à API da Marvel. Siga as etapas abaixo:
Acesse o site Marvel Developer Portal e crie uma conta (caso ainda não tenha).
Após criar a conta, acesse o Dashboard e obtenha as chaves de acesso (public key e private key).
No diretório do projeto, crie um arquivo .env e adicione as seguintes linhas:
Copy

PUBLIC_KEY=SUA_PUBLIC_KEY
PRIVATE_KEY=SUA_PRIVATE_KEY

Substitua SUA_PUBLIC_KEY e SUA_PRIVATE_KEY pelas chaves de acesso obtidas no passo anterior.

Após a configuração, você pode executar o projeto com o seguinte comando:
npm run start

Isso iniciará o servidor localmente e a API estará disponível em http://localhost:3000.

Uso da API
A API possui os seguintes endpoints:

GET /heros/heros-local
Retorna a lista de heróis locais (somente os que foram salvos em memória).

Parâmetro opcional: name (filtra heróis que contenham o nome informado)
Exemplo de uso: /heros/heros-local?name=super

GET /heros/heros-marvel
Retorna a lista de heróis da API da Marvel.

Parâmetro opcional: name (filtra heróis que contenham o nome informado)
Exemplo de uso: /heros/heros-marvel?name=super

POST /heroes/save-heros
Busca os heróis na API da Marvel e os salva em memória. Retorna os heróis criados e salvos no formato JSON.

Parâmetro opcional: name (filtra heróis que contenham o nome informado)
Exemplo de uso: /heros/save-heros?name=super

POST /favorites
Favorita um herói, salvando essa informação no banco de dados em memória e salvando o herói. Retorna o favorito criado no formato JSON.

Informação deve ser enviada no corpo da requisição. Exemplo do corpo da requisição:
json
Copy code
{
  "heroId": 1009639
}
Validações:

Se o herói já existe como favorito, retorna: "error": "Favorite already exists" (status code 409)
Se o herói não existe na base da Marvel, retorna: "error": "Hero not found" (status code 404)
Se o ID do herói for inválido, retorna: "error": "Invalid hero ID" (status code 400)
GET /favorites
Retorna a lista de heróis favoritos.

DELETE /favorites
Deleta todos os favoritos.
