import { Application } from "express";
import { BaseController } from "./base.controller";
import { Cliente } from "../models/cliente";

export class ClienteExpressController implements BaseController {
  constructor(private readonly app: Application) {
    this.getAll();
    this.getById();
    this.create();
    this.delete();
    this.update();
  }

  getAll() {
    this.app.get("/clientes", (req, res) => {
      res.json({
        hello: "world",
      });
    });
  }
  getById() {}
  create() {}
  delete() {}
  update() {}
}
