import express from "express";
import fastify from "fastify";

import { ClienteExpressController } from "./controllers/cliente.express.controller";
import { ClienteFastifyController } from "./controllers/cliente.fastify.controller";
import { ClienteService } from "./services/cliente.service";
import { ClienteRepositoryMemory } from "./repository/memory/cliente.repository.memory";
import { ProdutoFastifyController } from "./controllers/produto.fastify.controller";
import { ProdutoService } from "./services/produto.service";
import { ProdutoRepositoryMemory } from "./repository/memory/produto.repository.memory";
import { ClienteRepositorySqlite } from "./repository/sqlite/cliente.repository.sqlite";

function initExpress() {
  const app = express();
  new ClienteExpressController(app);
  app.listen(3000, () => {
    console.log("listening");
  });
}

function initFastify() {
  const app = fastify();
  const clienteRepository = new ClienteRepositorySqlite();
  const produtoRepository = new ProdutoRepositoryMemory();

  const clienteServiceMemory = new ClienteService(clienteRepository);
  const produtoServiceMemory = new ProdutoService(produtoRepository);

  new ClienteFastifyController(app, clienteServiceMemory);
  new ProdutoFastifyController(app, produtoServiceMemory);

  app.listen({
    port: 3000,
  });
}

initFastify();
