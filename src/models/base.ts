export abstract class BaseModel {
  protected _id: number | null;

  protected constructor(id?: number | null) {
    this._id = id ?? null;
    if (id) {
      this.validateId(id);
    }
  }

  get id(): number | null {
    return this._id;
  }

  setId(id: number): void {
    this.validateId(id);
    if (this._id !== null) {
      throw new Error("ID can only be set once");
    }
    this._id = id;
  }

  protected validateId(id: number): void {
    if (!id || id <= 0) {
      throw new Error("Id must be a positive number");
    }
  }

  public isNew(): boolean {
    return this._id === null;
  }
}
