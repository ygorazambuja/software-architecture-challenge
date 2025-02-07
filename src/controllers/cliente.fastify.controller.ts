import { createClienteSchema } from "../dtos/cliente/create-cliente.dto";
import { updateClienteSchema } from "../dtos/cliente/update-cliente.dto";
import { ClienteNotFoundException } from "../exceptions/ClienteNotFoundException";
import { ClienteService } from "../services/cliente.service";
import { BaseController } from "./base.controller";

import { FastifyInstance } from "fastify";

export class ClienteFastifyController implements BaseController {
  constructor(
    private readonly app: FastifyInstance,
    private service: ClienteService
  ) {
    this.getAll();
    this.getById();
    this.create();
    this.delete();
    this.update();
    this.count();
  }

  getAll() {
    this.app.get("/clientes", async (req, res) => {
      const clientes = await this.service.getAll();
      res.send(clientes);
    });
  }

  getById() {
    this.app.get<{
      Params: {
        id: string;
      };
    }>("/clientes/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const cliente = await this.service.getById(Number(id));

        return res.send(cliente);
      } catch (error) {
        if (error instanceof ClienteNotFoundException)
          return res.status(404).send({
            message: error.message,
          });
      }
    });
  }

  create() {
    this.app.post("/clientes", async (req, res) => {
      const parse = createClienteSchema.safeParse(req.body);
      if (!parse.success) return res.code(400).send(parse.error.issues);

      const cliente = await this.service.create(parse.data);

      return res.send(cliente);
    });
  }

  delete() {
    this.app.delete<{ Params: { id: string } }>(
      "/clientes/:id",
      async (req, res) => {
        const { id } = req.params;

        const result = await this.service.delete(Number(id));

        return res.send(result);
      }
    );
  }

  update() {
    this.app.put<{ Params: { id: string } }>(
      "/clientes/:id",
      async (req, res) => {
        const { id } = req.params;

        const parsed = updateClienteSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).send(parsed.error.issues);

        const result = await this.service.update(parsed.data, Number(id));

        return res.send(result);
      }
    );
  }

  count() {
    this.app.get("/clientes/count", async (req, res) => {
      const count = await this.service.count();

      return res.send({ count });
    });
  }
}
