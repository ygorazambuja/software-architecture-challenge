import { BaseRepository } from "../base.repository";
import { Pedido } from "../../models/pedido";

export class PedidoInMemoryRepository implements BaseRepository<Pedido> {
  private pedidos: Pedido[] = [];

  async findAll(): Promise<Pedido[]> {
    return this.pedidos;
  }

  async findById(id: number): Promise<Pedido | undefined> {
    return this.pedidos.find((pedido) => pedido.id === id);
  }

  async create(pedido: Pedido): Promise<Pedido> {
    this.pedidos.push(pedido);
    return pedido;
  }

  async update(pedido: Pedido): Promise<Pedido> {
    const index = this.pedidos.findIndex((p) => p.id === pedido.id);
    if (index !== -1) {
      this.pedidos[index] = pedido;
      return pedido;
    }
    throw new Error("Pedido not found");
  }

  async delete(id: number): Promise<boolean> {
    const index = this.pedidos.findIndex((pedido) => pedido.id === id);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      return true;
    }
    return false;
  }

  async count(): Promise<number> {
    return this.pedidos.length;
  }
}
