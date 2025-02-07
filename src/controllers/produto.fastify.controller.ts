import { createProdutoSchema } from "../dtos/produto/create-produto.dto";
import { updateProdutoSchema } from "../dtos/produto/update-produto.dto";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";
import { ProdutoService } from "../services/produto.service";
import { BaseController } from "./base.controller";

import { FastifyInstance } from "fastify";

export class ProdutoFastifyController implements BaseController {
  constructor(
    private readonly app: FastifyInstance,
    private service: ProdutoService
  ) {
    this.getAll();
    this.getById();
    this.create();
    this.delete();
    this.update();
  }

  getAll() {
    this.app.get("/produtos", async (req, res) => {
      const produtos = await this.service.getAll();
      res.send(produtos);
    });
  }

  getById() {
    this.app.get<{
      Params: {
        id: string;
      };
    }>("/produtos/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const produto = await this.service.getById(Number(id));

        return res.send(produto);
      } catch (error) {
        if (error instanceof ProdutoNotFoundException)
          return res.status(404).send({
            message: error.message,
          });
      }
    });
  }

  create() {
    this.app.post("/produtos", async (req, res) => {
      const parse = createProdutoSchema.safeParse(req.body);
      if (!parse.success) return res.code(400).send(parse.error.issues);

      return await this.service.create(parse.data);
    });
  }

  delete() {
    this.app.delete<{ Params: { id: string } }>(
      "/produtos/:id",
      async (req, res) => {
        const { id } = req.params;

        return await this.service.delete(Number(id));
      }
    );
  }

  update() {
    this.app.put<{ Params: { id: string } }>(
      "/produtos/:id",
      async (req, res) => {
        const { id } = req.params;

        const parsed = updateProdutoSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).send(parsed.error.issues);

        return await this.service.update(parsed.data, Number(id));
      }
    );
  }
}
