// src/app.ts
import express from "express";
import routes from "./routes";
/* 
explicação de alguma tomadas de decisão
*/
const app = express();
const port = 3000; // Porta, coloquei em uma contante para defini e ficar mais facil a manipulção

//Ativando a utilização de JSON	
app.use(express.json());
//ativando a utilização de urlencode
app.use(express.urlencoded({ extended: true }));
//aqui começa minha organização de rotas
//deixei esse arquivo app.ts apenas para configuração inicial da aplicação da API
//com isso eu consigo orquestrar melhor onde cada rota fica e como gerenciar
//devo adminitir que boa parte da orgnização das pastas se deve ao meu pequeno conhecimento de 
//organização ee arquitetura do NestJS
app.use(routes);


//caso bata na porta 3000 sera mostrado o velho conhecido hello world
app.get('/', (request, response) => {
  response.send("Hello Worl");
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

export default app;