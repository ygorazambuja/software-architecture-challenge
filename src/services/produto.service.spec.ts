import { describe, it, expect, beforeEach } from "vitest";
import { ProdutoService } from "./produto.service";
import { BaseRepository } from "../repository/base.repository";
import { Produto } from "../models/produto";

class MockRepository implements BaseRepository<Produto> {
  findAll(): Promise<Produto[]> {
    return Promise.resolve([]);
  }
  findById(id: number): Promise<Produto | undefined> {
    return Promise.resolve(undefined);
  }
  create(entity: Produto): Promise<Produto> {
    return Promise.resolve(entity);
  }
  update(entity: Produto): Promise<Produto> {
    return Promise.resolve(entity);
  }
  delete(id: number): Promise<boolean> {
    return Promise.resolve(true); // Return true to indicate successful deletion
  }
  count(): Promise<number> {
    return Promise.resolve(0);
  }
}

describe("ProdutoService", () => {
  let produtoService: ProdutoService;
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
    produtoService = new ProdutoService(mockRepository);
  });

  it("should create a Produto instance", () => {
    const dto = {
      nome: "Product A",
      preco: 100,
      descricao: "Description of Product A",
    };
    const produto = produtoService["createEntity"](dto); // Accessing protected method for testing
    expect(produto).toBeInstanceOf(Produto);
    expect(produto.nome).toBe(dto.nome);
    expect(produto.preco).toBe(dto.preco);
  });

  describe("getAll", () => {
    it("should return an array of Produtos", async () => {
      const produtos = await produtoService.getAll();
      expect(produtos).toEqual([]);
    });
  });

  describe("findById", () => {
    it("should return undefined for a non-existing Produto", async () => {
      const produto = await produtoService.getById(1);
      expect(produto).toBeUndefined();
    });
  });

  describe("update", () => {
    it("should update a Produto and return it", async () => {
      const dto = {
        nome: "Product A",
        preco: 100,
        descricao: "ashduiash uaishdu",
      };
      const produto = await produtoService.create(dto);
      const updatedDto = { ...produto, preco: 150 };
      const updatedProduto = await produtoService.update(
        {
          nome: produto.nome,
          preco: updatedDto.preco,
        },
        produto.id!
      );
      expect(updatedProduto.preco).toBe(updatedDto.preco);
    });
  });

  describe("delete", () => {
    it("should delete a Produto and return true", async () => {
      const dto = {
        nome: "Product A",
        preco: 100,
        descricao: "teste descricao 5",
      };
      const produto = await produtoService.create(dto);
      const result = await produtoService.delete(produto.id!);
      expect(result).toBe(true);
    });
  });
});
