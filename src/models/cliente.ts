import { BaseModel } from "./base";

export class Cliente extends BaseModel {
  private _nome: string;
  private _email: string;

  private constructor(params: {
    id?: number | null;
    nome: string;
    email: string;
  }) {
    super(params.id);
    this.validateNome(params.nome);
    this.validateEmail(params.email);

    this._nome = params.nome;
    this._email = params.email;
  }

  public static create(params: { nome: string; email: string }): Cliente {
    return new Cliente({ ...params, id: null });
  }

  public static reconstitute(params: {
    id: number;
    nome: string;
    email: string;
  }): Cliente {
    return new Cliente(params);
  }

  get nome(): string {
    return this._nome;
  }

  set nome(newNome: string) {
    this.validateNome(newNome);
    this._nome = newNome;
  }

  get email(): string {
    return this._email;
  }

  set email(newEmail: string) {
    this.validateEmail(newEmail);
    this._email = newEmail;
  }

  public update(params: { nome?: string; email?: string }): void {
    if (params.nome) {
      this.nome = params.nome;
    }
    if (params.email) {
      this.email = params.email;
    }
  }

  private validateEmail(email: string): void {
    if (!email) {
      throw new Error("Email is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
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
}
