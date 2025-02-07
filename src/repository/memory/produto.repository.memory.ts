import { ProdutoNotFoundException } from "../../exceptions/ProdutoNotFoundException";
import { Produto } from "../../models/produto";
import { BaseRepository } from "../base.repository";

export class ProdutoRepositoryMemory implements BaseRepository<Produto> {
  produtos: Produto[];

  constructor() {
    this.produtos = [];
  }

  async findAll() {
    return this.produtos;
  }

  async findById(n: number) {
    const produto = this.produtos.find((p) => p.id === n);

    if (!produto) throw new ProdutoNotFoundException();

    return produto;
  }

  async create(p: Produto) {
    if (this.produtos.find((produto) => p.id === produto.id))
      throw new Error("Produto já existente");

    const newProduto = Produto.reconstitute({
      id: Math.floor(Math.random() * 2000),
      nome: p.nome,
      preco: p.preco,
      descricao: p.descricao,
    });

    this.produtos.push(newProduto);

    return newProduto;
  }

  async update(p: Produto) {
    const produto = await this.findById(p.id!);

    if (!produto) throw new Error("Produto não encontrado");

    produto.nome = p.nome;
    produto.preco = p.preco;

    return produto;
  }

  async delete(id: number) {
    const produto = await this.findById(id);
    if (!produto) throw new Error("Produto não Encontrado");
    this.produtos = this.produtos.filter((p) => p.id !== id);
    return true;
  }

  async count(): Promise<number> {
    return this.produtos.length;
  }
}
