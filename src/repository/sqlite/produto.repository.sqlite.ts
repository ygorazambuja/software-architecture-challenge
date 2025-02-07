import { Produto } from "../../models/produto";
import { BaseRepository } from "../base.repository";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class ProdutoRepositorySqlite implements BaseRepository<Produto> {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    this.db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });
  }

  async findAll(): Promise<Produto[]> {
    return this.db.all<Produto[]>("SELECT * FROM produtos");
  }

  async findById(id: number): Promise<Produto | undefined> {
    return this.db.get<Produto>("SELECT * FROM produtos WHERE id = ?", id);
  }

  async count(): Promise<number> {
    const result = await this.db.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM produtos"
    );
    if (!result) {
      throw new Error("Failed to retrieve count from database.");
    }
    return result.count;
  }

  async create(produto: Produto): Promise<Produto> {
    const insertResult = await this.db.run(
      "INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)",
      produto.nome,
      produto.preco,
      produto.descricao
    );

    if (!insertResult.lastID) {
      throw new Error("Failed to retrieve the last inserted ID.");
    }
    return Produto.reconstitute({
      id: insertResult.lastID as number,
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
    });
  }

  async update(produto: Produto): Promise<Produto> {
    await this.db.run(
      "UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?",
      produto.nome,
      produto.preco,
      produto.descricao,
      produto.id
    );
    return produto;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.run("DELETE FROM produtos WHERE id = ?", id);
    return (result.changes ?? 0) > 0;
  }
}
