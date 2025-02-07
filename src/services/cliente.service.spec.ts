import { describe, it, expect, beforeEach } from "vitest";
import { ClienteService } from "./cliente.service";
import { BaseRepository } from "../repository/base.repository";
import { Cliente } from "../models/cliente";

class MockRepository implements BaseRepository<Cliente> {
  findAll(): Promise<Cliente[]> {
    return Promise.resolve([]);
  }
  findById(id: number): Promise<Cliente | undefined> {
    return Promise.resolve(undefined);
  }
  create(entity: Cliente): Promise<Cliente> {
    return Promise.resolve(entity);
  }
  update(entity: Cliente): Promise<Cliente> {
    return Promise.resolve(entity);
  }
  delete(id: number): Promise<boolean> {
    return Promise.resolve(true); // Return true to indicate successful deletion
  }
  count(): Promise<number> {
    return Promise.resolve(0);
  }
}

describe("ClienteService", () => {
  let clienteService: ClienteService;
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
    clienteService = new ClienteService(mockRepository);
  });

  it("should create a Cliente instance", () => {
    const dto = { nome: "John Doe", email: "john.doe@example.com" };
    const cliente = clienteService["createEntity"](dto); // Accessing protected method for testing
    expect(cliente).toBeInstanceOf(Cliente);
    expect(cliente.nome).toBe(dto.nome);
    expect(cliente.email).toBe(dto.email);

    describe("getAll", () => {
      it("should return an array of Clientes", async () => {
        const clientes = await clienteService.getAll();
        expect(clientes).toEqual([]);
      });
    });
  });

  describe("findAll", () => {
    it("should return an array of Clientes", async () => {
      const clientes = await clienteService.getAll();
      expect(clientes).toEqual([]);
    });
  });

  describe("findById", () => {
    it("should return undefined for a non-existing Cliente", async () => {
      const cliente = await clienteService.getById(1);
      expect(cliente).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should update a Cliente and return it", async () => {
      const dto = { nome: "John Doe", email: "john.doe@example.com" };
      const cliente = await clienteService.create(dto);
      const updatedDto = { ...cliente, email: "john.new@example.com" };
      const updatedCliente = await clienteService.update(
        {
          email: updatedDto.email,
          nome: cliente.nome,
        },
        cliente.id!
      );
      expect(updatedCliente.email).toBe(updatedDto.email);
    });
  });

  describe("delete", () => {
    it("should delete a Cliente and return true", async () => {
      const dto = { nome: "John Doe", email: "john.doe@example.com" };
      const cliente = await clienteService.create(dto);
      const result = await clienteService.delete(cliente.id!);
      expect(result).toBe(true);
    });
  });
});
