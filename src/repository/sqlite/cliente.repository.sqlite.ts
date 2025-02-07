import { Cliente } from "../../models/cliente";
import { BaseRepository } from "../base.repository";
import sqlite3 from "sqlite3";
import { promisify } from "util";

export class ClienteRepositorySqlite implements BaseRepository<Cliente> {
  private db: sqlite3.Database;
  private run: Function;
  private get: Function;
  private all: Function;

  constructor() {
    this.db = new sqlite3.Database("./db.db", (err: Error | null) => {
      if (err) {
        console.error("Could not connect to database", err);
      } else {
        console.log("Connected to SQLite database");
      }
    });

    this.run = promisify(this.db.run.bind(this.db));
    this.get = promisify(this.db.get.bind(this.db));
    this.all = promisify(this.db.all.bind(this.db));

    this.db.run(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);
  }

  async findAll(): Promise<Cliente[]> {
    const rows = await this.all("SELECT * FROM clientes");
    return rows.map((row: { id: number; nome: string; email: string }) =>
      Cliente.reconstitute({ id: row.id, nome: row.nome, email: row.email })
    );
  }

  async findById(id: number): Promise<Cliente | undefined> {
    const row = await this.get("SELECT * FROM clientes WHERE id = ?", id);
    if (row) {
      return Cliente.reconstitute({
        id: row.id,
        nome: row.nome,
        email: row.email,
      });
    }
    return undefined;
  }

  async create(c: Cliente): Promise<Cliente> {
    return new Promise<Cliente>((resolve, reject) => {
      this.db.run(
        "INSERT INTO clientes (nome, email) VALUES (?, ?)",
        c.nome,
        c.email,
        function (this: sqlite3.RunResult, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve(
              Cliente.reconstitute({
                id: this.lastID,
                nome: c.nome,
                email: c.email,
              })
            );
          }
        }
      );
    });
  }

  async update(c: Cliente): Promise<Cliente> {
    return new Promise<Cliente>((resolve, reject) => {
      this.db.run(
        "UPDATE clientes SET nome = ?, email = ? WHERE id = ?",
        c.nome,
        c.email,
        c.id,
        function (this: sqlite3.RunResult, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve(c);
          }
        }
      );
    });
  }

  async delete(id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.db.run(
        "DELETE FROM clientes WHERE id = ?",
        id,
        function (this: sqlite3.RunResult, err: Error | null) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes > 0);
          }
        }
      );
    });
  }

  async count(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.db.run(
        "SELECT COUNT(*) FROM clientes",
        function (this: sqlite3.RunResult, err: Error | null) {
          if (err) return reject(err);
          return resolve(this.changes);
        }
      );
    });
  }
}
