export interface BaseRepository<T> {
  findAll: () => Promise<Array<T>>;
  findById: (n: number) => Promise<T | undefined>;
  create: (t: T) => Promise<T>;
  update: (t: T) => Promise<T>;
  delete: (n: number) => Promise<boolean>;

  count: () => Promise<number>;
}
