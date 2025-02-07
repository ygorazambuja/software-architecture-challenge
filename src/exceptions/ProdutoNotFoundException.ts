export class ProdutoNotFoundException extends Error {
  constructor(message: string = "Produto não encontrado") {
    super(message);
    this.name = "ProdutoNotFoundException";
  }
}
