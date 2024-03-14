Goomer Challenge Backend
Este é um projeto de desafio backend da Goomer, desenvolvido por Jonathas David. O objetivo deste projeto é criar uma API RESTful capaz de gerenciar restaurantes, seus produtos, categorias e horários de funcionamento.

Tecnologias Utilizadas
Node.js
TypeScript
Express.js
Prisma ORM
PostgreSQL
Jest (para testes)
Pré-requisitos
Node.js (versão 14 ou superior)
Docker (opcional, se você quiser usar o Docker Compose para iniciar o banco de dados)
Instalação
Clone este repositório:

git clone https://github.com/Rip4568/goomer-backend-dev-challange.git
Acesse o diretório do projeto:

cd goomer-backend-dev-challange
Instale as dependências:

npm install
Configuração do Banco de Dados
Este projeto utiliza um banco de dados PostgreSQL. Você pode configurar o banco de dados de duas maneiras:

Usando Docker Compose (recomendado)
Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.
Na raiz do projeto, execute o seguinte comando para iniciar o banco de dados usando o Docker Compose:

docker-compose up -d
Configuração manual
Crie um banco de dados PostgreSQL em sua máquina local ou em um servidor remoto.
Copie o arquivo .env.example para .env e preencha as variáveis de ambiente com as informações corretas do seu banco de dados.

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
Execute as migrações do Prisma para criar as tabelas necessárias:

npx prisma migrate dev
Iniciar o Servidor
Após configurar o banco de dados, você pode iniciar o servidor com o seguinte comando:


npm run dev
Este comando iniciará o servidor com o Nodemon, que reiniciará automaticamente o servidor sempre que houver alterações nos arquivos do projeto.

Testes
Este projeto inclui testes automatizados escritos com Jest. Para executar os testes, use o seguinte comando:


npm test
Endpoints
A documentação completa dos endpoints da API pode ser encontrada em [link-para-a-documentacao].

Contribuição
Se você deseja contribuir para este projeto, siga estas etapas:

Faça um fork deste repositório.
Crie um branch para a sua funcionalidade (git checkout -b minha-funcionalidade).
Faça as alterações necessárias e commit suas alterações (git commit -am 'Adicionando minha funcionalidade').
Faça push para o branch (git push origin minha-funcionalidade).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License.