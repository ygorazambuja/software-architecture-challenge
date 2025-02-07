import { BaseRepository } from "../repository/base.repository";

export abstract class BaseService<T, CreateDto, UpdateDto> {
  protected abstract createEntity(dto: CreateDto): T;

  constructor(protected repository: BaseRepository<T>) {}

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(n: number) {
    return await this.repository.findById(n);
  }

  async create(c: CreateDto) {
    const entity = this.createEntity(c);
    return await this.repository.create(entity);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async update(c: UpdateDto, id: number) {
    return this.repository.update({ ...c, id } as T);
  }

  async count() {
    return this.repository.count();
  }
}
