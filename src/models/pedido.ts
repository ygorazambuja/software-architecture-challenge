import { Cliente } from "./cliente";
import { Produto } from "./produto";

export class Pedido {
  id: number;
  cliente: Cliente;
  produto: Produto;

  constructor(id: number, cliente: Cliente, produto: Produto) {
    this.id = id;
    this.cliente = cliente;

    this.produto = produto;
  }

  public static create(params: {
    id?: number | null;
    cliente: Cliente;
    produto: Produto;
  }): Pedido {
    return new Pedido(params.id || 0, params.cliente, params.produto);
  }
}
