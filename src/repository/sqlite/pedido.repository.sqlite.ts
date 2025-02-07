import { Pedido } from "../../models/pedido";
import { BaseRepository } from "../base.repository";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class PedidoRepositorySqlite implements BaseRepository<Pedido> {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.db = await open({
      filename: "./db.db",
      driver: sqlite3.Database,
    });

    await this.db.run(`
      CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente INTEGER NOT NULL,
        produto INTEGER NOT NULL,
        FOREIGN KEY (clienteId) REFERENCES clientes(id),
        FOREIGN KEY (produtoId) REFERENCES produtos(id)
      )
    `);
  }

  async findAll(): Promise<Pedido[]> {
    return this.db.all<Pedido[]>("SELECT * FROM pedidos");
  }

  async findById(id: number): Promise<Pedido | undefined> {
    return this.db.get<Pedido>("SELECT * FROM pedidos WHERE id = ?", id);
  }

  async count(): Promise<number> {
    const result = await this.db.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM pedidos"
    );
    if (!result) {
      throw new Error("Failed to retrieve count from database.");
    }
    return result.count;
  }

  async create(pedido: Pedido): Promise<Pedido> {
    const insertResult = await this.db.run(
      "INSERT INTO pedidos (cliente, produto) VALUES (?, ?)",
      pedido.cliente,
      pedido.produto
    );

    if (!insertResult.lastID) {
      throw new Error("Failed to retrieve the last inserted ID.");
    }
    return Pedido.create({
      id: insertResult.lastID as number,
      cliente: pedido.cliente,
      produto: pedido.produto,
    });
  }

  async update(pedido: Pedido): Promise<Pedido> {
    await this.db.run(
      "UPDATE pedidos SET cliente = ?, produto = ? WHERE id = ?",
      pedido.cliente,
      pedido.produto,
      pedido.id
    );
    return pedido;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run("DELETE FROM pedidos WHERE id = ?", id);
    return (result.changes ?? 0) > 0;
  }
}
