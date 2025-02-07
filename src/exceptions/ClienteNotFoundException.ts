export class ClienteNotFoundException extends Error {
  constructor(message: string = "Cliente não encontrado") {
    super(message);
    this.name = "ClienteNotFoundException";
  }
}
