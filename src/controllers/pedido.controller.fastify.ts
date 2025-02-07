import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../dtos/pedido/pedido.schema";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { PedidoService } from "../services/pedido.service";
import { BaseController } from "./base.controller";
import { FastifyInstance } from "fastify";

export class PedidoFastifyController implements BaseController {
  constructor(
    private readonly app: FastifyInstance,
    private service: PedidoService
  ) {
    this.getAll();
    this.getById();
    this.create();
    this.delete();
    this.update();
  }

  getAll() {
    this.app.get("/pedidos", async (req, res) => {
      const pedidos = await this.service.getAll();
      res.send(pedidos);
    });
  }

  getById() {
    this.app.get<{
      Params: {
        id: string;
      };
    }>("/pedidos/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const pedido = await this.service.getById(Number(id));
        return res.send(pedido);
      } catch (error) {
        if (error instanceof PedidoNotFoundException)
          return res.status(404).send({
            message: error.message,
          });
      }
    });
  }

  create() {
    this.app.post("/pedidos", async (req, res) => {
      const parse = createPedidoSchema.safeParse(req.body);
      if (!parse.success) return res.code(400).send(parse.error.issues);

      const pedido = await this.service.create(parse.data);
      return res.send(pedido);
    });
  }

  delete() {
    this.app.delete<{ Params: { id: string } }>(
      "/pedidos/:id",
      async (req, res) => {
        const { id } = req.params;
        const result = await this.service.delete(Number(id));
        return res.send(result);
      }
    );
  }

  update() {
    this.app.put<{ Params: { id: string } }>(
      "/pedidos/:id",
      async (req, res) => {
        const { id } = req.params;

        const parsed = updatePedidoSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).send(parsed.error.issues);

        const result = await this.service.update(
          { cliente: parsed.data.cliente!, produto: parsed.data.produto! },
          Number(id)
        );
        return res.send(result);
      }
    );
  }
}
