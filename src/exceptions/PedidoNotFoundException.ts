export class PedidoNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PedidoNotFoundException";
  }
}
