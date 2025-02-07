import { CreateProdutoDto } from "../dtos/produto/create-produto.dto";
import { UpdateProdutoDto } from "../dtos/produto/update-produto.dto";
import { Produto } from "../models/produto";
import { BaseRepository } from "../repository/base.repository";
import { BaseService } from "./base.service";

export class ProdutoService extends BaseService<
  Produto,
  CreateProdutoDto,
  UpdateProdutoDto
> {
  protected createEntity(dto: {
    nome: string;
    preco: number;
    descricao: string;
  }): Produto {
    return Produto.create(dto);
  }

  constructor(protected repository: BaseRepository<Produto>) {
    super(repository);
  }
}
