import { CreatePedidoDto } from "../dtos/pedido/create-pedido.dto";
import { UpdatePedidoDto } from "../dtos/pedido/update-pedido.dto";
import { Pedido } from "../models/pedido";
import { Cliente } from "../models/cliente"; // Importing Cliente
import { Produto } from "../models/produto"; // Importing Produto
import { BaseRepository } from "../repository/base.repository";
import { BaseService } from "./base.service";

export class PedidoService extends BaseService<
  Pedido,
  CreatePedidoDto,
  UpdatePedidoDto
> {
  protected createEntity(dto: CreatePedidoDto): Pedido {
    const cliente = Cliente.create({
      nome: "Default Name",
      email: "default@example.com",
    }); // Using create method
    const produto = Produto.create({
      nome: "Default Product",
      preco: 0,
      descricao: "Default Description",
    }); // Using create method
    const pedido = new Pedido(0, cliente, produto); // Pass the required arguments
    return pedido;
  }

  constructor(protected repository: BaseRepository<Pedido>) {
    super(repository);
  }
}
