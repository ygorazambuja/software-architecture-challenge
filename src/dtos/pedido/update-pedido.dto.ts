export class UpdatePedidoDto {
  cliente: number; // ID of the cliente
  produto: number; // ID of the produto

  constructor(cliente: number, produto: number) {
    this.cliente = cliente;
    this.produto = produto;
  }
}
