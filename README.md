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

Uso da API:
A API possui os seguintes endpoints:
GET /heros/heros-local: Retorna a lista de heróis local (somente dos que foram salvos em memoria). 
    - parametro opcional: name (erá filtrar herois que contenham o nome passado)
    Exemplo: heros/heros-local?name=super
GET /heros/heros-marvel: Retorna a lista de heróis da API da Marvel.
    - parametro opcional: name (erá filtrar herois que contenham o nome passado)
    Exemplo: heros/heros-marvel?name=super
POST /heroes/save-heros: Irá buscar os herois na API da Marvel e salvará em memoria, retornará no json os herois criados e salvos
    - parametro opcional: name (erá filtrar herois que contenham o nome passado)
    Exemplo: heros/save-heros?name=super
POST /favorites: Favorita um herói, salvando essa informação no banco de dados em memória e salvando o heroi. retornará no json do favorito criado
    - Informação deve vir no body, Exemplo do body da requisição:
    {
        "heroId": 1009639
    }
    Validações:
        - Se o heroi já existe como favorito retornará: "error": "Favorite already exists" status code 409
        - Se o heroi não existe na base da Marvel retornará: "error": "Hero not found" status code 404
        - Se o id do heroi for inválido retornará: "error": "Invalid hero ID"  status code 400
GET /favorites: Retorna a lista de heróis favoritos.
DELETE /favorites: Irá deletar todos os favoritos.



Se o herói não for encontrado, uma exceção será lançada com a mensagem "Hero not found" e o status HTTP 404 (Not Found). Se o favorito já existir, uma exceção será lançada com a mensagem "Favorite already exists" e o status HTTP 409 (Conflict).