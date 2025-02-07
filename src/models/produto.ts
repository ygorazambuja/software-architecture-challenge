import { BaseModel } from "./base";

export class Produto extends BaseModel {
  private _nome: string;
  private _preco: number;
  private _descricao: string;

  private constructor(params: {
    id?: number | null;
    nome: string;
    preco: number;
    descricao: string;
  }) {
    super(params.id);
    this.validateNome(params.nome);
    this.validatePreco(params.preco);
    this.validateDescricao(params.descricao);

    this._nome = params.nome;
    this._preco = params.preco;
    this._descricao = params.descricao;
  }

  public static create(params: {
    nome: string;
    preco: number;
    descricao: string;
  }): Produto {
    return new Produto({ ...params, id: null });
  }

  public static reconstitute(params: {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
  }): Produto {
    return new Produto(params);
  }

  get nome(): string {
    return this._nome;
  }

  set nome(newNome: string) {
    this.validateNome(newNome);
    this._nome = newNome;
  }

  get preco(): number {
    return this._preco;
  }

  set preco(newPreco: number) {
    this.validatePreco(newPreco);
    this._preco = newPreco;
  }

  get descricao(): string {
    return this._descricao;
  }

  set descricao(newDescription: string) {
    this.validateDescricao(newDescription);
    this._descricao = newDescription;
  }

  public update(params: {
    nome?: string;
    preco?: number;
    descricao?: string;
  }): void {
    if (params.nome) {
      this.nome = params.nome;
    }
    if (params.preco) {
      this.preco = params.preco;
    }
    if (params.descricao) {
      this.descricao = params.descricao;
    }
  }

  private validateNome(nome: string): void {
    if (!nome) {
      throw new Error("Nome is required");
    }
    if (nome.length < 2) {
      throw new Error("Nome must be at least 2 characters long");
    }
  }

  private validatePreco(preco: number): void {
    if (preco === undefined || preco === null) {
      throw new Error("Preco is required");
    }
    if (preco < 0) {
      throw new Error("Preco must be greater than or equal to 0");
    }
  }

  private validateDescricao(descricao: string): void {
    if (!descricao) {
      throw new Error("Description is required");
    }
    if (descricao.length < 5) {
      throw new Error("Description must be at least 5 characters long");
    }
  }
}
