import { ClienteNotFoundException } from "../../exceptions/ClienteNotFoundException";
import { Cliente } from "../../models/cliente";
import { BaseRepository } from "../base.repository";

export class ClienteRepositoryMemory implements BaseRepository<Cliente> {
  clientes: Cliente[];

  constructor() {
    this.clientes = [];
  }

  async findAll() {
    return this.clientes;
  }

  async findById(n: number) {
    const cliente = this.clientes.find((c) => c.id === n);

    if (!cliente) throw new ClienteNotFoundException();

    return cliente;
  }

  async create(c: Cliente) {
    if (this.clientes.find((cliente) => c.id === cliente.id))
      throw new Error("Cliente já existente");

    const newCliente = Cliente.reconstitute({
      id: Math.floor(Math.random() * 2000),
      email: c.email,
      nome: c.nome,
    });

    this.clientes.push(newCliente);

    return newCliente;
  }

  async update(c: Cliente) {
    const cliente = await this.findById(c.id!);

    if (!cliente) throw new Error("Cliente não encontrado");

    cliente.nome = c.nome;
    cliente.email = c.email;

    return cliente;
  }

  async delete(id: number) {
    const cliente = await this.findById(id);
    if (!cliente) throw new Error("Cliente não Encontrado");
    this.clientes = this.clientes.filter((c) => c.id !== id);
    return true;
  }

  async count() {
    return this.clientes.length;
  }
}
