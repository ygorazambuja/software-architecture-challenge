import { CreateClienteDto } from "../dtos/cliente/create-cliente.dto";
import { UpdateClienteDto } from "../dtos/cliente/update-cliente.dto";
import { Cliente } from "../models/cliente";
import { BaseRepository } from "../repository/base.repository";
import { BaseService } from "./base.service";

export class ClienteService extends BaseService<
  Cliente,
  CreateClienteDto,
  UpdateClienteDto
> {
  protected createEntity(dto: { nome: string; email: string }): Cliente {
    return Cliente.create(dto);
  }

  constructor(protected repository: BaseRepository<Cliente>) {
    super(repository);
  }
}
